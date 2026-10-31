import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import ParallaxImage from "@/components/ParallaxImage";
import { formatDate, getPost, posts, type Block } from "@/data/posts";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  return { title: `${post.title}｜夏芒果園`, description: post.excerpt };
}

function Body({ block }: { block: Block }) {
  switch (block.type) {
    case "h2":
      return (
        <h2 className="mb-4 mt-14 font-serif text-2xl font-semibold tracking-wide md:text-[1.7rem]">
          {block.text}
        </h2>
      );
    case "p":
      return (
        <p className="my-5 text-[1.05rem] leading-[2.1] text-ink/85">
          {block.text}
        </p>
      );
    case "quote":
      return (
        <blockquote className="my-12 border-l-2 border-mango pl-6 font-serif text-xl leading-[1.8] md:-mx-8 md:text-2xl">
          {block.text}
        </blockquote>
      );
    case "list":
      return (
        <ol className="my-8 space-y-4">
          {block.items.map((item, i) => (
            <li
              key={item.title}
              className="glass flex gap-5 rounded-2xl p-5 md:p-6"
            >
              <span className="font-latin text-3xl italic leading-none text-mango">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <p className="font-serif text-lg font-semibold">{item.title}</p>
                <p className="mt-1 text-sm leading-7 text-ink-soft">
                  {item.text}
                </p>
              </div>
            </li>
          ))}
        </ol>
      );
    case "image":
      return (
        <figure className="my-12 md:-mx-16 lg:-mx-32">
          <div className="relative aspect-[16/10] overflow-hidden rounded-3xl">
            <Image
              src={block.src}
              alt={block.alt}
              fill
              placeholder="blur"
              sizes="(min-width: 1024px) 960px, 100vw"
              className="object-cover"
            />
          </div>
          <figcaption className="mt-3 text-center text-xs tracking-widest text-ink-soft">
            {block.caption}
          </figcaption>
        </figure>
      );
  }
}

export default function PostPage({ params }: PageProps<"/blog/[slug]">) {
  // params 只在 Suspense 內讀取，讓所有文章共用的外殼可以立即顯示
  return (
    <Suspense fallback={<PostSkeleton />}>
      <PostContent params={params} />
    </Suspense>
  );
}

function PostSkeleton() {
  return (
    <div aria-hidden className="animate-pulse">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 pb-10 pt-12 md:pt-16">
        <div className="h-3 w-24 rounded-full bg-ink/10" />
        <div className="mt-6 h-10 w-4/5 rounded-xl bg-ink/10" />
        <div className="h-4 w-3/5 rounded-full bg-ink/10" />
      </div>
      <div className="aspect-[4/3] rounded-[2rem] bg-ink/10 md:aspect-[21/9]" />
    </div>
  );
}

async function PostContent({
  params,
}: {
  params: PageProps<"/blog/[slug]">["params"];
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const index = posts.indexOf(post);
  const next = posts[(index + 1) % posts.length];

  return (
    <article>
      {/* ───────── 標題 ───────── */}
      <header className="mx-auto max-w-3xl pb-10 pt-12 text-center md:pt-16">
        <Link
          href="/blog"
          className="text-xs tracking-[0.3em] text-ink-soft transition hover:text-mango"
        >
          ← 芒果誌
        </Link>
        <p className="mt-8 flex items-center justify-center gap-3 text-xs tracking-widest text-ink-soft">
          <span className="text-mango">{post.category}</span>
          <span>·</span>
          <time dateTime={post.date} className="font-latin text-sm italic">
            {formatDate(post.date)}
          </time>
          <span>·</span>
          <span>{post.minutes} 分鐘閱讀</span>
        </p>
        <h1 className="mt-5 text-balance font-serif text-[2rem] font-bold leading-[1.4] tracking-wide sm:text-4xl md:text-5xl">
          {post.title}
        </h1>
        <p className="mx-auto mt-6 max-w-xl leading-8 text-ink-soft">
          {post.excerpt}
        </p>
      </header>

      <ParallaxImage
        src={post.cover}
        alt={post.coverAlt}
        sizes="(min-width: 1280px) 1200px, 100vw"
        speed={0.15}
        preload
        className="aspect-[4/3] rounded-[2rem] md:aspect-[21/9]"
      />

      {/* ───────── 內文 ───────── */}
      <div className="mx-auto max-w-2xl py-12 md:py-16">
        {post.body.map((block, i) => (
          <Body key={i} block={block} />
        ))}
      </div>

      {/* ───────── 預購 CTA ───────── */}
      <aside className="glass mx-auto flex max-w-3xl flex-col items-center gap-6 rounded-3xl p-8 text-center md:flex-row md:justify-between md:p-10 md:text-left">
        <div>
          <p className="font-serif text-2xl font-semibold">
            想嚐嚐玉井的夏天？
          </p>
          <p className="mt-2 text-sm text-ink-soft">
            2027 產季預購中，樹上自然熟、產地直送。
          </p>
        </div>
        <Link
          href="/#boxes"
          className="group inline-flex shrink-0 items-center gap-3 rounded-full bg-ink px-7 py-3.5 text-sm tracking-widest text-paper transition hover:bg-leaf"
        >
          看預購禮盒
          <span className="transition group-hover:translate-x-1">→</span>
        </Link>
      </aside>

      {/* ───────── 下一篇 ───────── */}
      <nav className="mx-auto max-w-3xl py-16 md:py-20">
        <p className="font-latin text-sm uppercase tracking-[0.3em] text-ink-soft">
          Next Story
        </p>
        <Link
          href={`/blog/${next.slug}`}
          className="group mt-6 grid items-center gap-6 border-t border-ink/10 pt-6 sm:grid-cols-[10rem_1fr]"
        >
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image
              src={next.cover}
              alt={next.coverAlt}
              fill
              placeholder="blur"
              sizes="160px"
              className="object-cover transition duration-700 group-hover:scale-105"
            />
          </div>
          <div>
            <p className="text-xs tracking-widest text-mango">
              {next.category}
            </p>
            <p className="mt-2 font-serif text-xl font-semibold transition group-hover:text-mango sm:text-2xl">
              {next.title} →
            </p>
          </div>
        </Link>
      </nav>
    </article>
  );
}
