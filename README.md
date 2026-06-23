# 시대영재 서현관

서현고등학교 학생들이 직접 제작한 인강(인터넷 강의)과 학습 매거진을 공유하는 웹사이트입니다.
GitHub Pages를 통해 정적 호스팅됩니다.

## 코드 구조

```
SDYJ/
├── index.html              # 메인 페이지 (탭 기반 SPA)
├── css/
│   └── style.css           # 전체 스타일시트
├── js/
│   ├── app.js              # 탭 전환, 영상 모달, 매거진 렌더링 로직
│   ├── videos.js           # 영상 데이터 목록
│   └── magazines.js        # 매거진 데이터 목록
├── magazines/              # 마크다운 매거진 파일 폴더
│   └── welcome.md          # 샘플 매거진
├── videos/                 # 영상 파일 폴더
│   └── midterm.mp4         # 중간고사 해설 영상
└── images/
    └── background.jpg      # 서현고등학교 사진 (로고/히어로 배경)
```

### 각 파일 역할

| 파일 | 역할 |
|------|------|
| `index.html` | 홈, 영상, 매거진 3개 탭을 포함하는 단일 페이지 |
| `css/style.css` | 반응형 디자인, 카드 레이아웃, 모달, 네비게이션 등 모든 스타일 |
| `js/app.js` | 탭 전환, 영상 모달 열기/닫기, 마크다운 매거진 fetch 및 렌더링 |
| `js/videos.js` | `videosData` 배열 — 영상 메타데이터 관리 |
| `js/magazines.js` | `magazinesData` 배열 — 매거진 메타데이터 관리 |
| `magazines/*.md` | 마크다운 형식의 매거진 본문 |

## 매거진 작성법

### 1단계: 마크다운 파일 작성

`magazines/` 폴더에 `.md` 파일을 만듭니다.

```markdown
# 글 제목

본문 내용을 마크다운으로 작성합니다.

## 소제목

- 목록 항목
- **굵은 글씨**, *기울임*

> 인용문

| 표 제목1 | 표 제목2 |
|----------|----------|
| 내용1    | 내용2    |
```

파일 이름은 영문 소문자와 하이픈을 사용합니다. 예: `math-tips.md`, `english-grammar.md`

### 2단계: 매거진 목록에 등록

`js/magazines.js` 파일의 `magazinesData` 배열에 새 항목을 추가합니다.

```javascript
const magazinesData = [
    // 기존 항목들...
    {
        slug: "math-tips",           // 고유 식별자 (파일 이름과 동일하게)
        title: "수학 공부 꿀팁 모음",    // 글 제목
        author: "홍길동",              // 작성자 이름
        date: "2025-07-01",          // 작성일 (YYYY-MM-DD)
        summary: "수학 성적을 올리는 핵심 전략을 정리했습니다.",  // 목록에 표시될 요약
        file: "magazines/math-tips.md"  // 마크다운 파일 경로
    }
];
```

### 3단계: 커밋 & 푸시

```bash
git add magazines/math-tips.md js/magazines.js
git commit -m "매거진 추가: 수학 공부 꿀팁 모음"
git push
```

푸시하면 GitHub Pages에 자동 반영됩니다.

## 영상 추가법

### 1단계: 영상 파일 업로드

`videos/` 폴더에 영상 파일(`.mp4`)을 넣습니다.

### 2단계: 영상 목록에 등록

`js/videos.js` 파일의 `videosData` 배열에 새 항목을 추가합니다.

```javascript
const videosData = [
    // 기존 항목들...
    {
        id: 2,                              // 고유 번호 (기존 최대값 + 1)
        title: "기말고사 수학 해설",            // 영상 제목
        creator: "홍길동",                    // 제작자 이름
        description: "기말고사 수학 주요 문제를 풀이합니다.",  // 영상 설명
        src: "videos/final-math.mp4",       // 영상 파일 경로
        thumbnail: null,                    // 썸네일 이미지 경로 (없으면 null)
        timestamps: [                       // 영상 인덱스 (챕터)
            { time: "0:00", label: "인트로" },
            { time: "1:30", label: "1번 문제" },
            { time: "5:00", label: "2번 문제" },
            { time: "10:20", label: "3번 문제" }
        ]
    }
];
```

### 필드 설명

| 필드 | 필수 | 설명 |
|------|------|------|
| `id` | O | 고유 번호. 기존 영상과 겹치지 않게 설정 |
| `title` | O | 영상 제목 |
| `creator` | O | 영상 제작자 이름 |
| `description` | O | 영상에 대한 설명 |
| `src` | O | 영상 파일 경로 (`videos/파일명.mp4`) |
| `thumbnail` | X | 썸네일 이미지 경로. 없으면 `null` |
| `timestamps` | X | 영상 인덱스. `time`과 `label` 쌍의 배열 |

### 3단계: 커밋 & 푸시

```bash
git add videos/final-math.mp4 js/videos.js
git commit -m "영상 추가: 기말고사 수학 해설"
git push
```

## 기술 스택

- **HTML/CSS/JS**: 순수 정적 파일, 빌드 도구 없음
- **marked.js** (CDN): 마크다운을 HTML로 변환
- **GitHub Pages**: 정적 호스팅
