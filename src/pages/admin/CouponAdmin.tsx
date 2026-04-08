import { useState, useEffect, useCallback, type ReactElement } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import {
  generateCouponCode,
  createCoupon,
  listCoupons,
  toggleCouponActive,
} from '../../utils/couponApi';
import type { CouponWithStats } from '../../types';

const CouponAdmin = (): ReactElement => {
  const { user } = useAuth();
  const [coupons, setCoupons] = useState<CouponWithStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  const [label, setLabel] = useState('');
  const [lectureDate, setLectureDate] = useState('');
  const [preview, setPreview] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    const data = await listCoupons();
    setCoupons(data);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  useEffect(() => {
    if (lectureDate) {
      setPreview(generateCouponCode(lectureDate));
    } else {
      setPreview('');
    }
  }, [lectureDate]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!lectureDate || !user) return;
    setCreating(true);
    try {
      await createCoupon({ label, lectureDate }, user.id);
      setLabel('');
      setLectureDate('');
      setPreview('');
      load();
    } catch (err) {
      alert('쿠폰 생성 실패: ' + (err as Error).message);
    } finally {
      setCreating(false);
    }
  };

  const handleToggle = async (id: string, current: boolean) => {
    try {
      await toggleCouponActive(id, !current);
      setCoupons(prev => prev.map(c => c.id === id ? { ...c, is_active: !current } : c));
    } catch (err) {
      alert('상태 변경 실패: ' + (err as Error).message);
    }
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    alert('쿠폰 코드가 복사되었습니다: ' + code);
  };

  const today = new Date().toISOString().split('T')[0];
  const totalCount = coupons.length;
  const activeCount = coupons.filter(c => c.is_active && c.expires_at >= today).length;
  const expiredCount = coupons.filter(c => c.expires_at < today).length;
  const totalUses = coupons.reduce((sum, c) => sum + c.use_count, 0);

  return (
    <>
      <div className="admin-page-header">
        <h1>쿠폰 관리</h1>
        <p>강의 수강생용 무료 이용권 쿠폰을 관리합니다</p>
      </div>

      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-icon blue">
            <i className="fa-solid fa-ticket"></i>
          </div>
          <div className="admin-stat-info">
            <h3>{totalCount}</h3>
            <p>전체 쿠폰</p>
          </div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-icon green">
            <i className="fa-solid fa-circle-check"></i>
          </div>
          <div className="admin-stat-info">
            <h3>{activeCount}</h3>
            <p>활성 쿠폰</p>
          </div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-icon orange">
            <i className="fa-solid fa-clock"></i>
          </div>
          <div className="admin-stat-info">
            <h3>{expiredCount}</h3>
            <p>만료 쿠폰</p>
          </div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-icon purple">
            <i className="fa-solid fa-users"></i>
          </div>
          <div className="admin-stat-info">
            <h3>{totalUses}</h3>
            <p>총 사용 수</p>
          </div>
        </div>
      </div>

      <div className="admin-table-card" style={{ marginBottom: '24px' }}>
        <div className="admin-table-header">
          <h2>새 쿠폰 발행</h2>
        </div>
        <form onSubmit={handleCreate} style={{ padding: '24px' }} className="admin-form">
          <div className="admin-form-row">
            <div className="admin-form-group">
              <label>메모 (강의명 등)</label>
              <input
                type="text"
                value={label}
                onChange={e => setLabel(e.target.value)}
                placeholder="예: 4월 경영전략 특강"
              />
            </div>
            <div className="admin-form-group">
              <label>강의일 *</label>
              <input
                type="date"
                value={lectureDate}
                onChange={e => setLectureDate(e.target.value)}
                required
              />
            </div>
          </div>

          {preview && (
            <div style={{
              padding: '12px 16px', background: 'var(--bg-light, #f8fafc)',
              borderRadius: '8px', fontSize: '14px', color: 'var(--text-dark)'
            }}>
              <strong>코드 미리보기:</strong>{' '}
              <code style={{ fontFamily: 'monospace', fontSize: '16px', fontWeight: 700 }}>
                {preview}
              </code>
              <span style={{ marginLeft: '16px', color: 'var(--text-light)', fontSize: '13px' }}>
                (만료: {(() => {
                  const d = new Date(lectureDate);
                  d.setDate(d.getDate() + 30);
                  return d.toISOString().split('T')[0];
                })()})
              </span>
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button type="submit" className="admin-btn admin-btn-primary" disabled={creating || !lectureDate}>
              <i className="fa-solid fa-plus"></i>
              {creating ? '생성 중...' : '쿠폰 발행'}
            </button>
          </div>
        </form>
      </div>

      <div className="admin-table-card">
        <div className="admin-table-header">
          <h2>쿠폰 목록 ({totalCount}개)</h2>
        </div>

        {loading ? (
          <div className="admin-loading"><div className="loading-spinner"></div></div>
        ) : coupons.length === 0 ? (
          <div className="admin-empty">
            <i className="fa-solid fa-ticket"></i>
            <p>발행된 쿠폰이 없습니다.</p>
          </div>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>코드</th>
                  <th>메모</th>
                  <th>강의일</th>
                  <th>만료일</th>
                  <th>사용</th>
                  <th>상태</th>
                  <th>관리</th>
                </tr>
              </thead>
              <tbody>
                {coupons.map(c => {
                  const expired = c.expires_at < today;
                  return (
                    <tr key={c.id} style={{ opacity: (!c.is_active || expired) ? 0.6 : 1 }}>
                      <td>
                        <code
                          style={{ cursor: 'pointer', fontWeight: 600, fontFamily: 'monospace' }}
                          onClick={() => copyCode(c.code)}
                          title="클릭하여 복사"
                        >
                          {c.code}
                        </code>
                      </td>
                      <td>{c.label || '-'}</td>
                      <td>{c.lecture_date}</td>
                      <td>{c.expires_at}</td>
                      <td style={{ fontWeight: 600 }}>{c.use_count}명</td>
                      <td>
                        {expired ? (
                          <span className="admin-badge suspended">만료</span>
                        ) : c.is_active ? (
                          <span className="admin-badge active">활성</span>
                        ) : (
                          <span className="admin-badge deleted">비활성</span>
                        )}
                      </td>
                      <td>
                        <button
                          className={`admin-btn admin-btn-sm ${c.is_active ? 'admin-btn-danger' : 'admin-btn-primary'}`}
                          onClick={() => handleToggle(c.id, c.is_active)}
                          disabled={expired}
                        >
                          {c.is_active ? '비활성화' : '활성화'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default CouponAdmin;
