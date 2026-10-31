import type { Metadata } from "next";
import MangoCatch from "@/components/MangoCatch";

export const metadata: Metadata = {
  title: "接芒果小遊戲｜夏芒果園",
};

export default function GamePage() {
  return (
    <section className="mx-auto max-w-3xl py-12 md:py-20">
      <p className="text-[11px] uppercase tracking-[0.35em] text-ink-soft sm:text-xs">
        Mini Game
      </p>
      <h1 className="mt-2 font-serif text-3xl font-semibold tracking-[0.2em]">
        接芒果
      </h1>
      <p className="mt-4 leading-8 text-ink-soft">
        芒果從樹上掉下來了！移動果籃接住熟芒果，小心別接到爛掉的。純屬娛樂，玩得開心 🥭
      </p>

      <div className="mt-10">
        <MangoCatch />
      </div>
    </section>
  );
}
