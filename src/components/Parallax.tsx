"use client";

import { useEffect, useRef, type ReactNode } from "react";

type Props = {
  children?: ReactNode;
  /**
   * 視差強度。正值：比捲動慢（往後退的景深）；負值：比捲動快（往前浮出）。
   * 建議範圍 -0.3 ~ 0.3。
   */
  speed?: number;
  /** 位移方向，預設垂直 */
  axis?: "x" | "y";
  /**
   * 位移的基準點。
   * center：元素在視窗正中央時歸零（一般區塊）。
   * top：頁面在最頂端時歸零（首屏元素，確保一進來就在設計位置）。
   */
  anchor?: "center" | "top";
  /** 位移上限（px），避免圖片邊緣露出 */
  max?: number;
  /** 套用在外層（量測用、不會位移）的 class */
  className?: string;
  /** 套用在內層（實際位移）的 class */
  innerClassName?: string;
};

/**
 * 依元素與視窗中心的距離位移內層，做出景深視差。
 * 只用 transform，並在離開畫面、或使用者偏好減少動態時停止計算。
 */
export default function Parallax({
  children,
  speed = 0.15,
  axis = "y",
  anchor = "center",
  max = Infinity,
  className,
  innerClassName,
}: Props) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = outer.current;
    const target = inner.current;
    if (!el || !target) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let visible = false;
    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      // top 只在元素一進頁面就看得到時成立（例如電腦版首屏）；
      // 手機上首屏以下的元素改用 center，避免還沒看到就先飄走
      const inFirstScreen =
        rect.top + window.scrollY + rect.height / 2 < window.innerHeight;
      const distance =
        anchor === "top" && inFirstScreen
          ? -window.scrollY
          : rect.top + rect.height / 2 - window.innerHeight / 2;
      const offset = Math.max(-max, Math.min(max, -distance * speed));
      const px = offset.toFixed(1);
      target.style.transform =
        axis === "x"
          ? `translate3d(${px}px, 0, 0)`
          : `translate3d(0, ${px}px, 0)`;
    };
    const schedule = () => {
      if (visible && !frame) frame = requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        schedule();
      },
      { rootMargin: "20% 0px" },
    );
    observer.observe(el);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(frame);
    };
  }, [speed, max, axis, anchor]);

  return (
    <div ref={outer} className={className}>
      <div
        ref={inner}
        className={`will-change-transform ${innerClassName ?? ""}`}
      >
        {children}
      </div>
    </div>
  );
}
