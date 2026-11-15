# 한일씨앤에스 전자카탈로그

㈜한일씨앤에스 전자카탈로그의 원본 파일입니다. 서버 프로그램 없이 HTML, CSS, JavaScript 파일만으로 동작하는 사이트입니다.

## 폴더 구성

| 폴더 | 내용 |
|---|---|
| `index.html` | 첫 화면 |
| `company/` | 인사말, 연혁, 인증서, 설비 |
| `products/` | 토양개량제, 유기농업자재, 미량요소복합비료(생생비타) |
| `technical/` | 작물 솔루션, 사용 가이드, 수도작·밭작물·과수시설 처방 |
| `export/` | 글로벌 수출 제품 |
| `contactus/` | 상담문의 |
| `assets/js/` | 언어 전환(`catalog-lang.js`), 상세 창과 계산기(`catalog-modals.js`, `catalog-modals-i18n.js`) |
| `assets/msds/` | 제품별 MSDS(물질안전보건자료) PDF |
| `assets/img/`, `assets/video/` | 이미지와 인트로 영상 |

## 문구 수정 위치

- 화면 문구(한국어·영어): `assets/js/catalog-lang.js`
- 제품 상세 창과 계산기 문구: `assets/js/catalog-modals-i18n.js`
- 한국어 화면은 일부 문구가 HTML 파일에 직접 들어 있으므로, 한국어 문구를 고칠 때는 해당 HTML 파일도 함께 확인합니다.

## 미리보기

폴더에서 아래 명령을 실행한 뒤 브라우저에서 `http://localhost:8000`을 엽니다.

```bash
python3 -m http.server 8000
```

## 공개 배포 (Cloudflare Pages, 무료)

- 이 저장소는 비공개로 유지하고, 공개 사이트는 Cloudflare Pages가 이 저장소를 읽어 배포합니다.
- `main` 분기에 저장하면 1~2분 안에 공개 사이트가 자동으로 갱신됩니다.
- 다른 분기에 저장하면 공개 사이트는 그대로 두고 확인용 미리보기 주소만 따로 만들어집니다.
- 기본 주소: `https://hanil-catalog.pages.dev` (회사 도메인 연결 시 예: `https://catalog.hanilcns.com`)

### Cloudflare Pages 설정값

| 항목 | 값 |
|---|---|
| Production branch | `main` |
| Framework preset | `None` |
| Build command | 비워 둠 |
| Build output directory | `/` |

### 응답 헤더

`_headers` 파일은 Cloudflare가 배포할 때 읽는 설정 파일입니다(공개되지 않음). 보안 헤더와 이미지·영상·글꼴의 브라우저 저장 기간(30일)을 정합니다. JS, CSS, HTML은 저장 기간을 두지 않아 수정 사항이 배포 직후 바로 보입니다.

## Q&A 재배상담 (contactus/qna.html)

농가가 질문을 남기고 담당자가 '재배 처방 카드' 형식으로 답하는 게시판입니다. 사이트 파일은 그대로 정적 파일로 배포되고, `/api/` 주소만 `worker/index.js`가 처리합니다.

| 파일 | 내용 |
|---|---|
| `contactus/qna.html`, `assets/js/catalog-qna.js` | 농가가 보는 화면(목록, 작물 필터, 접수, 사진 3장) |
| `admin/index.html`, `assets/js/qna-admin.js` | 담당자 화면(답변 작성, 광고 표현 점검, 숨기기, 삭제, 전화번호 지우기) |
| `assets/css/qna.css` | 두 화면의 디자인 |
| `worker/index.js` | 저장·조회 API |
| `wrangler.jsonc`, `.assetsignore` | Cloudflare 배포 설정(서버 코드와 설정 파일은 공개되지 않음) |

- 저장소: Cloudflare D1 데이터베이스 `hanil-qna`. 처음 배포할 때 자동으로 만들어지고, 표는 첫 요청 때 자동으로 생성됩니다.
- 담당자 비밀번호: Cloudflare → Workers & Pages → `hanil-catalog` → Settings → Variables and Secrets → Add → Type `Secret`, 이름 `ADMIN_PASSWORD`. 비밀번호는 저장소에 넣지 않습니다.
- 담당자 화면 주소: `/admin/`
- 게시판은 한국어로만 운영합니다. 영어·중국어 화면에서는 안내 문구만 바뀝니다.
- 비료관리법상 쓸 수 없는 표현(방제·예방·치료·살균·살충·특효·완치·100%)이 답변에 있으면 서버에서 게시를 막습니다.
- 사진은 담당자만 보고, 담당자가 '사진 공개'를 고른 공개 상담의 답변에서만 보입니다.
- 로컬 시험: `npx wrangler dev --var ADMIN_PASSWORD:시험용비밀번호`
