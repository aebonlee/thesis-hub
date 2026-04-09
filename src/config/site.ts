/**
 * DreamIT Thesis Hub - 사이트 설정 파일
 * 논문연구학습사이트 허브의 브랜드, 메뉴, 학습사이트 정보를 정의합니다.
 */

import type { SiteConfig } from '../types';

const site: SiteConfig = {
  id: 'thesis-hub',
  name: 'DreamIT Thesis Hub',
  nameKo: '드림아이티 논문연구학습사이트',
  description: 'DreamIT Thesis Hub - 논문연구학습사이트 허브. 연구방법론, 통계학, 조사방법론, AHP연구, 연구커뮤니티 5개 학습 플랫폼',
  url: 'https://thesis-hub.dreamitbiz.com',
  dbPrefix: 'thh_',

  parentSite: { name: 'DreamIT Biz', url: 'https://www.dreamitbiz.com' },

  brand: {
    parts: [
      { text: 'Thesis', className: 'brand-biz' },
      { text: ' Hub', className: 'brand-dream' },
    ]
  },

  themeColor: '#1E40AF',

  company: {
    name: '드림아이티비즈(DreamIT Biz)',
    ceo: '이애본',
    bizNumber: '601-45-20154',
    salesNumber: '제2024-수원팔달-0584호',
    address: '경기도 수원시 팔달구 매산로 45, 419호',
    email: 'aebon@dreamitbiz.com',
    phone: '010-3700-0629',
    kakao: 'aebon',
    businessHours: '평일: 09:00 ~ 18:00',
  },

  features: { shop: true, community: true, search: true, auth: true, license: true },

  colors: [
    { name: 'blue', color: '#1E40AF' },
    { name: 'red', color: '#C8102E' },
    { name: 'green', color: '#00855A' },
    { name: 'orange', color: '#B45309' },
    { name: 'purple', color: '#8B1AC8' },
  ],

  categories: [
    { id: 'learning', name: '학습사이트', nameEn: 'Learning Sites', icon: 'fa-solid fa-book-open', path: '/courses/learning' },
    { id: 'platform', name: '연구 플랫폼', nameEn: 'Research Platforms', icon: 'fa-solid fa-flask-vial', path: '/courses/platform' },
  ],

  menuItems: [
    {
      labelKey: 'site.nav.learning', path: '/courses/learning', activePath: '/courses/learning',
      dropdown: [
        { path: '/courses/survey', labelKey: 'site.nav.survey' },
        { path: '/courses/statistics', labelKey: 'site.nav.statistics' },
        { path: '/courses/research', labelKey: 'site.nav.research' },
      ]
    },
    {
      labelKey: 'site.nav.platform', path: '/courses/platform', activePath: '/courses/platform',
      dropdown: [
        { path: '/ahp-guide', labelKey: 'site.nav.ahpBasic' },
        { path: '/papers-community', labelKey: 'site.nav.papers' },
      ]
    },
    {
      labelKey: 'site.nav.franchise', path: '/franchise', activePath: '/franchise',
      dropdown: [
        { path: '/pricing', labelKey: 'site.nav.pricing' },
        { path: '/franchise', labelKey: 'site.nav.franchiseInquiry' },
        { path: '/shop', labelKey: 'shop.title' },
      ]
    },
    {
      labelKey: 'site.nav.community', path: '/about', activePath: '/about',
      dropdown: [
        { path: '/about', labelKey: 'site.nav.aboutHub' },
        { path: '/notice', labelKey: 'site.nav.notice' },
        { path: '/qna', labelKey: 'site.nav.qna' },
      ]
    },
  ],

  footerLinks: [
    { path: '/courses/learning', labelKey: 'site.nav.learning' },
    { path: '/courses/platform', labelKey: 'site.nav.platform' },
    { path: '/franchise', labelKey: 'site.nav.franchise' },
    { path: '/pricing', labelKey: 'site.nav.pricing' },
    { path: '/about', labelKey: 'site.nav.community' },
  ],

  familySites: [
    { name: 'DreamIT Edu Hub', url: 'https://edu-hub.dreamitbiz.com' },
    { name: 'DreamIT CS Hub', url: 'https://cs-hub.dreamitbiz.com' },
    { name: 'DreamIT Exam Hub', url: 'https://exam-hub.dreamitbiz.com' },
    { name: 'DreamIT Career Hub', url: 'https://career-hub.dreamitbiz.com' },
    { name: 'DreamIT Biz Hub', url: 'https://biz-hub.dreamitbiz.com' },
    { name: 'DreamIT Biz', url: 'https://www.dreamitbiz.com' },
  ],

  learningSites: [
    {
      id: 'survey', name: '연구방법론', nameEn: 'Research Methodology', url: 'https://survey.dreamitbiz.com',
      icon: 'fa-solid fa-file-pen', color: '#0F766E', category: 'learning',
      description: '논문작성 전 과정을 체계적으로 학습합니다. 연구계획서부터 논문투고까지.',
      descriptionEn: 'Systematically learn the entire thesis writing process from research proposals to paper submission.',
      techStack: ['연구계획서', '문헌검토', '연구방법', '논문작성'], difficulty: 'intermediate',
      curriculum: ['연구계획서 작성', '문헌검토 방법', '연구방법 설계', '자료수집과 분석', '결과해석', '논문작성과 투고'],
      curriculumEn: ['Writing research proposals', 'Literature review methods', 'Research method design', 'Data collection & analysis', 'Result interpretation', 'Paper writing & submission'],
      features: ['체계적 커리큘럼', 'IRB 윤리 교육', '논문 템플릿'],
      featuresEn: ['Structured curriculum', 'IRB ethics training', 'Paper templates'],
      target: '대학원생, 연구자', targetEn: 'Graduate students, researchers',
    },
    {
      id: 'statistics', name: '통계학 기초', nameEn: 'Basic Statistics', url: 'https://statistics.dreamitbiz.com',
      icon: 'fa-solid fa-chart-bar', color: '#1D4ED8', category: 'learning',
      description: '기술통계부터 베이지안통계까지 통계학의 모든 것을 학습합니다.',
      descriptionEn: 'Learn everything about statistics from descriptive statistics to Bayesian statistics.',
      techStack: ['기술통계', '추론통계', '회귀분석', '베이지안통계'], difficulty: 'intermediate',
      curriculum: ['기술통계학', '확률론', '추론통계학', '가설검정', '회귀분석', '분산분석', '비모수통계', '베이지안통계'],
      curriculumEn: ['Descriptive statistics', 'Probability theory', 'Inferential statistics', 'Hypothesis testing', 'Regression analysis', 'ANOVA', 'Nonparametric statistics', 'Bayesian statistics'],
      features: ['수학적 증명', '실습 예제', 'R/SPSS 활용'],
      featuresEn: ['Mathematical proofs', 'Practice examples', 'R/SPSS usage'],
      target: '통계학 학습자, 데이터 분석가', targetEn: 'Statistics learners, data analysts',
    },
    {
      id: 'research', name: '조사방법론', nameEn: 'Research Methods', url: 'https://research.dreamitbiz.com',
      icon: 'fa-solid fa-compass-drafting', color: '#1E40AF', category: 'learning',
      description: '사회과학 조사방법론을 체계적으로 배웁니다. 연구설계부터 질적연구까지.',
      descriptionEn: 'Systematically learn social science research methods from research design to qualitative research.',
      techStack: ['연구설계', '설문조사', '실험연구', '질적연구'], difficulty: 'intermediate',
      curriculum: ['연구설계', '표본추출', '측정과 척도', '설문조사법', '실험연구', '질적연구', '통계분석', '연구윤리'],
      curriculumEn: ['Research design', 'Sampling methods', 'Measurement & scales', 'Survey research', 'Experimental research', 'Qualitative research', 'Statistical analysis', 'Research ethics'],
      features: ['실전 연구 사례', '설문 설계 실습', '윤리 교육'],
      featuresEn: ['Real research cases', 'Survey design practice', 'Ethics education'],
      target: '사회과학 연구자, 대학원생', targetEn: 'Social science researchers, graduate students',
    },
    {
      id: 'ahp-basic', name: 'AHP연구 플랫폼', nameEn: 'AHP Research Platform', url: 'https://ahp-basic.dreamitbiz.com',
      icon: 'fa-solid fa-scale-balanced', color: '#7C3AED', category: 'platform',
      description: 'AHP(Analytic Hierarchy Process) 의사결정 분석 도구를 제공합니다.',
      descriptionEn: 'Provides AHP (Analytic Hierarchy Process) decision analysis tools.',
      techStack: ['AHP 분석', '의사결정', '쌍대비교', '가중치 산출'], difficulty: 'intermediate',
      curriculum: ['AHP 이론', '계층구조 설계', '쌍대비교 행렬', '가중치 산출', '일관성 검증', 'AHP 연구 적용'],
      curriculumEn: ['AHP theory', 'Hierarchy design', 'Pairwise comparison matrix', 'Weight calculation', 'Consistency verification', 'AHP research application'],
      features: ['온라인 AHP 분석', '자동 가중치 계산', '결과 리포트'],
      featuresEn: ['Online AHP analysis', 'Auto weight calculation', 'Result reports'],
      target: '의사결정 연구자, 경영학 연구자', targetEn: 'Decision-making researchers, business researchers',
    },
    {
      id: 'papers', name: '연구 커뮤니티', nameEn: 'Research Community', url: 'https://papers.dreamitbiz.com',
      icon: 'fa-solid fa-users-rectangle', color: '#0369A1', category: 'platform',
      description: '논문작성 학습과 연구 협업을 위한 커뮤니티 플랫폼입니다.',
      descriptionEn: 'A community platform for thesis writing learning and research collaboration.',
      techStack: ['논문 리뷰', '연구 협업', '학술 네트워킹', '피어리뷰'], difficulty: 'beginner',
      curriculum: ['논문작성 기초', '학술 글쓰기', '피어리뷰 방법', '연구 협업 전략', '학술 네트워킹', '논문 투고 가이드'],
      curriculumEn: ['Thesis writing basics', 'Academic writing', 'Peer review methods', 'Research collaboration strategies', 'Academic networking', 'Paper submission guide'],
      features: ['연구자 매칭', '논문 리뷰 시스템', '학술 커뮤니티'],
      featuresEn: ['Researcher matching', 'Paper review system', 'Academic community'],
      target: '대학원생, 신진 연구자', targetEn: 'Graduate students, early-career researchers',
    },
  ],
};

export default site;
