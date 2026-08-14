// 수학 체육올림픽 4학년판 - 마리오파티풍 연출 모듈
//
// cute.js가 "무엇을 그리는가"(스티커 도형·장갑 커서·반짝임)를 맡는다면,
// 이 파일은 "어떻게 진행하는가"를 맡는다 — 규칙 카드 → START! → 판정 등급 → 결과 발표 → 코인 정산.
// 6종목이 똑같은 리듬으로 흘러가야 아이들이 종목을 옮겨 다녀도 헤매지 않는다.

import { CUTE, FONT, drawSticker, drawStickerRect, drawChunkyText, drawSparkle, bob } from "./cute.js";

// 글꼴 정의는 cute.js 한 곳에만 두고 여기서는 다시 내보내기만 한다 — 두 군데서 관리하면 반드시 어긋난다
export { FONT };

// 글꼴이 내려오기 전에 캔버스를 그리면 시스템 고딕으로 한 번 그려졌다가 나중에 바뀌어 깜빡인다.
// 게임을 시작하기 전에 한 번 기다려 준다.
export async function ensureFont() {
  if (!document.fonts) return;
  try {
    await Promise.all([
      document.fonts.load('900 32px "Jua"', "가나다1234"),
      document.fonts.load('400 32px "Jua"', "가나다1234"),
    ]);
    await document.fonts.ready;
  } catch (e) { /* 글꼴을 못 불러와도 시스템 글꼴로 그냥 진행한다 */ }
}

// -------------------- 코인 --------------------
// 6종목을 하나로 묶는 목표. 기기에만 저장되고 서버로 나가지 않는다.
const COIN_KEY = "smo4_coins";
export const Coins = {
  get() { return parseInt(localStorage.getItem(COIN_KEY) || "0", 10) || 0; },
  add(n) {
    const v = Math.max(0, this.get() + n);
    localStorage.setItem(COIN_KEY, String(v));
    return v;
  },
  // 메달과 최고 콤보로 이번 판의 코인을 계산한다
  earn(medal, maxCombo) {
    const base = medal === "🥇" ? 20 : medal === "🥈" ? 10 : 5;
    return base + Math.max(0, maxCombo - 2) * 2;
  },
};

// -------------------- 판정 등급 --------------------
// 마리오파티 미니게임처럼 잘할수록 문구가 올라간다
export function gradeFor(combo) {
  if (combo >= 8) return { text: "PERFECT!", color: "#ff8fc7" };
  if (combo >= 5) return { text: "GREAT!", color: CUTE.sun };
  if (combo >= 3) return { text: "NICE!", color: CUTE.green };
  return { text: "GOOD!", color: CUTE.blue };
}

export function spawnGrade(arr, x, y, combo) {
  const g = gradeFor(combo);
  arr.push({ x, y, text: g.text, color: g.color, born: performance.now(), life: 900 });
  return g;
}
export function updateGrades(arr) {
  const now = performance.now();
  return arr.filter((g) => now - g.born < g.life);
}
export function drawGrades(ctx, arr, dims, fluidPx) {
  const now = performance.now();
  for (const g of arr) {
    const t = (now - g.born) / g.life;
    // 튀어올랐다가 살짝 가라앉고 사라진다
    const u = Math.min(1, t / 0.22);
    const scale = u < 1 ? 0.3 + 1.05 * (1 - (1 - u) * (1 - u)) : 1.35 - 0.35 * Math.min(1, (t - 0.22) / 0.2);
    ctx.save();
    ctx.globalAlpha = t > 0.72 ? 1 - (t - 0.72) / 0.28 : 1;
    ctx.translate(g.x, g.y - t * dims.h * 0.05);
    ctx.rotate(Math.sin(now / 120 + g.born) * 0.03);
    ctx.scale(scale, scale);
    drawChunkyText(ctx, g.text, 0, 0, fluidPx(dims, 30, { min: 20, max: 42 }), g.color, {
      outline: CUTE.ink, outlineWidth: fluidPx(dims, 8, { min: 5, max: 11 }), font: FONT,
    });
    ctx.restore();
  }
}

// -------------------- 표정 --------------------
// cute.js의 drawFace는 평소/웃음 두 가지뿐이라, 오답에 쓸 찡그린 얼굴과 놀란 얼굴을 더한다.
export function drawMood(ctx, x, y, r, mood = "idle") {
  const eyeDx = r * 0.34;
  ctx.save();
  ctx.strokeStyle = CUTE.ink;
  ctx.fillStyle = CUTE.ink;
  ctx.lineCap = "round";
  ctx.lineWidth = Math.max(2, r * 0.1);

  if (mood === "happy") {
    for (const s of [-1, 1]) {
      ctx.beginPath();
      ctx.arc(x + s * eyeDx, y - r * 0.02, r * 0.17, Math.PI * 1.15, Math.PI * 1.85);
      ctx.stroke();
    }
    ctx.beginPath();
    ctx.arc(x, y + r * 0.24, r * 0.19, 0.15 * Math.PI, 0.85 * Math.PI);
    ctx.stroke();
  } else if (mood === "sad") {
    // > < 찡그린 눈
    for (const s of [-1, 1]) {
      const cx = x + s * eyeDx;
      ctx.beginPath();
      ctx.moveTo(cx - r * 0.13 * s, y - r * 0.16);
      ctx.lineTo(cx + r * 0.11 * s, y - r * 0.02);
      ctx.lineTo(cx - r * 0.13 * s, y + r * 0.12);
      ctx.stroke();
    }
    ctx.beginPath();
    ctx.arc(x, y + r * 0.36, r * 0.18, 1.15 * Math.PI, 1.85 * Math.PI);
    ctx.stroke();
  } else if (mood === "wow") {
    for (const s of [-1, 1]) {
      ctx.beginPath(); ctx.arc(x + s * eyeDx, y - r * 0.06, r * 0.17, 0, Math.PI * 2); ctx.fill();
    }
    ctx.beginPath(); ctx.ellipse(x, y + r * 0.28, r * 0.13, r * 0.17, 0, 0, Math.PI * 2); ctx.fill();
  } else {
    const eyeR = r * 0.15;
    for (const s of [-1, 1]) {
      ctx.beginPath(); ctx.arc(x + s * eyeDx, y - r * 0.08, eyeR, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath();
      ctx.arc(x + s * eyeDx + eyeR * 0.32, y - r * 0.08 - eyeR * 0.34, eyeR * 0.36, 0, Math.PI * 2);
      ctx.fillStyle = "#fff"; ctx.fill();
      ctx.fillStyle = CUTE.ink;
    }
  }
  // 발그레한 볼
  ctx.fillStyle = "rgba(255,138,161,0.5)";
  for (const s of [-1, 1]) {
    ctx.beginPath();
    ctx.ellipse(x + s * r * 0.56, y + r * 0.2, r * 0.16, r * 0.1, 0, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

// -------------------- 응원 마스코트 --------------------
// 화면 구석에 상주하며 정답이면 만세, 오답이면 갸웃. 6종목 공통.
export class Mascot {
  constructor() { this.mood = "idle"; this.until = 0; }
  cheer(ms = 900) { this.mood = "cheer"; this.until = performance.now() + ms; }
  oops(ms = 800) { this.mood = "oops"; this.until = performance.now() + ms; }
  draw(ctx, dims, fluidPx, opts = {}) {
    const now = performance.now();
    if (now > this.until) this.mood = "idle";
    const r = fluidPx(dims, 30, { min: 22, max: 42 });
    const x = opts.x ?? r * 1.6;
    const y = opts.y ?? dims.h - r * 1.9;
    const cheering = this.mood === "cheer";
    const oops = this.mood === "oops";
    const hop = cheering ? Math.abs(Math.sin(now / 110)) * r * 0.42 : bob(1.2, r * 0.07);
    const tilt = oops ? Math.sin(now / 90) * 0.14 : 0;

    ctx.save();
    ctx.translate(x, y - hop);
    ctx.rotate(tilt);
    // 귀
    for (const s of [-1, 1]) {
      drawSticker(ctx, s * r * 0.62, -r * 0.72, r * 0.28, CUTE.sun, { lineWidth: Math.max(2.5, r * 0.11), drop: 0, gloss: false });
    }
    // 팔 (환호하면 위로 번쩍)
    for (const s of [-1, 1]) {
      const ax = s * r * 1.02, ay = cheering ? -r * 0.55 : r * 0.35;
      drawSticker(ctx, ax, ay, r * 0.24, CUTE.cream, { lineWidth: Math.max(2.5, r * 0.1), drop: 0 });
    }
    drawSticker(ctx, 0, 0, r, CUTE.sun, { lineWidth: Math.max(3, r * 0.13) });
    drawMood(ctx, 0, 0, r, cheering ? "happy" : oops ? "sad" : "idle");
    ctx.restore();

    if (cheering) {
      for (let i = 0; i < 3; i++) {
        const a = now / 220 + i * 2.1;
        drawSparkle(ctx, x + Math.cos(a) * r * 1.7, y - hop - r * 1.5 + Math.sin(a) * r * 0.4, r * 0.24, "#fff", a);
      }
    }
  }
}

// -------------------- 통일 HUD --------------------
// 6종목의 상단 패널 규격을 한곳으로 모은다. 종목마다 높이가 달라 눈이 재적응해야 했던 문제를 없앤다.
// 화면 네 귀퉁이의 REC 표시·홈 버튼과 겹치지 않도록 위쪽과 좌우를 비워 둔다
export function hudBand(dims) { return { y0: dims.h * 0.035, y1: dims.h * 0.20 }; }

export function drawHudPanel(ctx, dims, fluidPx, { left, right, headline, headlineColor }) {
  const { w } = dims;
  const band = hudBand(dims);
  const boxW = w * 0.86, boxH = band.y1 - band.y0;
  const cx = w / 2, cy = band.y0 + boxH / 2;
  drawStickerRect(ctx, cx, cy, boxW, boxH, fluidPx(dims, 20, { min: 13, max: 28 }), CUTE.cream, {
    lineWidth: fluidPx(dims, 5, { min: 3.5, max: 7 }), drop: fluidPx(dims, 6, { min: 4, max: 9 }),
  });
  const x0 = cx - boxW / 2;
  const padX = fluidPx(dims, 18, { min: 12, max: 26 });
  ctx.save();
  ctx.textBaseline = "middle";
  ctx.fillStyle = CUTE.orangeDark;
  ctx.font = `900 ${fluidPx(dims, 14, { min: 10, max: 18 })}px ${FONT}`;
  ctx.textAlign = "left";
  ctx.fillText(left, x0 + padX, band.y0 + boxH * 0.23);
  ctx.textAlign = "right";
  ctx.fillText(right, x0 + boxW - padX, band.y0 + boxH * 0.23);
  ctx.restore();

  // 문제 문구는 길이에 맞춰 자동으로 줄어든다 — 길다고 잘리면 안 된다
  const maxW = boxW - padX * 2.4;
  let size = fluidPx(dims, 26, { min: 16, max: 34 });
  ctx.save();
  ctx.font = `900 ${size}px ${FONT}`;
  const measured = ctx.measureText(headline).width;
  ctx.restore();
  if (measured > maxW) size *= maxW / measured;
  drawChunkyText(ctx, headline, cx, band.y0 + boxH * 0.66, size, headlineColor || CUTE.sun, {
    outline: CUTE.ink, outlineWidth: Math.max(3, size * 0.22), font: FONT,
  });
  return band;
}

// 남은 시간 — 10초를 남기면 커지고 붉게 뛴다
export function drawTimeUrgency(ctx, dims, fluidPx, remainMs) {
  if (remainMs > 10000) return;
  const s = Math.ceil(remainMs / 1000);
  const beat = 1 + Math.abs(Math.sin(performance.now() / 160)) * 0.16;
  ctx.save();
  ctx.translate(dims.w / 2, dims.h * 0.5);
  ctx.scale(beat, beat);
  ctx.globalAlpha = 0.55;
  drawChunkyText(ctx, String(s), 0, 0, fluidPx(dims, 96, { min: 60, max: 150 }), CUTE.red, {
    outline: "#ffffff", outlineWidth: fluidPx(dims, 12, { min: 8, max: 18 }), font: FONT,
  });
  ctx.restore();
}

// -------------------- 규칙 카드 / START! --------------------

// 카운트다운 앞에 끼우는 "이 미니게임은 이렇게 하는 거야" 카드
export function showRuleCard(el, { emoji, title, rule }, ms = 1800) {
  if (!el) return Promise.resolve();
  el.querySelector(".rule-emoji").textContent = emoji;
  el.querySelector(".rule-title").textContent = title;
  el.querySelector(".rule-text").textContent = rule;
  el.style.display = "flex";
  el.classList.remove("pop-in");
  void el.offsetWidth; // 애니메이션 재시작
  el.classList.add("pop-in");
  return new Promise((resolve) => setTimeout(() => { el.style.display = "none"; resolve(); }, ms));
}

// 3-2-1 뒤에 쿵 하고 찍히는 START! 스탬프
export function showStartStamp(el, ms = 620) {
  if (!el) return Promise.resolve();
  el.style.display = "flex";
  el.classList.remove("stamp-in");
  void el.offsetWidth;
  el.classList.add("stamp-in");
  return new Promise((resolve) => setTimeout(() => { el.style.display = "none"; resolve(); }, ms));
}

// -------------------- 결과 발표 --------------------
// 지금까지는 결과 패널이 통째로 툭 떴다. 마리오파티처럼 드럼롤 → 메달 → 기록 → 코인 순으로 하나씩 보여준다.
export function showResult({ panel, medalEl, titleEl, medal, title, stats, newRecord, coins, ribbonEl, coinEl, sound, muted }) {
  panel.style.display = "flex";
  panel.classList.add("staged");
  medalEl.textContent = medal;
  titleEl.textContent = title;
  if (ribbonEl) ribbonEl.style.display = "none";
  if (coinEl) coinEl.textContent = "";

  medalEl.classList.remove("stamp-in");
  void medalEl.offsetWidth;
  setTimeout(() => {
    medalEl.classList.add("stamp-in");
    if (!muted && sound) sound.success();
  }, 420);

  // 기록 숫자는 0부터 굴러 올라간다
  stats.forEach((s, i) => {
    if (!s.el) return;
    s.el.textContent = (s.prefix || "") + "0" + (s.suffix || "");
    setTimeout(() => countUp(s.el, s.value, s.prefix || "", s.suffix || "", 620), 780 + i * 180);
  });

  if (newRecord && ribbonEl) {
    setTimeout(() => {
      ribbonEl.style.display = "block";
      ribbonEl.classList.remove("stamp-in");
      void ribbonEl.offsetWidth;
      ribbonEl.classList.add("stamp-in");
      if (!muted && sound) sound.fever();
    }, 1350);
  }

  if (coinEl && coins > 0) {
    setTimeout(() => {
      coinEl.textContent = `🪙 +${coins}  (모은 코인 ${Coins.get()})`;
      coinEl.classList.remove("pop-in");
      void coinEl.offsetWidth;
      coinEl.classList.add("pop-in");
      if (!muted && sound) sound.comboUp();
    }, 1650);
  }
}

function countUp(el, to, prefix, suffix, dur) {
  const start = performance.now();
  function tick(now) {
    const t = Math.min(1, (now - start) / dur);
    const eased = 1 - (1 - t) * (1 - t);
    el.textContent = prefix + Math.round(to * eased) + suffix;
    if (t < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

// -------------------- 모션 모드 도우미 --------------------
// 온몸이 안 잡히면 아이는 왜 안 되는지 모른 채 계속 손만 흔든다. 이유를 화면에 알려준다.
export function poseHint(body, mode) {
  if (mode !== "motion") return null;
  const j = body.joints;
  if (!j || !j.shoulderMid) return "카메라 앞에 서 주세요 🙋";
  if (!j.lHip && !j.rHip) return "조금 뒤로 물러나요 👣";
  if (!j.lWrist && !j.rWrist) return "손이 보이게 팔을 들어요 🙌";
  return null;
}

export function drawPoseHint(ctx, dims, fluidPx, text) {
  if (!text) return;
  const { w, h } = dims;
  const y = h * 0.30;
  ctx.save();
  ctx.globalAlpha = 0.6 + Math.abs(Math.sin(performance.now() / 420)) * 0.4;
  drawChunkyText(ctx, text, w / 2, y, fluidPx(dims, 20, { min: 14, max: 26 }), "#ffffff", {
    outline: CUTE.ink, outlineWidth: fluidPx(dims, 6, { min: 4, max: 8 }), font: FONT,
  });
  ctx.restore();
}
