import { useState, useEffect, type ReactElement } from 'react';
import { getDashboardStats } from '../../utils/adminApi';

const Dashboard = (): ReactElement => {
  const [stats, setStats] = useState({ orders: 0, revenue: 0, members: 0, products: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboardStats().then((s) => {
      setStats(s);
      setLoading(false);
    });
  }, []);

  const formatRevenue = (v: number) => `₩${v.toLocaleString()}`;

  return (
    <>
      <div className="admin-page-header">
        <h1>대시보드</h1>
        <p>DreamIT Exam Hub 관리자 현황</p>
      </div>

      {loading ? (
        <div className="admin-loading"><div className="loading-spinner"></div></div>
      ) : (
        <div className="admin-stats-grid">
          <div className="admin-stat-card">
            <div className="admin-stat-icon blue"><i className="fa-solid fa-receipt"></i></div>
            <div className="admin-stat-info">
              <h3>{stats.orders}</h3>
              <p>총 주문</p>
            </div>
          </div>
          <div className="admin-stat-card">
            <div className="admin-stat-icon green"><i className="fa-solid fa-won-sign"></i></div>
            <div className="admin-stat-info">
              <h3>{formatRevenue(stats.revenue)}</h3>
              <p>총 매출</p>
            </div>
          </div>
          <div className="admin-stat-card">
            <div className="admin-stat-icon purple"><i className="fa-solid fa-users"></i></div>
            <div className="admin-stat-info">
              <h3>{stats.members}</h3>
              <p>총 회원</p>
            </div>
          </div>
          <div className="admin-stat-card">
            <div className="admin-stat-icon orange"><i className="fa-solid fa-box"></i></div>
            <div className="admin-stat-info">
              <h3>{stats.products}</h3>
              <p>활성 상품</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
