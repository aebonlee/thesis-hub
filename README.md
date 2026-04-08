# DreamIT Thesis Hub — 논문연구학습사이트 허브

논문연구 관련 5개 학습사이트를 하나의 허브에서 통합 소개하는 플랫폼입니다.

- **도메인**: https://thesis-hub.dreamitbiz.com
- **기술 스택**: React 19 + TypeScript + Vite 7 + Supabase + PortOne V1

## 학습사이트 구성

### 학습사이트 (Learning Sites)
| 사이트 | URL | 설명 |
|--------|-----|------|
| 연구방법론 | survey.dreamitbiz.com | 논문작성 전 과정 (연구계획서~논문투고) |
| 통계학 기초 | statistics.dreamitbiz.com | 기술통계~베이지안통계 |
| 조사방법론 | research.dreamitbiz.com | 연구설계~질적연구 |

### 연구 플랫폼 (Research Platforms)
| 사이트 | URL | 설명 |
|--------|-----|------|
| AHP연구 플랫폼 | ahp-basic.dreamitbiz.com | AHP 의사결정 분석 도구 |
| 연구 커뮤니티 | papers.dreamitbiz.com | 논문작성 학습 & 연구 협업 |

## 빠른 시작

```bash
# 1. 의존성 설치
npm install

# 2. 환경변수 설정
cp .env.example .env
# .env 파일에 Supabase, PortOne 등 키를 입력하세요

# 3. 개발 서버 시작 (port 5191)
npm run dev
```

## 사이트 커스터마이징

### 1. 사이트 설정 (`src/config/site.ts`)
사이트명, 메뉴, 학습사이트 목록, Family Site 등을 수정합니다.

### 2. 다국어 (`src/utils/translations.ts`)
`site` 키 아래에 사이트 전용 번역(한국어/영어)을 관리합니다.

### 3. 스타일
- `src/styles/site.css` — 사이트 전용 스타일
- CSS 변수: `src/styles/base.css`
- 다크모드: `src/styles/dark-mode.css`

## 상속되는 기능

| 기능 | 설명 |
|------|------|
| Supabase 인증 | Google, Kakao, Email 로그인/가입 |
| PortOne 결제 | 카드결제 (아임포트) |
| 테마 시스템 | 다크/라이트/자동 + 5색 컬러 테마 |
| 다국어 | 한국어/영어 전환 |
| 장바구니 | sessionStorage 기반 장바구니 |
| 토스트 알림 | 전역 알림 시스템 |

## 환경변수

| 변수 | 설명 |
|------|------|
| `VITE_SUPABASE_URL` | Supabase 프로젝트 URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase 공개 키 |
| `VITE_PORTONE_STORE_ID` | PortOne 스토어 ID |
| `VITE_PORTONE_CHANNEL_KEY` | PortOne 채널 키 |
| `VITE_SITE_URL` | 배포 도메인 URL |

## 빌드 & 배포

```bash
# 프로덕션 빌드
npm run build

# GitHub Pages 배포
npx gh-pages -d dist
```

## License / 라이선스

**저작권 (c) 2025-2026 드림아이티비즈(DreamIT Biz). 모든 권리 보유.**

본 소프트웨어는 저작권법 및 지적재산권법에 의해 보호되는 독점 소프트웨어입니다. 본 프로젝트는 소프트웨어 저작권 등록이 완료되어 법적 보호를 받습니다.

- 본 소프트웨어의 무단 복제, 수정, 배포 또는 사용은 엄격히 금지됩니다.
- 저작권자의 사전 서면 허가 없이 본 소프트웨어의 어떠한 부분도 복제하거나 전송할 수 없습니다.
- 본 소프트웨어는 DreamIT Biz(https://www.dreamitbiz.com) 교육 플랫폼의 일부로 제공됩니다.

라이선스 문의: aebon@dreamitbiz.com

---

**Copyright (c) 2025-2026 DreamIT Biz (Ph.D Aebon Lee). All Rights Reserved.**

This software is proprietary and protected under applicable copyright and intellectual property laws. This project has been registered for software copyright protection.

- Unauthorized copying, modification, distribution, or use of this software is strictly prohibited.
- No part of this software may be reproduced or transmitted in any form without prior written permission from the copyright holder.
- This software is provided as part of the DreamIT Biz (https://www.dreamitbiz.com) educational platform.

For licensing inquiries, contact: aebon@dreamitbiz.com

---

**Designed & Developed by Ph.D Aebon Lee**

DreamIT Biz | https://www.dreamitbiz.com
