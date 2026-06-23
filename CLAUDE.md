# 프로젝트 컨텍스트 (AI 참고용)

## 프로젝트 개요

- **이름**: 시대영재 서현관 (SDYJ)
- **목적**: 서현고등학교 학생 팀이 인강과 학습 매거진을 작성하여 공유하는 웹사이트
- **호스팅**: GitHub Pages (정적 사이트)
- **저장소**: `GalaxySkyBlue/SDYJ`

## 핵심 설계 결정

### Ver.2 리디자인 (2025-06)

기존의 다중 HTML 페이지 구조(`index.html`, `magazine.html`, `midterm.html`)를
단일 페이지 탭 기반 SPA로 전면 개편했다.

- **탭 구조**: 홈 / 영상 / 매거진 / 공지사항 4개 탭. `data-tab` 속성으로 전환
- **영상 시스템**: `js/videos.js`의 `videosData` 배열에 영상 정보를 넣으면 그리드에 표시됨. 클릭 시 모달에서 영상 재생, 제목/제작자/설명/타임스탬프 인덱스 표시
- **매거진 시스템**: GitHub 블로그처럼 `magazines/` 폴더에 마크다운 파일을 넣고, `js/magazines.js`의 `magazinesData` 배열에 메타데이터를 등록하면 목록에 표시됨. 클릭 시 `fetch`로 `.md` 파일을 가져와 `marked.js`로 렌더링
- **공지사항 탭**: `README.md` 파일을 `fetch`로 불러와 마크다운 렌더링. 공지사항·업데이트 내역·사용 안내를 한 곳에서 확인 가능
- **LaTeX 수식**: KaTeX CDN으로 `$...$`(인라인), `$$...$$`(블록) 수식 렌더링. 매거진, 영상 설명, 공지사항 모두 지원
- **빌드 도구 없음**: 순수 HTML/CSS/JS. 외부 의존성은 CDN의 `marked.js`와 `KaTeX`
- **반응형**: 모바일(480px), 태블릿(768px), 데스크톱 브레이크포인트

### 디자인 변경 이력

1. **Ver.2.0**: 다중 HTML → 단일 페이지 SPA. 서현고 사진을 로고/히어로 배경으로 사용. 홈에 3개 카드 배치
2. **Ver.2.1**: 팀 프로젝트 카드 삭제, 히어로 이미지 제거(그라데이션 대체), 로고를 CSS 마름모(◆)로 변경
3. **Ver.2.2**: KaTeX CDN 추가. 매거진 본문/영상 설명에서 LaTeX 수식 렌더링 지원
4. **Ver.2.3**: 공지사항 탭 추가. README.md를 fetch하여 표시. README.md에 업데이트 내역 정리

### 삭제된 파일

Ver.2에서 다음 파일들은 `index.html` 내 탭으로 통합되어 삭제됨:
- `style.css` → `css/style.css`로 이동 및 전면 재작성
- `magazine.html` → 매거진 탭으로 통합
- `midterm.html` → 영상 탭으로 통합

## 파일 구조와 수정 가이드

```
index.html              # UI 구조. 탭/모달/네비게이션 변경 시 수정
css/style.css           # 모든 스타일. CSS 변수는 :root에 정의. 마름모 로고는 .logo-diamond 클래스
js/app.js               # 핵심 로직. 탭 전환, 모달, fetch+렌더링, renderLatex(), loadNotice()
js/videos.js            # 영상 데이터만 관리. videosData 배열
js/magazines.js         # 매거진 데이터만 관리. magazinesData 배열
magazines/*.md          # 매거진 본문 (마크다운 + LaTeX 수식 사용 가능)
videos/*.mp4            # 영상 파일
images/background.jpg   # 서현고 사진 (현재 UI에서 미사용, 파일은 보존)
README.md               # 프로젝트 안내 + 업데이트 내역. 공지사항 탭에서 렌더링됨
```

## 콘텐츠 추가 시 수정해야 할 파일

- **매거진 추가**: `magazines/새파일.md` 생성 + `js/magazines.js`에 항목 추가
- **영상 추가**: `videos/`에 파일 추가 + `js/videos.js`에 항목 추가
- **공지사항 수정**: `README.md` 직접 편집 (별도 등록 불필요)
- **UI 수정**: `index.html` + `css/style.css`
- **기능 수정**: `js/app.js`

## 외부 의존성 (CDN)

- **marked.js**: 마크다운 → HTML 변환
- **KaTeX**: LaTeX 수식 렌더링 (CSS + JS). `renderLatex()` 함수가 `$...$`와 `$$...$$` 패턴을 찾아 KaTeX로 변환

## 주의사항

- GitHub Pages는 정적 파일만 서빙하므로 서버 사이드 로직 사용 불가
- `images/background.jpg`(서현고 사진)는 삭제하지 말 것 (현재 UI에서 직접 사용하지 않지만 보존 대상)
- `marked.js`와 `KaTeX`는 CDN에서 로드하므로 오프라인 환경에서는 매거진 렌더링/수식 표시 불가
- 영상 파일은 GitHub 용량 제한(100MB)에 주의
- `magazinesData`와 `videosData`는 각각 별도 JS 파일에 전역 변수로 선언됨
- 마름모 로고는 이미지가 아니라 순수 CSS(`background` + `transform: rotate(45deg)`)로 구현됨
- `README.md`는 공지사항 탭의 콘텐츠 소스이므로, 내용 수정 시 웹사이트 공지사항에도 즉시 반영됨
