import Link from "next/link";

const navLinks = [
  { href: "/#varieties", label: "品種" },
  { href: "/#boxes", label: "禮盒" },
  { href: "/#story", label: "故事" },
  { href: "/#faq", label: "問答" },
  { href: "/blog", label: "文章" },
  { href: "/game", label: "遊戲" },
];

export default function Header() {
  return (
    <header className="sticky top-4 z-50 mx-auto w-full max-w-7xl px-5 sm:px-8">
      <div className="glass flex items-center justify-between rounded-2xl px-5 py-3 sm:px-7">
        <Link href="/" className="flex shrink-0 items-baseline gap-3">
          <span className="font-serif text-xl font-bold tracking-[0.25em]">
            夏芒果園
          </span>
          <span className="hidden whitespace-nowrap font-latin text-sm italic text-ink-soft lg:inline">
            Summer Mango Orchard
          </span>
        </Link>

        <div className="flex items-center gap-4 md:gap-6 lg:gap-8">
          <nav className="hidden items-center gap-6 text-sm tracking-[0.25em] md:flex lg:gap-9 lg:tracking-[0.3em]">
            {navLinks.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                className="group flex items-baseline gap-1.5 transition hover:text-mango"
              >
                <span className="hidden font-latin text-xs italic text-ink-soft group-hover:text-mango lg:inline">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {link.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/#boxes"
            className="hidden whitespace-nowrap rounded-full bg-ink px-5 py-2 text-sm tracking-widest text-paper transition hover:bg-leaf sm:inline-block"
          >
            立即預購
          </Link>

          {/* 手機版選單（不需 JavaScript） */}
          <details className="group relative md:hidden">
            <summary className="flex h-10 w-10 cursor-pointer list-none flex-col items-center justify-center gap-1.5 [&::-webkit-details-marker]:hidden">
              <span className="h-px w-5 bg-ink transition group-open:translate-y-[3.5px] group-open:rotate-45" />
              <span className="h-px w-5 bg-ink transition group-open:-translate-y-[3.5px] group-open:-rotate-45" />
            </summary>
            <nav className="glass absolute right-0 mt-4 flex w-44 flex-col rounded-2xl p-2 text-sm tracking-[0.3em]">
              {[...navLinks, { href: "/#order", label: "預購" }].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-xl px-4 py-3 transition hover:bg-white/40"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
