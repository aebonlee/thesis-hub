import { useLanguage } from '../contexts/LanguageContext';
import SEOHead from '../components/SEOHead';
import type { ReactElement } from 'react';

const QnA = (): ReactElement => {
  const { t } = useLanguage();
  return (
    <>
      <SEOHead title={t('site.nav.qna')} path="/qna" />
      <section className="page-header">
        <div className="container">
          <h2>{t('site.nav.qna')}</h2>
          <p>{t('site.qna.subtitle')}</p>
        </div>
      </section>
      <section className="edu-coming-soon-section">
        <div className="container">
          <div className="edu-coming-soon-card">
            <div className="edu-coming-soon-icon"><i className="fa-solid fa-circle-question"></i></div>
            <h3>{t('site.qna.comingSoon')}</h3>
          </div>
        </div>
      </section>
    </>
  );
};

export default QnA;
