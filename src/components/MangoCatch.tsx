"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

type Kind = "mango" | "gold" | "rotten";
type Item = {
  x: number;
  y: number;
  r: number;
  vy: number;
  angle: number;
  spin: number;
  kind: Kind;
};
type Popup = { x: number; y: number; text: string; color: string; life: number };
type Status = "ready" | "playing" | "over";

const LIVES = 3;
const BEST_KEY = "mango-catch-best";
const BASKET_H = 34;
const BASKET_SPEED = 620; // 鍵盤操作時每秒移動的 px

const KINDS: Record<Kind, { color: string; deep: string; points: number }> = {
  mango: { color: "#f6a640", deep: "#c4471f", points: 1 },
  gold: { color: "#ffe680", deep: "#d99a00", points: 5 },
  rotten: { color: "#8c7b4b", deep: "#3a3120", points: 0 },
};

const loadBest = () => {
  try {
    return Number(localStorage.getItem(BEST_KEY)) || 0;
  } catch {
    return 0;
  }
};

const saveBest = (score: number) => {
  try {
    localStorage.setItem(BEST_KEY, String(score));
  } catch {
    // 存不了就只記這次
  }
};

const noopSubscribe = () => () => {};

const pickKind = (elapsed: number): Kind => {
  const roll = Math.random();
  if (roll < 0.06) return "gold";
  if (roll < 0.06 + Math.min(0.28, 0.08 + elapsed * 0.004)) return "rotten";
  return "mango";
};

function drawMango(ctx: CanvasRenderingContext2D, item: Item) {
  const { color, deep } = KINDS[item.kind];
  const { r } = item;
  ctx.save();
  ctx.translate(item.x, item.y);
  ctx.rotate(item.angle);

  if (item.kind === "gold") {
    ctx.shadowColor = "rgb(255 210 80 / 0.9)";
    ctx.shadowBlur = 18;
  }

  // 果身：微微不對稱的橢圓，像芒果的腰身
  const body = ctx.createRadialGradient(-r * 0.35, -r * 0.4, r * 0.1, 0, 0, r * 1.2);
  body.addColorStop(0, color);
  body.addColorStop(1, deep);
  ctx.fillStyle = body;
  ctx.beginPath();
  ctx.ellipse(0, 0, r * 0.82, r, 0.25, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0;

  if (item.kind === "rotten") {
    ctx.fillStyle = "rgb(30 22 10 / 0.55)";
    for (const [dx, dy, s] of [
      [-0.3, 0.1, 0.22],
      [0.25, -0.25, 0.16],
      [0.1, 0.45, 0.13],
    ]) {
      ctx.beginPath();
      ctx.arc(dx * r, dy * r, s * r, 0, Math.PI * 2);
      ctx.fill();
    }
  } else {
    // 反光
    ctx.fillStyle = "rgb(255 255 255 / 0.75)";
    ctx.beginPath();
    ctx.ellipse(-r * 0.32, -r * 0.42, r * 0.16, r * 0.1, -0.6, 0, Math.PI * 2);
    ctx.fill();
  }

  // 葉子
  ctx.fillStyle = item.kind === "rotten" ? "#5a5a32" : "#3f7a4c";
  ctx.beginPath();
  ctx.ellipse(r * 0.3, -r * 1.02, r * 0.38, r * 0.14, -0.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawBasket(ctx: CanvasRenderingContext2D, x: number, top: number, w: number) {
  const h = BASKET_H;
  const inset = w * 0.12;
  ctx.save();
  ctx.translate(x - w / 2, top);

  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(w, 0);
  ctx.lineTo(w - inset, h);
  ctx.lineTo(inset, h);
  ctx.closePath();
  const wood = ctx.createLinearGradient(0, 0, 0, h);
  wood.addColorStop(0, "#b67a3c");
  wood.addColorStop(1, "#7c4b20");
  ctx.fillStyle = wood;
  ctx.fill();

  // 編織紋
  ctx.save();
  ctx.clip();
  ctx.strokeStyle = "rgb(60 32 10 / 0.35)";
  ctx.lineWidth = 2;
  for (let i = 1; i < 3; i++) {
    ctx.beginPath();
    ctx.moveTo(0, (h / 3) * i);
    ctx.lineTo(w, (h / 3) * i);
    ctx.stroke();
  }
  for (let vx = 10; vx < w; vx += 14) {
    ctx.beginPath();
    ctx.moveTo(vx, 0);
    ctx.lineTo(vx - 4, h);
    ctx.stroke();
  }
  ctx.restore();

  // 籃口
  ctx.fillStyle = "#d39a55";
  ctx.beginPath();
  ctx.roundRect(-4, -5, w + 8, 9, 5);
  ctx.fill();
  ctx.restore();
}

/** 接芒果小遊戲：用滑鼠、手指或方向鍵移動果籃。 */
export default function MangoCatch() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const status = useRef<Status>("ready");
  const world = useRef({
    items: [] as Item[],
    popups: [] as Popup[],
    width: 0,
    height: 0,
    basketX: 0,
    pointerX: null as number | null,
    keys: { left: false, right: false },
    spawnIn: 0,
    elapsed: 0,
    score: 0,
    lives: LIVES,
  });

  const [view, setView] = useState<Status>("ready");
  const [hud, setHud] = useState({ score: 0, lives: LIVES });
  // 首次渲染先讀已存的最高分（伺服器端為 0），之後由遊戲結果更新
  const storedBest = useSyncExternalStore(noopSubscribe, loadBest, () => 0);
  const [playedBest, setBest] = useState<number | null>(null);
  const best = playedBest ?? storedBest;
  const [newRecord, setNewRecord] = useState(false);
  const bestRef = useRef<number | null>(null);

  const start = () => {
    const w = world.current;
    w.items = [];
    w.popups = [];
    w.spawnIn = 0.4;
    w.elapsed = 0;
    w.score = 0;
    w.lives = LIVES;
    w.basketX = w.width / 2;
    w.pointerX = null;
    bestRef.current ??= loadBest();
    status.current = "playing";
    setHud({ score: 0, lives: LIVES });
    setView("playing");
    canvasRef.current?.focus();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const w = world.current;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      w.width = rect.width;
      w.height = rect.height;
      if (!w.basketX || w.basketX > w.width) w.basketX = w.width / 2;
    };
    // canvas 讀不到 CSS 變數，先取出實際字型
    const fontFamily = getComputedStyle(canvas).fontFamily;
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const end = () => {
      status.current = "over";
      setView("over");
      const prevBest = bestRef.current ?? 0;
      setNewRecord(w.score > prevBest);
      if (w.score > prevBest) {
        bestRef.current = w.score;
        saveBest(w.score);
        setBest(w.score);
      }
    };

    const step = (dt: number) => {
      const basketW = Math.min(130, Math.max(76, w.width * 0.2));
      const basketTop = w.height - BASKET_H - 22;
      w.elapsed += dt;

      // 移動果籃：滑鼠／手指直接跟隨，鍵盤則等速移動
      if (w.keys.left !== w.keys.right) {
        w.pointerX = null;
        w.basketX += (w.keys.right ? 1 : -1) * BASKET_SPEED * dt;
      } else if (w.pointerX != null) {
        w.basketX += (w.pointerX - w.basketX) * Math.min(1, dt * 18);
      }
      const edge = basketW / 2 + 4; // 籃口比籃身寬 4px
      w.basketX = Math.max(edge, Math.min(w.width - edge, w.basketX));

      // 生成：越玩越快、越密
      w.spawnIn -= dt;
      if (w.spawnIn <= 0) {
        w.spawnIn = Math.max(0.32, 1.05 - w.elapsed * 0.018) * (0.7 + Math.random() * 0.6);
        const r = Math.min(26, Math.max(17, w.width * 0.035));
        w.items.push({
          x: r + Math.random() * (w.width - r * 2),
          y: -r * 1.2,
          r,
          vy: 150 + w.elapsed * 7 + Math.random() * 60,
          angle: Math.random() * Math.PI,
          spin: (Math.random() - 0.5) * 3,
          kind: pickKind(w.elapsed),
        });
      }

      const prev = { score: w.score, lives: w.lives };
      w.items = w.items.filter((item) => {
        item.y += item.vy * dt;
        item.angle += item.spin * dt;

        const caught =
          item.y + item.r >= basketTop &&
          item.y - item.r <= basketTop + BASKET_H * 0.6 &&
          Math.abs(item.x - w.basketX) <= basketW / 2;
        if (caught) {
          if (item.kind === "rotten") {
            w.lives -= 1;
            w.popups.push({ x: item.x, y: basketTop, text: "爛掉了！", color: "#8e1f27", life: 1 });
          } else {
            const { points } = KINDS[item.kind];
            w.score += points;
            w.popups.push({
              x: item.x,
              y: basketTop,
              text: `+${points}`,
              color: item.kind === "gold" ? "#c98a00" : "#e3832a",
              life: 1,
            });
          }
          return false;
        }

        if (item.y - item.r > w.height) {
          if (item.kind !== "rotten") w.lives -= 1;
          return false;
        }
        return true;
      });

      w.popups = w.popups.filter((p) => {
        p.life -= dt * 1.4;
        p.y -= dt * 50;
        return p.life > 0;
      });

      if (w.score !== prev.score || w.lives !== prev.lives) {
        setHud({ score: w.score, lives: Math.max(0, w.lives) });
      }
      if (w.lives <= 0) end();
    };

    const draw = () => {
      const basketW = Math.min(130, Math.max(76, w.width * 0.2));
      const basketTop = w.height - BASKET_H - 22;
      ctx.clearRect(0, 0, w.width, w.height);

      // 地面
      ctx.fillStyle = "rgb(47 91 62 / 0.12)";
      ctx.fillRect(0, w.height - 18, w.width, 18);

      w.items.forEach((item) => drawMango(ctx, item));
      drawBasket(ctx, w.basketX, basketTop, basketW);

      ctx.textAlign = "center";
      ctx.font = `600 18px ${fontFamily}`;
      w.popups.forEach((p) => {
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.fillStyle = p.color;
        ctx.fillText(p.text, p.x, p.y);
      });
      ctx.globalAlpha = 1;
    };

    let frame = 0;
    let last = performance.now();
    const loop = (now: number) => {
      // 切到背景分頁回來時，避免一次跳太多
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (status.current === "playing") step(dt);
      draw();
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);

    const toLocalX = (e: PointerEvent) => e.clientX - canvas.getBoundingClientRect().left;
    const onPointer = (e: PointerEvent) => {
      w.pointerX = toLocalX(e);
    };
    const setKey = (e: KeyboardEvent, down: boolean) => {
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") w.keys.left = down;
      else if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") w.keys.right = down;
      else return;
      if (status.current === "playing") e.preventDefault();
    };
    const onKeyDown = (e: KeyboardEvent) => setKey(e, true);
    const onKeyUp = (e: KeyboardEvent) => setKey(e, false);

    canvas.addEventListener("pointermove", onPointer);
    canvas.addEventListener("pointerdown", onPointer);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      canvas.removeEventListener("pointermove", onPointer);
      canvas.removeEventListener("pointerdown", onPointer);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, []);

  return (
    <div className="glass overflow-hidden rounded-[2rem]">
      <div className="flex items-center justify-between border-b border-white/50 px-5 py-3 text-sm tracking-widest sm:px-7">
        <span>
          分數 <strong className="text-xl font-semibold tabular-nums">{hud.score}</strong>
        </span>
        <span aria-label={`剩餘 ${hud.lives} 條命`}>
          {Array.from({ length: LIVES }, (_, i) => (
            <span key={i} className={i < hud.lives ? "" : "opacity-20 grayscale"}>
              🥭
            </span>
          ))}
        </span>
        <span className="text-ink-soft">
          最高 <span className="font-semibold tabular-nums text-ink">{best}</span>
        </span>
      </div>

      <div className="relative">
        <canvas
          ref={canvasRef}
          tabIndex={0}
          aria-label="接芒果遊戲畫面"
          className="block h-[min(70svh,560px)] w-full cursor-none touch-none outline-none"
        />

        {view !== "playing" && (
          <div className="absolute inset-0 flex items-center justify-center bg-paper/55 p-5 backdrop-blur-[2px]">
            <div className="max-w-xs text-center">
              {view === "ready" ? (
                <>
                  <p className="font-serif text-3xl font-bold tracking-widest">接芒果！</p>
                  <ul className="mt-5 space-y-2 text-sm leading-6 text-ink-soft">
                    <li>移動滑鼠、手指滑動，或用 ← → 鍵移動果籃</li>
                    <li>
                      🥭 芒果 <strong className="text-ink">+1</strong>　✨ 金芒果{" "}
                      <strong className="text-ink">+5</strong>
                    </li>
                    <li>接到爛芒果、或漏接好芒果都會少一條命</li>
                  </ul>
                </>
              ) : (
                <>
                  <p className="font-serif text-2xl font-bold tracking-widest">遊戲結束</p>
                  <p className="mt-4 text-6xl font-semibold tabular-nums">{hud.score}</p>
                  <p className="mt-2 text-sm tracking-widest text-ink-soft">
                    {newRecord ? "🎉 新紀錄！" : `最高紀錄 ${best}`}
                  </p>
                </>
              )}
              <button
                type="button"
                onClick={start}
                className="mt-7 rounded-full bg-ink px-9 py-3.5 text-sm tracking-widest text-paper transition hover:bg-leaf"
              >
                {view === "ready" ? "開始遊戲" : "再玩一次"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
