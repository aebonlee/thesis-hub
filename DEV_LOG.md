# DEV_LOG - DreamIT Thesis Hub

## 2026-04-09 AHP 사용가이드 + 연구 커뮤니티 소개 페이지 추가

### 개요
연구 플랫폼 드롭다운 메뉴의 AHP연구 플랫폼, 연구 커뮤니티 항목을 기존 Courses 카드 링크(`/courses/ahp-basic`, `/courses/papers`)에서 전용 소개 페이지(`/ahp-guide`, `/papers-community`)로 변경.

### 신규 페이지

| 페이지 | 경로 | 설명 |
|--------|------|------|
| AHP 사용가이드 | `/ahp-guide` | AHP 개념, 4단계 사용 흐름, 주요 기능, 활용 사례, CTA(ahp-basic.dreamitbiz.com) |
| 연구 커뮤니티 | `/papers-community` | 커뮤니티 소개, 주요 기능 4가지, 참여 대상, CTA(papers.dreamitbiz.com) |

### 수정 파일

| 파일 | 변경 내용 |
|------|-----------|
| `src/pages/AhpGuide.tsx` | **신규 생성** — AHP 사용 가이드 소개 페이지 |
| `src/pages/PapersCommunity.tsx` | **신규 생성** — 연구 커뮤니티 소개 페이지 |
| `src/layouts/PublicLayout.tsx` | lazy import 2개 + Route 2개 추가 (`/ahp-guide`, `/papers-community`) |
| `src/config/site.ts` | 연구 플랫폼 드롭다운 경로 변경 (`/courses/ahp-basic` → `/ahp-guide`, `/courses/papers` → `/papers-community`) |
| `src/utils/translations.ts` | ko/en `site.ahpGuide.*`, `site.papersCommunity.*` 번역 키 추가 |
| `DEV_LOG.md` | 본 항목 추가 |

### 페이지 공통 구조
- 기존 CSS 클래스 재사용: `page-header`, `edu-mission-grid`, `edu-values-grid`, `edu-value-card`, `cta-section`
- SEOHead, useAOS, useLanguage 훅 사용
- 한/영 다국어 지원, 다크모드 호환

---

## 2026-04-09 초기 생성

### 프로젝트 개요
- **사이트 ID**: `thesis-hub`
- **사이트명**: DreamIT Thesis Hub (드림아이티 논문연구학습사이트)
- **도메인**: `thesis-hub.dreamitbiz.com`
- **DB Prefix**: `thh_`
- **Theme Color**: `#1E40AF` (deep academic blue)
- **Vite Port**: 5191
- **GitHub Repo**: `aebonlee/thesis-hub`

### 템플릿
- 기반: `exam-hub` (자격증학습사이트 허브) 전체 구조 복사
- 기술 스택: React 19 + Vite 7 + TypeScript + Supabase + PortOne V1

### 사이트 구성 (5개 학습사이트, 2개 카테고리)

#### 카테고리 1: 학습사이트 (learning) — 3개
| ID | 이름 | URL | 설명 |
|----|------|-----|------|
| survey | 연구방법론 | survey.dreamitbiz.com | 논문작성 전 과정 (연구계획서~논문투고) |
| statistics | 통계학 기초 | statistics.dreamitbiz.com | 기술통계~베이지안통계 |
| research | 조사방법론 | research.dreamitbiz.com | 연구설계~질적연구 |

#### 카테고리 2: 연구 플랫폼 (platform) — 2개
| ID | 이름 | URL | 설명 |
|----|------|-----|------|
| ahp-basic | AHP연구 플랫폼 | ahp-basic.dreamitbiz.com | AHP 의사결정 분석 도구 |
| papers | 연구 커뮤니티 | papers.dreamitbiz.com | 논문작성 학습 & 연구 협업 |

### 커스터마이징 파일 목록

#### 전체 새로 작성 (5개)
| 파일 | 변경 내용 |
|------|-----------|
| `src/config/site.ts` | id, name, dbPrefix, themeColor, categories(learning/platform), learningSites(5개), menuItems, familySites(6개) |
| `src/utils/translations.ts` | nav(survey/statistics/research/ahpBasic/papers), home(논문연구 Hero/Stats/CTA), courses(categoryTitle learning/platform), franchise/about/pricing 논문연구 맥락 |
| `src/pages/Home.tsx` | CATEGORY_DESC_KEYS(learning/platform), stats(5사이트/200수강생/2카테고리/95%만족도) |
| `index.html` | title, description, keywords(논문,연구방법론,통계학,조사방법론,AHP,학술연구), theme-color(#1E40AF), og/twitter 태그 |
| `package.json` | name(dreamitbiz-thesis-hub), description, homepage |

#### 소규모 수정 (5개)
| 파일 | 변경 내용 |
|------|-----------|
| `vite.config.ts` | port: 5191 |
| `public/CNAME` | thesis-hub.dreamitbiz.com |
| `public/robots.txt` | Sitemap URL → thesis-hub |
| `public/sitemap.xml` | 전체 URL → thesis-hub, 카테고리 경로(learning/platform) |
| `.env` | VITE_SITE_URL=https://thesis-hub.dreamitbiz.com |

#### 그대로 복사 (~70개)
- `src/types/index.ts`, `src/App.tsx`, `src/main.tsx`, `src/index.css`
- `src/contexts/` (Auth, Theme, Language, Cart, Toast)
- `src/hooks/` (useAOS, useCountUp)
- `src/utils/` (supabase, auth, portone, storage, searchStorage, commentStorage, adminApi, couponApi, productStorage)
- `src/components/` (Navbar, Footer, SEOHead, SearchModal, AuthGuard, AdminGuard, CommentSection, ImageUpload, Pagination)
- `src/layouts/` (PublicLayout, AdminLayout)
- `src/pages/` (About, Cart, Checkout, Courses, Franchise, Login, Register, ForgotPassword, MyPage, Notice, QnA, OrderConfirmation, OrderHistory, Pricing, Shop, NotFound + admin 5개)
- `src/styles/` (14개 CSS: admin, animations, auth, base, community, dark-mode, footer, hero, navbar, responsive, search, shop, site, toast)
- `src/config/admin.ts`, `tsconfig.json`, `.gitignore`, `public/404.html`, `public/favicon.svg`, `public/og-image.png`

### Family Sites
| 이름 | URL |
|------|-----|
| DreamIT Edu Hub | edu-hub.dreamitbiz.com |
| DreamIT CS Hub | cs-hub.dreamitbiz.com |
| DreamIT Exam Hub | exam-hub.dreamitbiz.com |
| DreamIT Career Hub | career-hub.dreamitbiz.com |
| DreamIT Biz Hub | biz-hub.dreamitbiz.com |
| DreamIT Biz | www.dreamitbiz.com |

### 빌드 결과
- `npm run build` → **0 errors**, 12.41s
- TypeScript 컴파일 + Vite 빌드 모두 성공
- 130 modules transformed
- 총 출력: index.js 466KB (gzip 141KB)

### 검증 체크리스트
- [x] `npm run build` — 0 errors
- [x] 5개 사이트 카드 정상 표시 (config 기반)
- [x] /courses/learning, /courses/platform 카테고리 경로 설정
- [x] 다크모드/한영전환/테마변경 (공통 컴포넌트 유지)
- [x] 모바일 반응형 (공통 CSS 유지)
- [ ] thesis-hub.dreamitbiz.com 접속 확인 (배포 후)
