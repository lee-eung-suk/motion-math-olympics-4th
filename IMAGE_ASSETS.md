# 🎨 만들어야 할 이미지 에셋 + 제작 프롬프트

4학년판(`motion-math-olympics-4th`)에 넣을 그림 목록입니다. 위에서부터 급한 순서입니다.

| 순위 | 파일 | 크기 | 상태 | 왜 필요한가 |
|---|---|---|---|---|
| **1** | `assets/thumb1~6.png` | **572 × 362** | ❌ 없음 (404) | 랜딩 종목 카드 6장. 지금은 이모지로 대체 중 |
| **2** | `assets/help1.png` `help2.png` | **926 × 730** | ⚠️ 3학년판 그림 | "태블릿 세우고 팔 길이만큼"이라 4학년(서서 온몸)과 안 맞음 |
| **3** | `assets/og-image.png` | **1200 × 630** | ❌ 없음 | 카톡·밴드·문자로 주소 공유할 때 뜨는 미리보기 |
| **4** | `assets/favicon.png` | **512 × 512** | ❌ 없음 | 브라우저 탭·즐겨찾기 아이콘 |
| — | `assets/button1~3.png` | 1024 × 1024 | ✅ 그대로 OK | 아이콘만 있고 사람이 안 나와서 4학년에도 그대로 맞음 |

---

## ⚠️ 먼저 정할 것 — 썸네일에 글자를 넣을지

3학년판 썸네일은 그림 안에 **"단원 1 / 스피드 곱셈 대시"** 글자가 그려져 있고, 그래서 CSS가 카드의 글자 제목을 자동으로 숨깁니다(`.card.has-thumb .card-name{display:none}`).

문제는 **AI 이미지 생성기가 한글을 제대로 못 씁니다.** 열에 아홉은 깨진 글자가 나옵니다. 두 가지 길이 있습니다.

**A안 (추천) — 글자 없는 그림만 만들기**
그림에는 글자를 넣지 않고, 종목 이름은 앱이 글자로 표시하게 둡니다. CSS 한 줄만 바꾸면 되고, **말씀해 주시면 바로 고쳐 드립니다.** 아래 프롬프트는 전부 이 방식(글자 없음) 기준입니다.

**B안 — 3학년판처럼 글자를 그림에 굽기**
AI로는 그림만 뽑고, 캔바(Canva)나 파워포인트에서 한글 제목을 얹어 저장합니다. 3학년판과 똑같은 모양이 되지만 손이 한 번 더 갑니다.
→ 제목 글자 규격: 상단 왼쪽에 `단원 N` 알약 뱃지 + 오른쪽에 종목 이름, 글꼴은 **주아체**(이 앱이 쓰는 글꼴)

---

## 🖌 공통 스타일 (모든 프롬프트 앞에 붙이세요)

기존 3학년판 썸네일과 결을 맞추기 위한 문장입니다. 그대로 복사해서 각 프롬프트 앞에 붙이면 됩니다.

```
Flat vector illustration in the style of a Korean elementary school textbook.
Cute chibi children with round rosy cheeks, simple black dot eyes, big happy smiles,
short simple hair, wearing white PE shirts and blue shorts.
Thick rounded dark-navy outlines, soft pastel candy colors, flat shading only —
no gradients, no photorealism, no 3D render, no drop shadows.
Clean plain background, generous white space, centered composition.
Rounded-rectangle border frame around the whole image.
Absolutely no text, no letters, no numbers written anywhere.
```

> **꼭 넣어야 할 문구**: `no text, no letters` — 이걸 빼면 생성기가 깨진 글자를 그려 넣습니다.
> **비율**: 썸네일은 `16:10` 또는 `--ar 16:10`, 크기는 나중에 572×362로 줄이면 됩니다.

---

## 🆕 카드형 스타일 (제목 배너 + 흰 배경 + 설명글 없음)

다른 학년판 카드를 참고해서 만드는 새 버전입니다. 아래 기준으로 6장을 새로 만듭니다.

- **제목은 그림 안에 굽습니다** (`단원 N` 배지 + 종목 이름) — 그래야 카드가 그림 하나로 완결됩니다
- **설명 문장은 넣지 않습니다** — 참고 이미지에 있던 "~을 익혀요" 같은 밑줄 문장은 뺍니다
- **배경은 흰색**에 가깝게, 장식은 최소화합니다
- 숫자·수식(예: `3/4`, `0.4+0.3`, `1m 25cm`)은 **한글보다 훨씬 잘 나오니** 적극적으로 활용합니다. 문제는 **한글 제목**인데, 대부분의 생성기가 아직 약합니다 — 결과물에서 글자가 깨지면 그 부분만 캔바/파워포인트로 다시 얹으세요. (참고 이미지 수준의 정확한 한글은 Gemini/Imagen, Ideogram 계열이 상대적으로 낫습니다.)

### 공통 스타일 (아래 6개 프롬프트 앞에 공통으로 붙이세요)

```
Flat vector illustration in the style of a Korean elementary school textbook,
icon-card style. Clean pure white background, no scenery, no gradient sky.
A single cute chibi child with round rosy cheeks, simple black dot eyes,
big happy smile, wearing a white PE shirt and blue shorts, mid-action.
Small clean numeric labels and math symbols may appear on props (fine, these
render correctly), but no Korean sentences or paragraphs anywhere in the scene.
Thick rounded dark-navy outlines, soft flat pastel colors, no photorealism,
no 3D render, no drop shadows. Rounded-rectangle border frame around the image.
At the top, leave a clear horizontal band for a title banner to be added.
```

> **비율**: `16:10`, 572×362로 축소해서 사용

### thumb1.png — 분수 패스 골든골 (빨강 `#ff6b6b`)
```
[공통 스타일]
Subject: A soccer goal net at the top. A chibi kid mid-kick sends a soccer ball
flying, with two small fraction tiles floating beside the ball showing simple
fraction shapes (a circle split into colored slices, no digits needed — or
clean digits like "1/4" and "3/4" if text renders well). Warm coral-red accents.
```

### thumb2.png — 삼각형 균형 버티기 (파랑 `#4dabf7`)
```
[공통 스타일]
Subject: A chibi kid standing on a low wooden balance beam, both arms stretched
out wide and straight forming a clear angle, one leg lifted, big focused smile.
A single pastel triangle shape with a small angle-arc mark floats beside the kid.
Sky-blue accents.
```

### thumb3.png — 소수 돌파 드리블 (초록 `#51cf66`)
```
[공통 스타일]
Subject: A chibi kid dribbling an orange basketball toward a small hoop.
The hoop rim has a clean decimal number on a little sign (e.g. "0.7"),
motion lines behind the kid showing a fast dash. Fresh green accents.
```

### thumb4.png — 사각형 대형 만들기 (보라 `#da77f2`)
```
[공통 스타일]
Subject: A grassy field seen from above-front. Three small chibi kids stand
spread apart connected by a soft dashed outline of a quadrilateral, with one
glowing footprint mark at the missing fourth corner. A fourth chibi kid dashes
toward the glowing spot, motion lines behind their legs, big excited smile.
Soft purple accents.
```

### thumb5.png — 꺾은선 스코어보드 (주황 `#ffa94d`)
```
[공통 스타일]
Subject: A simple cartoon scoreboard panel showing a zigzag line graph with
round dots at each turning point, small clean axis numbers (1–5). A chibi kid
stands beside it pointing up at the highest dot with a bright smile, a soccer
ball flying in a dotted arc toward a small goal in the corner. Warm orange accents.
```

### thumb6.png — 다각형 매트 체조 (청록 `#3bc9db`)
```
[공통 스타일]
Subject: A purple gymnastics mat. A cute pastel hexagon and octagon shape with
tiny dot "vertex" marks roll along the mat like tumbling characters (simple dot
eyes only, no face needed), a chibi kid mid-cartwheel beside them, motion arcs.
Turquoise accents.
```

---

## 1️⃣ 종목 카드 썸네일 6장 — 예전 방식 (글자 없는 그림만, 참고용)

### thumb1.png — 분수 패스 골든골 🥅 (테두리색 `#ff6b6b` 빨강)

```
[공통 스타일]

Subject: A green soccer field seen from above-front. Three cute chibi kids in white
PE shirts stand apart from each other, each holding a round colored ball with a
blank white circle on it. One kid is passing the ball to another with a dotted
curved arrow showing the pass path. A small soccer goal net stands at the top.
One kid in a red bib stands in the middle with arms spread wide, blocking.
Warm coral-red accent color. Cheerful, energetic.
```

### thumb2.png — 삼각형 균형 버티기 🤸 (테두리색 `#4dabf7` 파랑)

```
[공통 스타일]

Subject: A cute chibi kid standing on a wooden gymnastics balance beam,
both arms stretched out wide and straight to the sides forming a clear wide angle,
one leg lifted, balancing with a determined happy face.
Three pastel triangles of different shapes float in the air around the kid.
A small cartoon bear judge sits at the end of the beam watching.
Sky-blue accent color. Calm, focused, gymnastic mood.
```

### thumb3.png — 소수 돌파 드리블 ⛹️ (테두리색 `#51cf66` 초록)

```
[공통 스타일]

Subject: A cute chibi kid dribbling an orange basketball, dashing forward through
a gap in a wall made of chunky rounded blocks. Two blocks on either side have
grumpy cartoon faces. The kid leans into the gap with a big confident smile,
motion lines behind. Fresh green accent color. Fast, breakthrough feeling.
```

### thumb4.png — 사각형 대형 만들기 🤾 (테두리색 `#da77f2` 보라)

> ⚠️ 이 종목은 개발 중 "사각형 뒤집기 패스"(조각 회전)에서 **"사각형 대형 만들기"**(자리 찾아 뛰어가기)로 완전히 새로 설계됐습니다. 아래는 새 디자인에 맞춘 프롬프트입니다. 예전 프롬프트로 만든 그림이 있다면 아래 것으로 다시 만들어 주세요.

```
[공통 스타일]

Subject: A grassy sports field seen from above-front. Three cute chibi kids in
white PE shirts stand spread apart, each at one corner of an invisible shape,
connected to each other by a soft dashed line. A fourth corner spot on the ground
glows with a bright footprint mark, and a dashed line continues from the two
nearest kids toward that glowing spot, hinting at a quadrilateral outline
(a parallelogram) still missing its last corner.
A fourth cute chibi kid is caught mid-run, dashing toward the glowing footprint
with a big excited smile and motion lines behind their legs.
Soft purple accent color. Energetic, "everyone find your spot" team feeling.
```

### thumb5.png — 꺾은선 스코어보드 📈 (테두리색 `#ffa94d` 주황)

```
[공통 스타일]

Subject: A big cartoon stadium scoreboard panel showing a simple zigzag line graph
with round dots at each turning point — the line goes up, down, then sharply up.
A cute chibi kid stands in front pointing up at the highest dot with a bright smile.
A soccer ball flies along a dotted arc toward a small goal net at the corner.
Warm orange accent color. Bright, sporty, "reading the game" mood.
```

### thumb6.png — 다각형 매트 체조 🤸‍♀️ (테두리색 `#3bc9db` 청록)

```
[공통 스타일]

Subject: A purple gymnastics mat laid across the bottom. Several pastel polygons
(a pentagon, a hexagon, an octagon) with cute dot eyes and rosy cheeks are rolling
along the mat like tumbling gymnasts, with small motion arcs behind them.
A cute chibi kid reaches out to catch one of them, and a large hoop ring
floats at the upper right. Turquoise accent color. Playful, tumbling mood.
```

---

## 2️⃣ 도움말 인포그래픽 2장 (926 × 730) — 세로형, 2칸 구성

3학년판은 "**태블릿을 세우고 팔 길이만큼 떨어져서**"라고 안내하는데, 4학년판은 **온몸을 쓰므로 2~3걸음 물러나 서야** 합니다. 그림이 실제와 어긋나 있어 교체가 필요합니다.

이 두 장은 **한글 설명이 필수**라, 그림만 AI로 뽑고 글자는 캔바/파워포인트에서 얹는 방식을 권합니다.

### help1.png — 시작하는 법 (1번·2번 칸)

```
[공통 스타일]

Layout: Two rounded-rectangle panels side by side, portrait overall (roughly 5:4).
Left panel has a light blue border, right panel has a light green border.
Each panel has a large empty space at the top for a title to be added later.

Left panel content: A cute chibi kid standing upright, facing forward, whole body
visible from head to feet, both arms raised high above the head in a cheer pose.
A tablet on a stand sits on a desk far in front of the kid, small in the distance,
with a dotted double-headed arrow between the kid and the tablet showing distance,
and two or three footprint marks on the floor showing steps backward.

Right panel content: A tablet screen with a big round play button, and a cartoon
hand with the index finger tapping the screen, plus a small computer mouse beside it.
```

**얹을 글자**
- 왼쪽 제목: `모션 인식: 2~3걸음 물러나 서기!` / 아래 설명: `머리부터 무릎까지 다 보이게 서서 손을 번쩍 들면 시작해요.`
- 오른쪽 제목: `터치 방식: 화면을 콕!` / 아래 설명: `마우스나 손가락으로 화면을 누르면 바로 게임이 시작돼요.`

### help2.png — 즐기는 법 (3번·4번 칸)

```
[공통 스타일]

Layout: Two rounded-rectangle panels side by side, portrait overall (roughly 5:4).
Left panel has a light orange border, right panel has a light purple border.
Each panel has a large empty space at the top for a title to be added later.

Left panel content: A cute chibi kid in a wide-arm balance pose in front of a
tablet on a desk, with a round stopwatch and sparkles floating around,
and small confetti pieces in the air.

Right panel content: A tablet showing a photo frame and a film-clip icon,
with a download arrow pointing into a phone, and a gold medal with a ribbon
next to a small pile of gold coins.
```

**얹을 글자**
- 왼쪽 제목: `60초 동안 신나게!` / 설명: `온몸으로 움직이며 기록에 도전해요.`
- 오른쪽 제목: `사진·영상 저장하기` / 설명: `제일 잘한 순간이 사진과 3초 영상으로 저장돼요.`

---

## 3️⃣ 공유용 미리보기 이미지 (1200 × 630)

카톡·밴드로 주소를 보낼 때 뜨는 그림입니다. **가로로 길고, 가운데 60% 안에 중요한 게 다 들어가야** 합니다(양옆이 잘리는 앱이 있음).

```
[공통 스타일 — 단, "no text" 규칙은 빼세요]

Subject: A wide celebratory banner scene. Three cute chibi kids in white PE shirts
strike different poses across the frame: one with both arms stretched wide in a
balance pose, one dribbling a basketball, one jumping to throw.
Around them float six pastel shapes — a fraction pie, a triangle, a rhombus,
a zigzag line graph, a hexagon, and a gold coin.
Colorful triangular party bunting flags hang across the top.
Bright sky-blue to soft green background, confetti sparkles.
Leave the center area open for a title to be added.
Wide 1200x630 banner composition, everything important within the central 60%.
```

**얹을 글자**: `수학 체육올림픽` (크게) + `초등 4학년 2학기 · 동작 도전 & 영역형 경쟁 6종목` (작게) — 주아체

---

## 4️⃣ 파비콘 (512 × 512, 정사각형)

탭에 아주 작게 뜨므로 **요소는 딱 하나, 아주 굵게**.

```
Simple flat icon, square, centered. A single cute chibi kid silhouette in a
wide-arm gymnastic balance pose, drawn in white on a bright yellow-orange
rounded-square background. Very thick rounded dark-navy outline.
Extremely simple and bold so it stays readable at 32x32 pixels.
No text, no small details, no gradients.
```

---

## 📥 파일을 다 만든 뒤

1. `assets/` 폴더에 **정확히 위 파일명**으로 저장 (한글 파일명은 배포 후 404가 납니다 — 반드시 영문)
2. 크기를 표의 규격에 맞춰 줄이기 (썸네일은 572×362가 넘어도 동작은 하지만 용량만 커집니다)
3. PNG로 저장, 썸네일은 장당 **300KB 이하**를 권합니다
4. 저에게 말씀해 주시면 커밋·푸시·재배포까지 처리해 드립니다

`og-image.png`와 `favicon.png`를 위한 HTML 메타 태그는 **미리 넣어 두었습니다.** 파일만 넣으면 바로 동작합니다.
