import { useLanguage } from '../contexts/LanguageContext';
import SEOHead from '../components/SEOHead';
import useAOS from '../hooks/useAOS';
import type { ReactElement } from 'react';

const PapersCommunity = (): ReactElement => {
  const { t } = useLanguage();
  useAOS();

  const features = [
    { icon: 'fa-solid fa-user-group', titleKey: 'feature1Title', descKey: 'feature1Desc' },
    { icon: 'fa-solid fa-comments', titleKey: 'feature2Title', descKey: 'feature2Desc' },
    { icon: 'fa-solid fa-network-wired', titleKey: 'feature3Title', descKey: 'feature3Desc' },
    { icon: 'fa-solid fa-paper-plane', titleKey: 'feature4Title', descKey: 'feature4Desc' },
  ];

  const targets = [
    { icon: 'fa-solid fa-user-graduate', titleKey: 'target1Title', descKey: 'target1Desc' },
    { icon: 'fa-solid fa-microscope', titleKey: 'target2Title', descKey: 'target2Desc' },
    { icon: 'fa-solid fa-chalkboard-user', titleKey: 'target3Title', descKey: 'target3Desc' },
  ];

  return (
    <>
      <SEOHead
        title={t('site.papersCommunity.title')}
        description={t('site.papersCommunity.subtitle')}
        path="/papers-community"
      />

      <section className="page-header" style={{ borderBottom: '3px solid #0369A1' }}>
        <div className="container">
          <h2>
            <i className="fa-solid fa-users-rectangle" style={{ color: '#0369A1', marginRight: '12px' }}></i>
            {t('site.papersCommunity.title')}
          </h2>
          <p>{t('site.papersCommunity.subtitle')}</p>
        </div>
      </section>

      {/* 커뮤니티 소개 */}
      <section className="edu-mission-section">
        <div className="container">
          <div className="edu-mission-grid">
            <div className="edu-mission-card" data-aos="fade-up">
              <div className="edu-mission-icon"><i className="fa-solid fa-users-rectangle" style={{ color: '#0369A1' }}></i></div>
              <h3>{t('site.papersCommunity.introTitle')}</h3>
              <p>{t('site.papersCommunity.introDesc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 주요 기능 4가지 */}
      <section className="edu-values-section">
        <div className="container">
          <h3 className="section-title text-center">{t('site.papersCommunity.featuresTitle')}</h3>
          <div className="edu-values-grid">
            {features.map((f, i) => (
              <div key={i} className="edu-value-card" data-aos="fade-up" data-aos-delay={i * 100}>
                <span className="edu-value-icon"><i className={f.icon} style={{ color: '#0369A1' }}></i></span>
                <h4>{t(`site.papersCommunity.${f.titleKey}`)}</h4>
                <p>{t(`site.papersCommunity.${f.descKey}`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 참여 대상 */}
      <section className="edu-values-section" style={{ background: 'var(--bg-secondary, #f8f9fa)' }}>
        <div className="container">
          <h3 className="section-title text-center">{t('site.papersCommunity.targetTitle')}</h3>
          <div className="edu-mission-grid">
            {targets.map((tg, i) => (
              <div key={i} className="edu-mission-card" data-aos="fade-up" data-aos-delay={i * 100}>
                <div className="edu-mission-icon"><i className={tg.icon} style={{ color: '#0369A1' }}></i></div>
                <h4>{t(`site.papersCommunity.${tg.titleKey}`)}</h4>
                <p>{t(`site.papersCommunity.${tg.descKey}`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section" data-aos="fade-up">
        <div className="container">
          <div className="cta-content text-center">
            <h2>{t('site.papersCommunity.ctaTitle')}</h2>
            <p>{t('site.papersCommunity.ctaDesc')}</p>
            <a href="https://papers.dreamitbiz.com" target="_blank" rel="noopener noreferrer" className="btn btn-primary-large">
              {t('site.papersCommunity.ctaBtn')}
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default PapersCommunity;
