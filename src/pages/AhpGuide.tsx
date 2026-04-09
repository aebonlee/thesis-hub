import { useLanguage } from '../contexts/LanguageContext';
import SEOHead from '../components/SEOHead';
import useAOS from '../hooks/useAOS';
import type { ReactElement } from 'react';

const AhpGuide = (): ReactElement => {
  const { t } = useLanguage();
  useAOS();

  const steps = [
    { icon: 'fa-solid fa-diagram-project', titleKey: 'step1Title', descKey: 'step1Desc' },
    { icon: 'fa-solid fa-scale-balanced', titleKey: 'step2Title', descKey: 'step2Desc' },
    { icon: 'fa-solid fa-calculator', titleKey: 'step3Title', descKey: 'step3Desc' },
    { icon: 'fa-solid fa-chart-pie', titleKey: 'step4Title', descKey: 'step4Desc' },
  ];

  const features = [
    { icon: 'fa-solid fa-globe', titleKey: 'feature1Title', descKey: 'feature1Desc' },
    { icon: 'fa-solid fa-robot', titleKey: 'feature2Title', descKey: 'feature2Desc' },
    { icon: 'fa-solid fa-check-double', titleKey: 'feature3Title', descKey: 'feature3Desc' },
    { icon: 'fa-solid fa-file-lines', titleKey: 'feature4Title', descKey: 'feature4Desc' },
  ];

  const useCases = [
    { icon: 'fa-solid fa-book-open', key: 'useCase1' },
    { icon: 'fa-solid fa-landmark', key: 'useCase2' },
    { icon: 'fa-solid fa-briefcase', key: 'useCase3' },
  ];

  return (
    <>
      <SEOHead
        title={t('site.ahpGuide.title')}
        description={t('site.ahpGuide.subtitle')}
        path="/ahp-guide"
      />

      <section className="page-header" style={{ borderBottom: '3px solid #7C3AED' }}>
        <div className="container">
          <h2>
            <i className="fa-solid fa-scale-balanced" style={{ color: '#7C3AED', marginRight: '12px' }}></i>
            {t('site.ahpGuide.title')}
          </h2>
          <p>{t('site.ahpGuide.subtitle')}</p>
        </div>
      </section>

      {/* AHP란? */}
      <section className="edu-mission-section">
        <div className="container">
          <div className="edu-mission-grid">
            <div className="edu-mission-card" data-aos="fade-up">
              <div className="edu-mission-icon"><i className="fa-solid fa-scale-balanced" style={{ color: '#7C3AED' }}></i></div>
              <h3>{t('site.ahpGuide.whatIsAhp')}</h3>
              <p>{t('site.ahpGuide.whatIsAhpDesc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 사용 흐름 4단계 */}
      <section className="edu-values-section">
        <div className="container">
          <h3 className="section-title text-center">{t('site.ahpGuide.stepsTitle')}</h3>
          <div className="edu-values-grid">
            {steps.map((s, i) => (
              <div key={i} className="edu-value-card" data-aos="fade-up" data-aos-delay={i * 100}>
                <span className="edu-value-icon"><i className={s.icon} style={{ color: '#7C3AED' }}></i></span>
                <h4>{t(`site.ahpGuide.${s.titleKey}`)}</h4>
                <p>{t(`site.ahpGuide.${s.descKey}`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 주요 기능 소개 */}
      <section className="edu-values-section" style={{ background: 'var(--bg-secondary, #f8f9fa)' }}>
        <div className="container">
          <h3 className="section-title text-center">{t('site.ahpGuide.featuresTitle')}</h3>
          <div className="edu-values-grid">
            {features.map((f, i) => (
              <div key={i} className="edu-value-card" data-aos="fade-up" data-aos-delay={i * 100}>
                <span className="edu-value-icon"><i className={f.icon} style={{ color: '#7C3AED' }}></i></span>
                <h4>{t(`site.ahpGuide.${f.titleKey}`)}</h4>
                <p>{t(`site.ahpGuide.${f.descKey}`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 활용 사례 */}
      <section className="edu-values-section">
        <div className="container">
          <h3 className="section-title text-center">{t('site.ahpGuide.useCasesTitle')}</h3>
          <div className="edu-mission-grid">
            {useCases.map((uc, i) => (
              <div key={i} className="edu-mission-card" data-aos="fade-up" data-aos-delay={i * 100}>
                <div className="edu-mission-icon"><i className={uc.icon} style={{ color: '#7C3AED' }}></i></div>
                <p>{t(`site.ahpGuide.${uc.key}`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section" data-aos="fade-up">
        <div className="container">
          <div className="cta-content text-center">
            <h2>{t('site.ahpGuide.ctaTitle')}</h2>
            <p>{t('site.ahpGuide.ctaDesc')}</p>
            <a href="https://ahp-basic.dreamitbiz.com" target="_blank" rel="noopener noreferrer" className="btn btn-primary-large">
              {t('site.ahpGuide.ctaBtn')}
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default AhpGuide;
