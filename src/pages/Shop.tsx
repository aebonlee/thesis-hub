import { useLanguage } from '../contexts/LanguageContext';
import SEOHead from '../components/SEOHead';
import type { ReactElement } from 'react';

const Shop = (): ReactElement => {
  const { t } = useLanguage();
  return (
    <>
      <SEOHead title={t('shop.title')} path="/shop" />
      <section className="page-header">
        <div className="container">
          <h2>{t('shop.title')}</h2>
          <p>{t('shop.subtitle')}</p>
        </div>
      </section>
      <section className="edu-coming-soon-section">
        <div className="container">
          <div className="edu-coming-soon-card">
            <div className="edu-coming-soon-icon"><i className="fa-solid fa-store"></i></div>
            <h3>{t('site.courses.comingSoon')}</h3>
          </div>
        </div>
      </section>
    </>
  );
};

export default Shop;
