import { useLanguage } from '../contexts/LanguageContext';
import SEOHead from '../components/SEOHead';
import type { ReactElement } from 'react';

const Notice = (): ReactElement => {
  const { t } = useLanguage();
  return (
    <>
      <SEOHead title={t('site.nav.notice')} path="/notice" />
      <section className="page-header">
        <div className="container">
          <h2>{t('site.nav.notice')}</h2>
          <p>{t('site.notice.subtitle')}</p>
        </div>
      </section>
      <section className="edu-coming-soon-section">
        <div className="container">
          <div className="edu-coming-soon-card">
            <div className="edu-coming-soon-icon"><i className="fa-solid fa-bullhorn"></i></div>
            <h3>{t('site.notice.comingSoon')}</h3>
          </div>
        </div>
      </section>
    </>
  );
};

export default Notice;
