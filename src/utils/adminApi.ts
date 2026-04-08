/**
 * adminApi.ts — 관리자 전용 API 유틸리티 (exam-hub)
 */
import getSupabase, { TABLES } from './supabase';

/** 대시보드 통계 조회 */
export async function getDashboardStats() {
  const client = getSupabase();
  if (!client) return { orders: 0, revenue: 0, members: 0, products: 0 };

  const [ordersRes, membersRes, productsRes] = await Promise.all([
    client.from(TABLES.orders).select('id, total_amount, payment_status'),
    client.from('user_profiles').select('id', { count: 'exact', head: true }),
    client.from(TABLES.products).select('id', { count: 'exact', head: true }).eq('is_active', true),
  ]);

  const orders = ordersRes.data || [];
  const revenue = orders
    .filter((o: Record<string, unknown>) => o.payment_status === 'paid')
    .reduce((sum: number, o: Record<string, unknown>) => sum + ((o.total_amount as number) || 0), 0);

  return {
    orders: orders.length,
    revenue,
    members: membersRes.count || 0,
    products: productsRes.count || 0,
  };
}

/** 전체 주문 조회 (페이지네이션 + 상태 필터) */
export async function getAllOrders({ page = 1, limit = 20, status = '' } = {}) {
  const client = getSupabase();
  if (!client) return { data: [], total: 0 };

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = client
    .from(TABLES.orders)
    .select(`*, order_items:${TABLES.order_items}(*)`, { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(from, to);

  if (status) query = query.eq('payment_status', status);

  const { data, count, error } = await query as { data: Record<string, unknown>[] | null; count: number | null; error: unknown };
  if (error) {
    console.error('getAllOrders error:', error);
    return { data: [], total: 0 };
  }
  return { data: (data || []) as Record<string, unknown>[], total: count || 0 };
}

/** 주문 상태 변경 */
export async function updateOrderStatus(orderId: string, status: string) {
  const client = getSupabase();
  if (!client) return null;
  const { data, error } = await client
    .from(TABLES.orders)
    .update({ payment_status: status, updated_at: new Date().toISOString() })
    .eq('id', orderId)
    .select()
    .single();
  if (error) throw error;
  return data;
}

/** 전체 회원 조회 (페이지네이션 + 검색) */
export async function getAllMembers({ page = 1, limit = 20, search = '' } = {}) {
  const client = getSupabase();
  if (!client) return { data: [], total: 0 };

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = client
    .from('user_profiles')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(from, to);

  if (search) {
    query = query.or(`display_name.ilike.%${search}%,email.ilike.%${search}%`);
  }

  const { data, count, error } = await query;
  if (error) {
    console.error('getAllMembers error:', error);
    return { data: [], total: 0 };
  }
  return { data: data || [], total: count || 0 };
}

/** 회원 비활성화 (is_active = false) */
export async function updateMemberStatus(userId: string) {
  const client = getSupabase();
  if (!client) return null;
  const { data, error } = await client
    .from('user_profiles')
    .update({
      is_active: false,
      updated_at: new Date().toISOString(),
    })
    .eq('id', userId)
    .select()
    .single();
  if (error) throw error;
  return data;
}
