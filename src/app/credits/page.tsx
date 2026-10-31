import type { Metadata } from "next";
import credits from "../../../public/images/CREDITS.json";

export const metadata: Metadata = {
  title: "圖片來源｜夏芒果園",
};

export default function CreditsPage() {
  return (
    <section className="mx-auto max-w-3xl py-20">
      <h1 className="font-serif text-3xl font-semibold tracking-[0.2em]">圖片來源</h1>
      <p className="mt-4 leading-8 text-ink-soft">
        本站照片來自 Unsplash 與 Wikimedia Commons，依各自授權條款使用，感謝每一位攝影者。
      </p>

      <ul className="mt-12 divide-y divide-ink/10 border-y border-ink/10 text-sm">
        {credits.map((c) => (
          <li key={c.file} className="grid gap-1 py-4 sm:grid-cols-[10rem_1fr_auto] sm:gap-6">
            <span className="font-latin text-base italic">{c.file}</span>
            <a href={c.source} className="underline-offset-4 hover:text-mango hover:underline">
              {c.author || "Unknown"}
            </a>
            <a href={c.licenseUrl ?? c.source} className="text-ink-soft hover:text-mango">
              {c.license}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
