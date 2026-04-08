import { useState, useEffect, useCallback, type ReactElement } from 'react';
import { getAllOrders, updateOrderStatus } from '../../utils/adminApi';

const STATUS_OPTIONS = ['all', 'paid', 'pending', 'cancelled', 'refunded'];
const LIMIT = 20;

const statusLabel: Record<string, string> = {
  paid: '결제완료', pending: '대기', cancelled: '취소', refunded: '환불',
};

const Orders = (): ReactElement => {
  const [orders, setOrders] = useState<Record<string, unknown>[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await getAllOrders({
      page,
      limit: LIMIT,
      status: statusFilter === 'all' ? '' : statusFilter,
    });
    setOrders(res.data);
    setTotal(res.total);
    setLoading(false);
  }, [page, statusFilter]);

  useEffect(() => { load(); }, [load]);

  const totalPages = Math.ceil(total / LIMIT);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      load();
    } catch (err) {
      alert('상태 변경 실패: ' + (err as Error).message);
    }
  };

  const formatDate = (d: string) => new Date(d).toLocaleDateString('ko-KR');
  const formatPrice = (v: unknown) => `₩${((v as number) || 0).toLocaleString()}`;

  return (
    <>
      <div className="admin-page-header">
        <h1>주문 관리</h1>
        <p>전체 주문을 조회하고 상태를 관리합니다</p>
      </div>

      <div className="admin-table-card">
        <div className="admin-table-header">
          <h2>주문 목록 ({total}건)</h2>
          <div className="admin-table-actions">
            <select
              className="admin-filter-select"
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {s === 'all' ? '전체 상태' : statusLabel[s] || s}
                </option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <div className="admin-loading"><div className="loading-spinner"></div></div>
        ) : orders.length === 0 ? (
          <div className="admin-empty">
            <i className="fa-solid fa-receipt"></i>
            <p>주문이 없습니다.</p>
          </div>
        ) : (
          <>
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>주문번호</th>
                    <th>주문일</th>
                    <th>결제금액</th>
                    <th>상태</th>
                    <th>상태 변경</th>
                    <th>상세</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => {
                    const id = order.id as string;
                    const status = (order.payment_status || order.status) as string;
                    const items = (order.order_items || []) as Record<string, unknown>[];
                    return (
                      <>
                        <tr key={id}>
                          <td style={{ fontFamily: 'monospace' }}>#{id}</td>
                          <td>{formatDate(order.created_at as string)}</td>
                          <td>{formatPrice(order.total_amount)}</td>
                          <td>
                            <span className={`admin-badge ${status}`}>
                              {statusLabel[status] || status}
                            </span>
                          </td>
                          <td>
                            <select
                              className="admin-filter-select"
                              value={status}
                              onChange={(e) => handleStatusChange(id, e.target.value)}
                              style={{ fontSize: '12px', padding: '4px 8px' }}
                            >
                              <option value="paid">결제완료</option>
                              <option value="pending">대기</option>
                              <option value="cancelled">취소</option>
                              <option value="refunded">환불</option>
                            </select>
                          </td>
                          <td>
                            <button
                              className="admin-btn admin-btn-sm admin-btn-secondary"
                              onClick={() => setExpandedId(expandedId === id ? null : id)}
                            >
                              {expandedId === id ? '접기' : '펼치기'}
                            </button>
                          </td>
                        </tr>
                        {expandedId === id && items.length > 0 && (
                          <tr key={`${id}-detail`}>
                            <td colSpan={6}>
                              <div className="admin-order-detail">
                                <table>
                                  <thead>
                                    <tr>
                                      <th>상품명</th>
                                      <th>단가</th>
                                      <th>수량</th>
                                      <th>소계</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {items.map((item, i) => (
                                      <tr key={i}>
                                        <td>{(item.product_title || item.product_id) as string}</td>
                                        <td>{formatPrice(item.unit_price)}</td>
                                        <td>{item.quantity as number}</td>
                                        <td>{formatPrice((item.unit_price as number) * (item.quantity as number))}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </td>
                          </tr>
                        )}
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <div className="admin-pagination">
                <button disabled={page <= 1} onClick={() => setPage(page - 1)}>‹</button>
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter((p) => Math.abs(p - page) <= 2 || p === 1 || p === totalPages)
                  .map((p, i, arr) => (
                    <span key={p}>
                      {i > 0 && arr[i - 1] !== p - 1 && <span style={{ padding: '0 4px' }}>…</span>}
                      <button
                        className={page === p ? 'active' : ''}
                        onClick={() => setPage(p)}
                      >
                        {p}
                      </button>
                    </span>
                  ))}
                <button disabled={page >= totalPages} onClick={() => setPage(page + 1)}>›</button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Orders;
