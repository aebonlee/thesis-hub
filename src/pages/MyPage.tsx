import { useState, useEffect, type ReactElement } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { updateProfile } from '../utils/auth';
import { redeemCoupon, getMyActiveCoupons, hasActiveCouponAccess } from '../utils/couponApi';
import { getUserLicenses } from '../utils/supabase';
import type { MyCoupon } from '../types';
import SEOHead from '../components/SEOHead';
import '../styles/auth.css';

const MyPage = (): ReactElement => {
  const { t } = useLanguage();
  const { user, profile, signOut, refreshProfile } = useAuth();
  const navigate = useNavigate();

  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ displayName: '', avatarUrl: '' });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  // 이용권 상태
  const [licenses, setLicenses] = useState<Record<string, unknown>[]>([]);
  const [licensesLoading, setLicensesLoading] = useState(false);
  const [hasCouponAccess, setHasCouponAccess] = useState(false);

  // 쿠폰 상태
  const [couponCode, setCouponCode] = useState('');
  const [couponMsg, setCouponMsg] = useState('');
  const [couponError, setCouponError] = useState(false);
  const [couponLoading, setCouponLoading] = useState(false);
  const [myCoupons, setMyCoupons] = useState<MyCoupon[]>([]);
  const [myCouponsLoading, setMyCouponsLoading] = useState(false);

  useEffect(() => {
    if (profile) {
      setForm({
        displayName: profile.display_name || '',
        avatarUrl: profile.avatar_url || ''
      });
    }
  }, [profile]);

  useEffect(() => {
    if (user?.id) {
      setLicensesLoading(true);
      getUserLicenses(user.id).then(data => {
        setLicenses(data);
        setLicensesLoading(false);
      });
      setMyCouponsLoading(true);
      getMyActiveCoupons(user.id).then(data => {
        setMyCoupons(data);
        setMyCouponsLoading(false);
      });
      hasActiveCouponAccess(user.id).then(setHasCouponAccess);
    }
  }, [user]);

  const handleRedeemCoupon = async () => {
    if (!couponCode.trim() || !user) return;
    setCouponLoading(true);
    setCouponMsg('');
    setCouponError(false);
    try {
      await redeemCoupon(couponCode.trim(), user.id);
      setCouponMsg('쿠폰이 등록되었습니다! 이용권이 활성화됩니다.');
      setCouponCode('');
      // 쿠폰 목록 + 라이선스 목록 + 쿠폰 접근 상태 모두 갱신
      const [coupons, lics] = await Promise.all([
        getMyActiveCoupons(user.id),
        getUserLicenses(user.id),
      ]);
      setMyCoupons(coupons);
      setLicenses(lics);
      setHasCouponAccess(true);
    } catch (err) {
      setCouponMsg((err as Error).message);
      setCouponError(true);
    } finally {
      setCouponLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage('');
    try {
      await updateProfile(user!.id, {
        display_name: form.displayName,
        avatar_url: form.avatarUrl
      });
      await refreshProfile();
      setEditing(false);
      setMessage(t('auth.profileUpdated'));
    } catch (err) {
      setMessage((err as Error).message);
    } finally {
      setSaving(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <>
      <SEOHead title="마이페이지" path="/mypage" noindex />
      <section className="page-header">
        <div className="container">
          <h1 className="page-title">{t('auth.myPage')}</h1>
        </div>
      </section>

      <section className="auth-section">
        <div className="container">
          <div className="mypage-card">
            <div className="mypage-avatar">
              {profile?.avatar_url ? (
                <img src={profile.avatar_url} alt={profile.display_name} loading="lazy" />
              ) : (
                <div className="mypage-avatar-placeholder">
                  {(profile?.display_name || user?.email || '?')[0].toUpperCase()}
                </div>
              )}
            </div>

            <div className="mypage-info">
              {editing ? (
                <div className="mypage-edit-form">
                  <div className="auth-form-group">
                    <label>{t('auth.displayName')}</label>
                    <input
                      type="text"
                      value={form.displayName}
                      onChange={e => setForm({ ...form, displayName: e.target.value })}
                    />
                  </div>
                  <div className="mypage-edit-actions">
                    <button className="board-btn primary" onClick={handleSave} disabled={saving}>
                      {saving ? t('auth.saving') : t('auth.save')}
                    </button>
                    <button className="board-btn" onClick={() => setEditing(false)}>
                      {t('community.cancel')}
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="mypage-name">{profile?.display_name || t('auth.noName')}</h2>
                  <p className="mypage-email">{user?.email}</p>
                  <p className="mypage-provider">
                    {profile?.provider ? `${t('auth.loginWith')} ${profile.provider}` : t('auth.emailAccount')}
                  </p>
                  {profile?.role === 'admin' && (
                    <span className="mypage-role-badge">{t('auth.admin')}</span>
                  )}
                  <button className="board-btn" onClick={() => setEditing(true)} style={{ marginTop: '16px' }}>
                    {t('auth.editProfile')}
                  </button>
                </>
              )}

              {message && <div className="auth-message">{message}</div>}
            </div>

            {/* 이용권 현황 */}
            <div className="mypage-sections">
              <h3 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: 600, color: 'var(--text-main)' }}>
                이용권 현황
              </h3>
              {licensesLoading ? (
                <p style={{ color: 'var(--text-light)', fontSize: '14px' }}>로딩 중...</p>
              ) : licenses.length === 0 && !hasCouponAccess ? (
                <div style={{ padding: '20px', background: 'var(--bg-light)', borderRadius: '12px', textAlign: 'center' }}>
                  <p style={{ color: 'var(--text-light)', fontSize: '14px', marginBottom: '12px' }}>보유한 이용권이 없습니다.</p>
                  <p style={{ color: 'var(--text-light)', fontSize: '13px' }}>아래에서 쿠폰을 등록하거나 이용권을 구매하세요.</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {/* 쿠폰 기반 이용권 */}
                  {hasCouponAccess && myCoupons.filter(c => {
                    const todayStr = new Date().toISOString().split('T')[0];
                    return c.expires_at >= todayStr;
                  }).map(c => (
                    <div key={`coupon-${c.id}`} style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      padding: '12px 16px', background: 'var(--bg-light)', borderRadius: '10px',
                      border: '1px solid #16a34a40'
                    }}>
                      <div>
                        <span style={{
                          display: 'inline-block', padding: '2px 8px', borderRadius: '4px', fontSize: '11px',
                          fontWeight: 600, marginRight: '8px', background: '#16a34a', color: '#fff'
                        }}>
                          쿠폰
                        </span>
                        <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-main)' }}>
                          전체 이용권 ({c.label || '쿠폰 등록'})
                        </span>
                      </div>
                      <span style={{ fontSize: '12px', color: 'var(--text-light)' }}>
                        ~{c.expires_at}
                      </span>
                    </div>
                  ))}
                  {/* 결제 기반 이용권 */}
                  {licenses.map((lic) => (
                    <div key={lic.id as string} style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      padding: '12px 16px', background: 'var(--bg-light)', borderRadius: '10px',
                      border: '1px solid var(--border-color)'
                    }}>
                      <div>
                        <span style={{
                          display: 'inline-block', padding: '2px 8px', borderRadius: '4px', fontSize: '11px',
                          fontWeight: 600, marginRight: '8px',
                          background: lic.license_type === 'bundle' ? 'var(--primary-blue, #2563eb)' : 'var(--accent-color, #f59e0b)',
                          color: '#fff'
                        }}>
                          {lic.license_type === 'bundle' ? '전체' : '개별'}
                        </span>
                        <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-main)' }}>
                          {lic.license_type === 'bundle' ? '전체 이용권' : (lic.site_slug as string)}
                        </span>
                      </div>
                      <span style={{ fontSize: '12px', color: 'var(--text-light)' }}>
                        {new Date(lic.created_at as string).toLocaleDateString('ko-KR')}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 쿠폰 등록 */}
            <div className="mypage-sections" style={{ marginTop: '16px' }}>
              <h3 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: 600, color: 'var(--text-main)' }}>
                쿠폰 등록
              </h3>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                <input
                  type="text"
                  value={couponCode}
                  onChange={e => setCouponCode(e.target.value.toUpperCase())}
                  placeholder="쿠폰 코드 입력 (예: BIZ-20260407-K3M7)"
                  style={{
                    flex: 1, padding: '10px 14px', borderRadius: '10px',
                    border: '1px solid var(--border-color)', fontSize: '14px',
                    fontFamily: 'monospace', background: 'var(--bg-white)',
                    color: 'var(--text-main)'
                  }}
                  onKeyDown={e => e.key === 'Enter' && handleRedeemCoupon()}
                />
                <button
                  className="btn btn-primary"
                  onClick={handleRedeemCoupon}
                  disabled={couponLoading || !couponCode.trim()}
                  style={{ padding: '10px 20px', fontSize: '14px', whiteSpace: 'nowrap' }}
                >
                  {couponLoading ? '등록 중...' : '등록'}
                </button>
              </div>
              {couponMsg && (
                <p style={{
                  fontSize: '13px', marginBottom: '12px',
                  color: couponError ? '#dc2626' : '#16a34a'
                }}>
                  {couponMsg}
                </p>
              )}

              {myCouponsLoading ? (
                <p style={{ color: 'var(--text-light)', fontSize: '14px' }}>로딩 중...</p>
              ) : myCoupons.length === 0 ? (
                <p style={{ color: 'var(--text-light)', fontSize: '14px' }}>등록된 쿠폰이 없습니다.</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {myCoupons.map(c => {
                    const todayStr = new Date().toISOString().split('T')[0];
                    const expired = c.expires_at < todayStr;
                    const dDay = Math.ceil(
                      (new Date(c.expires_at).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
                    );
                    return (
                      <div key={c.id} style={{
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        padding: '12px 16px', background: 'var(--bg-light)', borderRadius: '10px',
                        border: '1px solid var(--border-color)', opacity: expired ? 0.6 : 1
                      }}>
                        <div>
                          <code style={{ fontFamily: 'monospace', fontSize: '13px', fontWeight: 600, marginRight: '8px' }}>
                            {c.code}
                          </code>
                          <span style={{ fontSize: '13px', color: 'var(--text-light)' }}>
                            {c.label}
                          </span>
                          <div style={{ fontSize: '12px', color: 'var(--text-light)', marginTop: '4px' }}>
                            이용기간: {c.lecture_date} ~ {c.expires_at}
                          </div>
                        </div>
                        <span style={{
                          padding: '3px 10px', borderRadius: '9999px', fontSize: '12px', fontWeight: 600,
                          background: expired ? '#fee2e2' : '#dcfce7',
                          color: expired ? '#991b1b' : '#166534'
                        }}>
                          {expired ? '만료' : `D-${dDay}`}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="mypage-sections" style={{ marginTop: '16px' }}>
              <Link to="/mypage/orders" className="mypage-link-card">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                <span>{t('auth.orderHistory')}</span>
              </Link>
            </div>

            <div className="mypage-footer">
              <button className="board-btn danger" onClick={handleSignOut}>
                {t('auth.logout')}
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MyPage;
