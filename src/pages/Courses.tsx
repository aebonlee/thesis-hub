import { useEffect, type ReactElement } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import SEOHead from '../components/SEOHead';
import useAOS from '../hooks/useAOS';
import site from '../config/site';

const CATEGORY_IDS = site.categories.map((c) => c.id);

const Courses = (): ReactElement => {
  const { id } = useParams();
  const { t, language } = useLanguage();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  useAOS();

  const isCategory = id && CATEGORY_IDS.includes(id);
  const isSiteId = id && !isCategory && site.learningSites.some((s) => s.id === id);
  const activeSite = isSiteId ? site.learningSites.find((s) => s.id === id) : null;
  const activeCategory = isCategory ? id : (activeSite ? activeSite.category : null);

  useEffect(() => {
    if (isSiteId) {
      const el = document.getElementById(`course-${id}`);
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'center' }), 300);
    }
  }, [id, isSiteId]);

  const categoriesToShow = activeCategory
    ? site.categories.filter((c) => c.id === activeCategory)
    : site.categories;

  const getDifficulty = (level: string) => t(`site.difficulty.${level}`);

  const handleVisitSite = (url: string) => {
    if (!isLoggedIn) {
      sessionStorage.setItem('dreamit_return_url', url);
      navigate('/login', { state: { returnUrl: url } });
      return;
    }
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const getPageTitle = (): string => {
    if (isCategory) {
      const catTitle = t('site.courses.categoryTitle');
      return typeof catTitle === 'object' ? catTitle[id as string] : t('site.courses.title');
    }
    return t('site.courses.title') as string;
  };

  return (
    <>
      <SEOHead title={getPageTitle()} description={t('site.courses.subtitle')} path="/courses" />

      <section className="page-header">
        <div className="container">
          <h2>{getPageTitle()}</h2>
          <p>{t('site.courses.subtitle')}</p>
        </div>
      </section>

      <section className="edu-courses-section">
        <div className="container">
          {categoriesToShow.map((cat) => {
            const sitesInCat = site.learningSites.filter((s) => s.category === cat.id);
            const catName = language === 'en' ? cat.nameEn : cat.name;
            return (
              <div key={cat.id} className="edu-category-section">
                <div className="edu-category-title">
                  <span className="edu-category-title-icon"><i className={cat.icon}></i></span>
                  <h3>{catName}</h3>
                  <span className="edu-category-title-count">{sitesInCat.length}</span>
                </div>
                <div className="edu-detail-grid">
                  {sitesInCat.map((ls, idx) => (
                    <div
                      key={ls.id}
                      className={`edu-detail-card ${id === ls.id ? 'highlighted' : ''}${ls.url === '#' ? ' edu-detail-card-upcoming' : ''}`}
                      id={`course-${ls.id}`}
                      data-aos="fade-up" data-aos-delay={idx * 100}
                    >
                      {ls.url === '#' && (
                        <span className="edu-upcoming-badge">
                          <i className="fa-solid fa-clock"></i> {t('site.courses.comingSoon')}
                        </span>
                      )}
                      <div className="edu-detail-card-top">
                        <span className="edu-site-icon edu-site-icon-lg" style={{ color: ls.color }}><i className={ls.icon}></i></span>
                        <div>
                          <h3>{language === 'en' ? ls.nameEn : ls.name}</h3>
                          <span className={`edu-difficulty-badge ${ls.difficulty}`}>{getDifficulty(ls.difficulty)}</span>
                        </div>
                      </div>
                      <p className="edu-detail-card-desc">{language === 'en' ? ls.descriptionEn : ls.description}</p>
                      <div className="edu-tech-tags">
                        {ls.techStack.map((tech) => <span key={tech} className="edu-tech-tag">{tech}</span>)}
                      </div>
                      <div className="edu-detail-blocks-row">
                        <div className="edu-detail-block">
                          <h4>{t('site.courses.curriculum')}</h4>
                          <ul>
                            {(language === 'en' ? ls.curriculumEn : ls.curriculum).map((item, i) => <li key={i}>{item}</li>)}
                          </ul>
                        </div>
                        <div className="edu-detail-block-right">
                          <div className="edu-detail-block">
                            <h4>{t('site.courses.features')}</h4>
                            <ul>
                              {(language === 'en' ? ls.featuresEn : ls.features).map((item, i) => <li key={i}>{item}</li>)}
                            </ul>
                          </div>
                          <div className="edu-detail-block">
                            <h4>{t('site.courses.target')}</h4>
                            <p>{language === 'en' ? ls.targetEn : ls.target}</p>
                          </div>
                        </div>
                      </div>
                      {ls.url === '#' ? (
                        <span className="btn btn-secondary edu-detail-card-btn edu-coming-soon">{t('site.courses.comingSoon')}</span>
                      ) : (
                        <button className="btn btn-primary edu-detail-card-btn" onClick={() => handleVisitSite(ls.url)}>
                          {t('site.courses.visitSite')} →
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default Courses;
