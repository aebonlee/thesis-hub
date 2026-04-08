import { useLanguage } from '../contexts/LanguageContext';
import SEOHead from '../components/SEOHead';
import useAOS from '../hooks/useAOS';
import type { ReactElement } from 'react';

const About = (): ReactElement => {
  const { t } = useLanguage();
  useAOS();

  const values = [
    { icon: 'fa-solid fa-bullseye', titleKey: 'value1Title', descKey: 'value1Desc' },
    { icon: 'fa-solid fa-earth-americas', titleKey: 'value2Title', descKey: 'value2Desc' },
    { icon: 'fa-solid fa-rocket', titleKey: 'value3Title', descKey: 'value3Desc' },
    { icon: 'fa-solid fa-handshake', titleKey: 'value4Title', descKey: 'value4Desc' },
  ];

  return (
    <>
      <SEOHead title={t('site.about.title')} description={t('site.about.subtitle')} path="/about" />

      <section className="page-header">
        <div className="container">
          <h2>{t('site.about.title')}</h2>
          <p>{t('site.about.subtitle')}</p>
        </div>
      </section>

      <section className="edu-mission-section">
        <div className="container">
          <div className="edu-mission-grid">
            <div className="edu-mission-card" data-aos="fade-up">
              <div className="edu-mission-icon"><i className="fa-solid fa-graduation-cap"></i></div>
              <h3>{t('site.about.missionTitle')}</h3>
              <p>{t('site.about.missionDesc')}</p>
            </div>
            <div className="edu-mission-card" data-aos="fade-up" data-aos-delay="100">
              <div className="edu-mission-icon"><i className="fa-solid fa-binoculars"></i></div>
              <h3>{t('site.about.visionTitle')}</h3>
              <p>{t('site.about.visionDesc')}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="edu-values-section">
        <div className="container">
          <h3 className="section-title text-center">{t('site.about.valuesTitle')}</h3>
          <div className="edu-values-grid">
            {values.map((v, i) => (
              <div key={i} className="edu-value-card" data-aos="fade-up" data-aos-delay={i * 100}>
                <span className="edu-value-icon"><i className={v.icon}></i></span>
                <h4>{t(`site.about.${v.titleKey}`)}</h4>
                <p>{t(`site.about.${v.descKey}`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="edu-team-section">
        <div className="container">
          <div className="section-header">
            <h3 className="section-title">{t('site.about.teamTitle')}</h3>
            <p className="section-subtitle">{t('site.about.teamDesc')}</p>
          </div>
          <div className="edu-team-grid">
            <div className="edu-team-card" data-aos="fade-up">
              <div className="edu-team-avatar"><i className="fa-solid fa-user-tie"></i></div>
              <h4>이애본</h4>
              <p className="edu-team-role">대표 / CEO</p>
              <p className="edu-team-desc">DreamIT Biz 대표이사, 경영 교육 기획 총괄</p>
            </div>
            <div className="edu-team-card" data-aos="fade-up" data-aos-delay="100">
              <div className="edu-team-avatar"><i className="fa-solid fa-chalkboard-user"></i></div>
              <h4>교육팀</h4>
              <p className="edu-team-role">Education Team</p>
              <p className="edu-team-desc">커리큘럼 개발 및 학습 콘텐츠 관리</p>
            </div>
            <div className="edu-team-card" data-aos="fade-up" data-aos-delay="200">
              <div className="edu-team-avatar"><i className="fa-solid fa-screwdriver-wrench"></i></div>
              <h4>기술팀</h4>
              <p className="edu-team-role">Tech Team</p>
              <p className="edu-team-desc">플랫폼 개발 및 운영, 기술 지원</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
