import { useState, useEffect, useCallback, type ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { getProducts, deleteProduct, toggleSoldOut } from '../../utils/productStorage';
import type { Product } from '../../types';

const Products = (): ReactElement => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const data = await getProducts(true);
    setProducts(data);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleDelete = async (id: number) => {
    if (!window.confirm('이 상품을 비활성화하시겠습니까?')) return;
    try {
      await deleteProduct(id);
      load();
    } catch (err) {
      alert('삭제 실패: ' + (err as Error).message);
    }
  };

  const handleToggleSoldOut = async (id: number, current: boolean) => {
    try {
      await toggleSoldOut(id, !current);
      load();
    } catch (err) {
      alert('변경 실패: ' + (err as Error).message);
    }
  };

  const formatPrice = (v: number) => `₩${(v || 0).toLocaleString()}`;

  return (
    <>
      <div className="admin-page-header">
        <h1>상품 관리</h1>
        <p>상품을 등록, 수정, 관리합니다</p>
      </div>

      <div className="admin-table-card">
        <div className="admin-table-header">
          <h2>상품 목록 ({products.length}개)</h2>
          <div className="admin-table-actions">
            <Link to="/admin/products/new" className="admin-btn admin-btn-primary">
              <i className="fa-solid fa-plus"></i> 상품 등록
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="admin-loading"><div className="loading-spinner"></div></div>
        ) : products.length === 0 ? (
          <div className="admin-empty">
            <i className="fa-solid fa-box"></i>
            <p>등록된 상품이 없습니다.</p>
          </div>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>상품명</th>
                  <th>카테고리</th>
                  <th>가격</th>
                  <th>상태</th>
                  <th>정렬</th>
                  <th>관리</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id} style={{ opacity: p.isActive ? 1 : 0.5 }}>
                    <td>{p.id}</td>
                    <td>{p.title}</td>
                    <td>{p.category}</td>
                    <td>{formatPrice(p.price)}</td>
                    <td>
                      {!p.isActive ? (
                        <span className="admin-badge deleted">비활성</span>
                      ) : p.isSoldOut ? (
                        <span className="admin-badge cancelled">품절</span>
                      ) : (
                        <span className="admin-badge active">판매중</span>
                      )}
                    </td>
                    <td>{p.sortOrder}</td>
                    <td style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                      <Link
                        to={`/admin/products/edit/${p.id}`}
                        className="admin-btn admin-btn-sm admin-btn-secondary"
                      >
                        수정
                      </Link>
                      {p.isActive && (
                        <button
                          className="admin-btn admin-btn-sm admin-btn-secondary"
                          onClick={() => handleToggleSoldOut(p.id, p.isSoldOut)}
                        >
                          {p.isSoldOut ? '판매재개' : '품절'}
                        </button>
                      )}
                      {p.isActive && (
                        <button
                          className="admin-btn admin-btn-sm admin-btn-danger"
                          onClick={() => handleDelete(p.id)}
                        >
                          삭제
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default Products;
