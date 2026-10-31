import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Parallax from "@/components/Parallax";
import ParallaxImage from "@/components/ParallaxImage";
import { formatDate, posts } from "@/data/posts";

export const metadata: Metadata = {
  title: "芒果誌｜夏芒果園",
  description: "挑選、品種與果園日常——來自玉井果園的芒果文章。",
};

export default function BlogPage() {
  const [featured, ...rest] = posts;

  return (
    <>
      {/* ───────── 標題 ───────── */}
      <section className="pb-12 pt-14 md:pb-16 md:pt-20">
        <p className="mb-6 flex items-center gap-3 text-[11px] uppercase tracking-[0.35em] text-ink-soft sm:text-xs">
          <span className="h-px w-10 bg-ink/40" />
          Journal
        </p>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h1 className="font-serif text-5xl font-bold tracking-[0.15em] md:text-6xl lg:text-7xl">
            芒果誌
          </h1>
          <p className="max-w-sm leading-8 text-ink-soft">
            關於挑選、品種與果園的四季。把我們在樹下學到的事，慢慢寫給你。
          </p>
        </div>
      </section>

      {/* ───────── 精選文章 ───────── */}
      <Link
        href={`/blog/${featured.slug}`}
        className="group relative block"
        aria-label={featured.title}
      >
        <ParallaxImage
          src={featured.cover}
          alt={featured.coverAlt}
          sizes="(min-width: 1280px) 1200px, 100vw"
          speed={0.12}
          anchor="top"
          preload
          className="aspect-[4/5] rounded-[2rem] sm:aspect-[16/10] lg:aspect-[21/9]"
        />
        <Parallax
          anchor="top"
          speed={-0.08}
          max={60}
          className="absolute inset-x-3 bottom-3 sm:inset-x-auto sm:bottom-8 sm:left-8 sm:max-w-lg lg:bottom-12 lg:left-12"
        >
          <article className="glass rounded-2xl p-6 sm:p-8">
            <p className="flex items-center gap-3 text-xs tracking-widest text-ink-soft">
              <span className="text-mango">{featured.category}</span>
              <span>·</span>
              <time
                dateTime={featured.date}
                className="font-latin text-sm italic"
              >
                {formatDate(featured.date)}
              </time>
            </p>
            <h2 className="mt-3 font-serif text-2xl font-semibold leading-snug sm:text-3xl">
              {featured.title}
            </h2>
            <p className="mt-3 hidden text-sm leading-7 text-ink-soft sm:block">
              {featured.excerpt}
            </p>
            <p className="mt-5 inline-flex items-center gap-2 text-sm tracking-widest">
              閱讀全文
              <span className="transition group-hover:translate-x-1">→</span>
            </p>
          </article>
        </Parallax>
      </Link>

      {/* ───────── 其他文章 ───────── */}
      <section className="grid gap-12 py-20 md:grid-cols-2 md:gap-8 lg:gap-12">
        {rest.map((post, i) => (
          <Parallax
            key={post.slug}
            speed={i === 1 ? -0.05 : 0.03}
            className={i === 1 ? "md:mt-20" : ""}
          >
            <Link href={`/blog/${post.slug}`} className="group block">
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
                <Image
                  src={post.cover}
                  alt={post.coverAlt}
                  fill
                  placeholder="blur"
                  sizes="(min-width: 768px) 45vw, 90vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
              </div>
              <p className="mt-6 flex items-center gap-3 text-xs tracking-widest text-ink-soft">
                <span className="text-mango">{post.category}</span>
                <span>·</span>
                <time
                  dateTime={post.date}
                  className="font-latin text-sm italic"
                >
                  {formatDate(post.date)}
                </time>
                <span>·</span>
                <span>{post.minutes} 分鐘</span>
              </p>
              <h2 className="mt-3 font-serif text-2xl font-semibold leading-snug transition group-hover:text-mango lg:text-3xl">
                {post.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-ink-soft">
                {post.excerpt}
              </p>
            </Link>
          </Parallax>
        ))}
      </section>
    </>
  );
}
