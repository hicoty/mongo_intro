"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

const WIN_RATE = 0.1;
const DRAW_MS = 1600;
const STORAGE_KEY = "mango-lucky-draw";

type Result = { win: true; code: string } | { win: false };
type Stage = "idle" | "drawing" | "done";

const makeCode = () => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const rand = crypto.getRandomValues(new Uint32Array(6));
  return `MANGO90-${Array.from(rand, (n) => chars[n % chars.length]).join("")}`;
};

const loadResult = (): Result | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Result) : null;
  } catch {
    return null;
  }
};

const saveResult = (result: Result) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(result));
  } catch {
    // 無痕模式等情況存不了，就只在這次瀏覽有效
  }
};

/** 抽獎按鈕 + modal：10% 機率抽中芒果 9 折優惠券，每個瀏覽器限抽一次。 */
export default function LuckyDraw() {
  const dialog = useRef<HTMLDialogElement>(null);
  const timer = useRef<number>(0);
  const [stage, setStage] = useState<Stage>("idle");
  const [result, setResult] = useState<Result | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => () => clearTimeout(timer.current), []);

  const open = () => {
    const saved = loadResult();
    if (saved) {
      setResult(saved);
      setStage("done");
    }
    dialog.current?.showModal();
  };

  const close = () => dialog.current?.close();

  const draw = () => {
    setStage("drawing");
    const next: Result =
      Math.random() < WIN_RATE ? { win: true, code: makeCode() } : { win: false };
    saveResult(next);
    timer.current = window.setTimeout(() => {
      setResult(next);
      setStage("done");
    }, DRAW_MS);
  };

  const copy = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={open}
        className="group inline-flex items-center gap-2 rounded-full border border-mango/60 bg-mango/15 px-6 py-3.5 text-sm tracking-widest text-ink transition hover:bg-mango hover:text-ink"
      >
        <span aria-hidden className="transition group-hover:rotate-12">
          🎁
        </span>
        試試手氣抽優惠
      </button>

      <dialog
        ref={dialog}
        aria-labelledby="lucky-draw-title"
        onClick={(e) => e.target === e.currentTarget && close()}
        className="m-auto w-[calc(100%-2rem)] max-w-sm rounded-3xl bg-paper p-0 text-ink shadow-[0_40px_80px_-30px_rgb(120_50_10/0.55)] backdrop:bg-ink/45 backdrop:backdrop-blur-sm"
      >
        <div className="relative px-7 pb-8 pt-10 text-center">
          <button
            type="button"
            onClick={close}
            aria-label="關閉"
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-xl text-ink-soft transition hover:bg-ink/5 hover:text-ink"
          >
            ×
          </button>

          <p className="text-[11px] uppercase tracking-[0.35em] text-ink-soft">
            Lucky Draw
          </p>
          <h2
            id="lucky-draw-title"
            className="mt-2 font-serif text-2xl font-bold tracking-widest"
          >
            芒果幸運抽
          </h2>

          <div
            aria-hidden
            className={`orb mx-auto my-8 h-24 w-24 ${
              stage === "drawing"
                ? "motion-safe:animate-bounce"
                : stage === "done" && result?.win
                  ? "scale-110 transition"
                  : ""
            }`}
            style={
              stage === "done" && !result?.win
                ? ({ "--orb": "#c9c2b4", "--orb-deep": "#7d776c" } as CSSProperties)
                : ({ "--orb": "#f6a640", "--orb-deep": "#c4471f" } as CSSProperties)
            }
          />

          <div aria-live="polite" className="min-h-28">
            {stage === "idle" && (
              <>
                <p className="leading-7 text-ink-soft">
                  每人一次機會，有 <strong className="text-mango">10%</strong>{" "}
                  機率抽中
                  <br />
                  芒果禮盒 <strong className="text-ink">9 折優惠券</strong>
                </p>
                <button
                  type="button"
                  onClick={draw}
                  className="mt-6 w-full rounded-full bg-ink py-3.5 text-sm tracking-widest text-paper transition hover:bg-leaf"
                >
                  開始抽獎
                </button>
              </>
            )}

            {stage === "drawing" && (
              <p className="pt-4 font-serif text-lg tracking-widest">抽獎中…</p>
            )}

            {stage === "done" && result?.win && (
              <>
                <p className="font-serif text-xl font-semibold text-mango">
                  恭喜抽中 9 折優惠券！
                </p>
                <div className="mt-4 flex items-center justify-between gap-3 rounded-2xl border border-dashed border-mango/70 bg-mango/10 px-4 py-3">
                  <code className="font-mono text-base font-semibold tracking-wider">
                    {result.code}
                  </code>
                  <button
                    type="button"
                    onClick={() => copy(result.code)}
                    className="shrink-0 rounded-full bg-ink px-4 py-1.5 text-xs tracking-widest text-paper transition hover:bg-leaf"
                  >
                    {copied ? "已複製" : "複製"}
                  </button>
                </div>
                <p className="mt-3 text-xs leading-6 text-ink-soft">
                  預購時告訴我們這組代碼即可享 9 折
                </p>
              </>
            )}

            {stage === "done" && result && !result.win && (
              <>
                <p className="font-serif text-xl font-semibold">
                  差一點點，這次沒抽中
                </p>
                <p className="mt-3 text-sm leading-7 text-ink-soft">
                  謝謝參加！芒果季見 🥭
                </p>
                <a
                  href="#boxes"
                  onClick={close}
                  className="mt-5 inline-block border-b border-ink/40 pb-1 text-sm tracking-widest transition hover:border-mango hover:text-mango"
                >
                  看看預購禮盒 →
                </a>
              </>
            )}
          </div>
        </div>
      </dialog>
    </>
  );
}
