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
