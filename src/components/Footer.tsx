import Link from "next/link";

const columns = [
  {
    title: "Shop",
    links: [
      { href: "/#boxes", label: "預購禮盒" },
      { href: "/#varieties", label: "品種與產季" },
      { href: "/#faq", label: "常見問題" },
      { href: "/blog", label: "芒果誌" },
      { href: "/credits", label: "圖片來源" },
    ],
  },
  {
    title: "Contact",
    links: [
      { href: "tel:+88665741234", label: "06-574-1234" },
      {
        href: "mailto:hello@summer-mango.example",
        label: "hello@summer-mango.example",
      },
      { href: "/#contact", label: "LINE：@summermango" },
      { href: "/#contact", label: "台南市玉井區芒果路 88 號" },
    ],
  },
];

export default function Footer() {
  return (
    <footer
      id="contact"
      className="mx-auto mt-16 w-full max-w-7xl scroll-mt-28 px-5 pb-8 sm:px-8"
    >
      <div className="glass overflow-hidden rounded-3xl px-6 pt-12 sm:px-12">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-6">
            <p className="font-serif text-3xl font-semibold leading-snug sm:text-4xl">
              今年夏天，
              <br />
              讓玉井的芒果去找你。
            </p>
            <a
              href="#boxes"
              className="group mt-8 inline-flex items-center gap-3 rounded-full bg-ink px-7 py-3.5 text-sm tracking-widest text-paper transition hover:bg-leaf"
            >
              預購 2027 產季
              <span className="transition group-hover:translate-x-1">→</span>
            </a>
          </div>

          {columns.map((col) => (
            <div key={col.title} className="md:col-span-3">
              <p className="font-latin text-sm uppercase tracking-[0.3em] text-ink-soft">
                {col.title}
              </p>
              <ul className="mt-5 space-y-3 text-sm">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith("/") &&
                    !link.href.startsWith("/#") ? (
                      <Link
                        href={link.href}
                        className="transition hover:text-mango"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className="transition hover:text-mango"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col justify-between gap-2 border-t border-ink/10 py-6 text-xs tracking-widest text-ink-soft sm:flex-row">
          <p>© 2026 夏芒果園 Summer Mango Orchard</p>
          <p className="font-latin text-sm italic">
            Ripened on the tree, picked by hand.
          </p>
        </div>

        {/* 底部大字 */}
        <p
          aria-hidden
          className="pointer-events-none -mb-[0.28em] select-none text-center font-serif text-[17vw] font-black leading-none tracking-[0.1em] text-ink/[0.06] xl:text-[14rem]"
        >
          夏芒果園
        </p>
      </div>
    </footer>
  );
}
