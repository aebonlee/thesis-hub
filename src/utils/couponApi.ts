import getSupabase from './supabase';
import type { Coupon, CouponWithStats, MyCoupon } from '../types';

const TABLE_COUPONS = 'tsh_coupons';
const TABLE_USES = 'tsh_coupon_uses';
const CODE_PREFIX = 'TSH';

/** 쿠폰 코드 자동 생성: TSH-20260408-K3M7 */
export function generateCouponCode(lectureDate: string): string {
  const d = lectureDate.replace(/-/g, '');
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let rand = '';
  for (let i = 0; i < 4; i++) {
    rand += chars[Math.floor(Math.random() * chars.length)];
  }
  return `${CODE_PREFIX}-${d}-${rand}`;
}

/** 관리자: 쿠폰 발행 */
export async function createCoupon(
  input: { label: string; lectureDate: string; durationDays?: number },
  adminUserId: string
): Promise<Coupon> {
  const client = getSupabase();
  if (!client) throw new Error('Supabase not configured');

  const days = input.durationDays || 30;
  const code = generateCouponCode(input.lectureDate);
  const expiresAt = new Date(input.lectureDate);
  expiresAt.setDate(expiresAt.getDate() + days);

  const { data, error } = await client
    .from(TABLE_COUPONS)
    .insert({
      code,
      label: input.label,
      lecture_date: input.lectureDate,
      duration_days: days,
      expires_at: expiresAt.toISOString().split('T')[0],
      created_by: adminUserId,
    })
    .select()
    .single();

  if (error) throw error;
  return data as Coupon;
}

/** 관리자: 쿠폰 목록 (사용수 포함) */
export async function listCoupons(): Promise<CouponWithStats[]> {
  const client = getSupabase();
  if (!client) return [];

  const { data: coupons, error } = await client
    .from(TABLE_COUPONS)
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('listCoupons error:', error);
    return [];
  }

  const { data: uses } = await client
    .from(TABLE_USES)
    .select('coupon_id');

  const countMap: Record<string, number> = {};
  (uses || []).forEach((u: { coupon_id: string }) => {
    countMap[u.coupon_id] = (countMap[u.coupon_id] || 0) + 1;
  });

  return (coupons || []).map((c: Coupon) => ({
    ...c,
    use_count: countMap[c.id] || 0,
  }));
}

/** 관리자: 쿠폰 활성/비활성 토글 */
export async function toggleCouponActive(couponId: string, isActive: boolean): Promise<void> {
  const client = getSupabase();
  if (!client) throw new Error('Supabase not configured');

  const { error } = await client
    .from(TABLE_COUPONS)
    .update({ is_active: isActive })
    .eq('id', couponId);

  if (error) throw error;
}

/** 사용자: 쿠폰 코드 등록 + 라이선스 자동 부여 */
export async function redeemCoupon(
  code: string,
  userId: string
): Promise<{ success: true; coupon: Coupon }> {
  const client = getSupabase();
  if (!client) throw new Error('Supabase not configured');

  // 1) 쿠폰 조회
  const { data: coupon, error: findErr } = await client
    .from(TABLE_COUPONS)
    .select('*')
    .eq('code', code.trim().toUpperCase())
    .single();

  if (findErr || !coupon) throw new Error('존재하지 않는 쿠폰 코드입니다.');
  if (!coupon.is_active) throw new Error('비활성화된 쿠폰입니다.');

  // 2) 만료 체크
  const today = new Date().toISOString().split('T')[0];
  if (coupon.expires_at < today) throw new Error('만료된 쿠폰입니다.');

  // 3) 중복 체크
  const { data: existing } = await client
    .from(TABLE_USES)
    .select('id')
    .eq('coupon_id', coupon.id)
    .eq('user_id', userId)
    .limit(1);

  if (existing && existing.length > 0) throw new Error('이미 등록한 쿠폰입니다.');

  // 4) 쿠폰 사용 등록
  const { error: insertErr } = await client
    .from(TABLE_USES)
    .insert({ coupon_id: coupon.id, user_id: userId });

  if (insertErr) throw insertErr;

  // 5) user_licenses에 bundle 라이선스 부여 (LicenseGuard 연동)
  const durationDays = coupon.duration_days || 30;
  const licenseExpires = new Date();
  licenseExpires.setDate(licenseExpires.getDate() + durationDays);
  const licenseExpiresAt = licenseExpires.toISOString();

  try {
    await client.rpc('grant_coupon_license', {
      p_user_id: userId,
      p_coupon_id: coupon.id,
      p_license_type: 'bundle',
      p_site_slug: null,
    });
  } catch {
    // grant_coupon_license RPC가 아직 없을 경우 직접 INSERT 시도
    try {
      await client
        .from('user_licenses')
        .upsert(
          { user_id: userId, license_type: 'bundle', site_slug: null, order_id: null, expires_at: licenseExpiresAt },
          { onConflict: 'user_id,license_type,site_slug' }
        );
    } catch (fallbackErr) {
      console.warn('coupon license grant fallback failed:', fallbackErr);
    }
  }

  return { success: true, coupon: coupon as Coupon };
}

/** 사용자에게 활성 쿠폰이 있는지 확인 */
export async function hasActiveCouponAccess(userId: string): Promise<boolean> {
  const client = getSupabase();
  if (!client) return false;

  const { data, error } = await client
    .from(TABLE_USES)
    .select(`
      id,
      redeemed_at,
      coupon:${TABLE_COUPONS}!coupon_id (
        is_active, expires_at, duration_days
      )
    `)
    .eq('user_id', userId);

  if (error || !data) return false;

  const now = new Date();
  return data.some((row: any) => {
    if (!row.coupon?.is_active) return false;
    const days = row.coupon?.duration_days || 30;
    const accessExpires = new Date(row.redeemed_at);
    accessExpires.setDate(accessExpires.getDate() + days);
    return accessExpires > now;
  });
}

/** 사용자: 내 쿠폰 목록 */
export async function getMyActiveCoupons(userId: string): Promise<MyCoupon[]> {
  const client = getSupabase();
  if (!client) return [];

  const { data, error } = await client
    .from(TABLE_USES)
    .select(`
      id,
      redeemed_at,
      coupon:${TABLE_COUPONS}!coupon_id (
        code, label, lecture_date, expires_at, duration_days
      )
    `)
    .eq('user_id', userId)
    .order('redeemed_at', { ascending: false });

  if (error) {
    console.error('getMyActiveCoupons error:', error);
    return [];
  }

  return (data || []).map((row: any) => {
    const days = row.coupon?.duration_days || 30;
    const accessExpires = new Date(row.redeemed_at);
    accessExpires.setDate(accessExpires.getDate() + days);
    return {
      id: row.id,
      code: row.coupon?.code || '',
      label: row.coupon?.label || '',
      lecture_date: row.coupon?.lecture_date || '',
      expires_at: row.coupon?.expires_at || '',
      duration_days: days,
      redeemed_at: row.redeemed_at,
      access_expires_at: accessExpires.toISOString().split('T')[0],
    };
  });
}
