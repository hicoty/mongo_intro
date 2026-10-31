import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import Parallax from "@/components/Parallax";
import ParallaxImage from "@/components/ParallaxImage";
import SectionLabel from "@/components/SectionLabel";
import LuckyDraw from "@/components/LuckyDraw";
import Welcome from "@/components/Welcome";
import PreorderEmail from "@/components/PreorderEmail";
import { boxes, faqs, photos, promises, varieties } from "@/data/mango";
import { fruits } from "@/data/fruits";

const pad = (n: number) => String(n).padStart(2, "0");
const price = (n: number) => n.toLocaleString("en-US");
const SEASON = [5, 6, 7, 8, 9];

const orb = (color: string, deep: string) =>
  ({ "--orb": color, "--orb-deep": deep }) as CSSProperties;

export default function Home() {
  return (
    <>
      {/* ───────── Hero ───────── */}
      <section className="grid items-center gap-14 pb-20 pt-12 md:grid-cols-12 md:gap-8 md:pb-28 md:pt-20 lg:min-h-[calc(100svh-6rem)] lg:py-16 lg:gap-12">
        <Parallax
          anchor="top"
          speed={0.08}
          className="md:col-span-7 lg:col-span-6"
        >
          <Welcome />
          <p className="mb-8 flex items-center gap-3 text-[11px] uppercase tracking-[0.35em] text-ink-soft sm:text-xs">
            <span className="h-px w-10 bg-ink/40" />
            Yujing, Tainan · Since 1987
          </p>
          <h1 className="font-serif text-[2.5rem] font-bold leading-[1.3] tracking-wide sm:text-5xl md:text-[3.4rem] lg:text-[4.2rem]">
            等一年了，
            <br />
            就為了這
            <span className="whitespace-nowrap">
              <span className="relative inline-block">
                一口夏天
                <svg
                  aria-hidden
                  viewBox="0 0 200 20"
                  preserveAspectRatio="none"
                  className="absolute -bottom-1 left-0 h-3 w-full text-mango"
                >
                  <path
                    d="M2 14 C 50 4, 120 4, 198 12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              。
            </span>
          </h1>
          <p className="mt-8 max-w-md leading-8 text-ink-soft md:mt-10">
            台南玉井山腳下的家族果園，三代人只種一件事——芒果。
            樹上自然熟成、逐顆手工挑選，採收當天低溫直送到你家。
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-6 sm:gap-8">
            <a
              href="#boxes"
              className="group inline-flex items-center gap-3 rounded-full bg-ink px-7 py-3.5 text-sm tracking-widest text-paper transition hover:bg-leaf"
            >
              預購 2027 產季
              <span className="transition group-hover:translate-x-1">→</span>
            </a>
            <a
              href="#varieties"
              className="border-b border-ink/40 pb-1 text-sm tracking-widest transition hover:border-mango hover:text-mango"
            >
              認識三個品種
            </a>
            <LuckyDraw />
          </div>
        </Parallax>

        <div className="relative mx-auto w-full max-w-md md:col-span-5 md:max-w-none lg:col-span-6">
          <ParallaxImage
            src={photos.mango1}
            alt="成堆的紅黃色愛文芒果"
            sizes="(min-width: 1024px) 45vw, (min-width: 768px) 40vw, 90vw"
            speed={0.12}
            anchor="top"
            preload
            className="aspect-[4/5] rounded-[2rem] shadow-[0_40px_80px_-30px_rgb(120_50_10/0.45)] md:aspect-[3/4] lg:aspect-[4/5]"
          />

          <Parallax
            anchor="top"
            speed={-0.18}
            max={120}
            className="absolute -bottom-8 -left-2 w-60 sm:-left-6 sm:w-72 md:-left-10 md:w-56 lg:-left-8 lg:w-72"
          >
            <div className="glass rounded-2xl p-5 sm:p-6">
              <p className="text-[11px] uppercase tracking-[0.3em] text-ink-soft">
                Pre-order Open
              </p>
              <p className="mt-2 font-serif text-xl font-semibold sm:text-2xl">
                2027 夏季預購中
              </p>
              <div className="mt-4 flex items-end justify-between border-t border-ink/10 pt-4">
                <span className="text-xs text-ink-soft">愛文嚐鮮盒</span>
                <span className="font-latin text-2xl">
                  <span className="text-sm">NT$</span> {price(boxes[0].price)}
                  <span className="text-sm"> 起</span>
                </span>
              </div>
            </div>
          </Parallax>

          <Parallax
            anchor="top"
            speed={-0.35}
            max={180}
            className="absolute -right-3 -top-6"
          >
            <div
              className="orb h-16 w-16 sm:h-20 sm:w-20"
              style={orb("#f6a640", "#c4471f")}
            />
          </Parallax>
          <Parallax
            anchor="top"
            speed={-0.5}
            max={240}
            className="absolute -right-4 bottom-1/4 hidden sm:block"
          >
            <div className="orb h-10 w-10" style={orb("#e2594f", "#8e1f27")} />
          </Parallax>
        </div>
      </section>

      {/* ───────── 承諾 ───────── */}
      <section className="grid gap-px overflow-hidden rounded-3xl border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-4">
        {promises.map((p, i) => (
          <div key={p.title} className="bg-paper/90 p-6 md:p-7">
            <span className="font-latin text-sm italic text-mango">
              {pad(i + 1)}
            </span>
            <p className="mt-2 font-serif text-lg font-semibold tracking-widest">
              {p.title}
            </p>
            <p className="mt-2 text-sm leading-7 text-ink-soft">{p.text}</p>
          </div>
        ))}
      </section>

      {/* ───────── 橫向漂移大字 ───────── */}
      <div
        aria-hidden
        className="pointer-events-none -mx-5 overflow-hidden py-10 sm:-mx-8 md:py-14"
      >
        <Parallax axis="x" speed={0.5}>
          <p className="whitespace-nowrap font-latin text-[18vw] italic leading-none text-ink/[0.07] md:text-[12vw]">
            Irwin · Chin Hwang · Keitt · Irwin · Chin Hwang
          </p>
        </Parallax>
      </div>

      {/* ───────── 品種 ───────── */}
      <section id="varieties" className="scroll-mt-28 pb-20 md:pb-24">
        <SectionLabel no="01" title="三個品種，三段夏天" en="Varieties" />

        <div className="grid gap-12 sm:grid-cols-2 sm:gap-x-6 md:grid-cols-3 md:gap-6 lg:gap-8">
          {varieties.map((v, i) => (
            <Parallax
              key={v.name}
              speed={i === 1 ? -0.06 : 0.04}
              className={`${i === 1 ? "md:mt-16" : ""} ${i === 2 ? "sm:col-span-2 sm:mx-auto sm:w-1/2 md:col-span-1 md:w-auto" : ""}`}
            >
              <article className="group">
                <div className="relative">
                  <ParallaxImage
                    src={v.image}
                    alt={`${v.name}芒果`}
                    sizes="(min-width: 768px) 30vw, (min-width: 640px) 45vw, 90vw"
                    speed={0.08}
                    className="aspect-[4/5] rounded-3xl"
                  />
                  <div className="glass absolute inset-x-4 bottom-4 flex items-center justify-between rounded-2xl px-5 py-3">
                    <span className="text-xs tracking-widest">產季</span>
                    <span className="font-latin text-lg">
                      {v.months[0]}–{v.months.at(-1)} 月
                    </span>
                  </div>
                </div>
                <div className="mt-6 flex items-baseline gap-3">
                  <h3 className="font-serif text-3xl font-semibold">
                    {v.name}
                  </h3>
                  <span className="font-latin text-lg italic text-ink-soft">
                    {v.en}
                  </span>
                </div>
                <p
                  className="mt-1 text-sm tracking-widest"
                  style={{ color: v.color }}
                >
                  {v.taste}
                </p>
                <p className="mt-3 text-sm leading-7 text-ink-soft">
                  {v.description}
                </p>
              </article>
            </Parallax>
          ))}
        </div>

        {/* 產季時間軸 */}
        <div className="glass mt-16 rounded-3xl p-5 sm:p-8 md:mt-24 lg:p-10">
          <table className="w-full table-fixed border-separate border-spacing-x-1 border-spacing-y-3 text-sm">
            <thead>
              <tr className="text-ink-soft">
                <th className="w-14 text-left font-normal tracking-widest sm:w-24">
                  品種
                </th>
                {SEASON.map((m) => (
                  <th
                    key={m}
                    className="font-latin text-base font-normal italic sm:text-lg"
                  >
                    {m}
                    <span className="hidden sm:inline"> 月</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {varieties.map((v) => (
                <tr key={v.name}>
                  <td className="font-serif text-base font-semibold">
                    {v.name}
                  </td>
                  {SEASON.map((m) => (
                    <td key={m}>
                      <div
                        className="h-7 rounded-lg sm:h-8"
                        style={
                          v.months.includes(m)
                            ? {
                                background: v.color,
                                boxShadow:
                                  "inset 0 1px 0 rgb(255 255 255 / .45)",
                              }
                            : { background: "rgb(29 42 34 / .05)" }
                        }
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ───────── 禮盒 ───────── */}
      <section id="boxes" className="scroll-mt-28 py-20 md:py-24">
        <SectionLabel no="02" title="預購禮盒" en="Pre-order" />

        <div className="grid gap-6 md:grid-cols-3 md:gap-4 lg:gap-6">
          {boxes.map((b) => (
            <article
              key={b.name}
              className={`flex flex-col rounded-3xl p-7 md:p-6 lg:p-8 ${
                b.featured ? "bg-ink text-paper md:-my-4 md:py-10" : "glass"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-serif text-2xl font-semibold tracking-widest md:text-xl lg:text-2xl">
                  {b.name}
                </h3>
                {b.featured && (
                  <span className="font-latin text-sm italic text-mango">
                    Most loved
                  </span>
                )}
              </div>
              <p
                className={`mt-2 text-sm ${b.featured ? "text-paper/70" : "text-ink-soft"}`}
              >
                {b.note}
              </p>
              <dl
                className={`mt-8 space-y-3 border-y py-6 text-sm ${
                  b.featured ? "border-paper/15" : "border-ink/10"
                }`}
              >
                {[
                  ["內容", b.spec],
                  ["重量", b.weight],
                  ["運費", "冷藏宅配免運"],
                ].map(([k, val]) => (
                  <div key={k} className="flex justify-between gap-3">
                    <dt
                      className={b.featured ? "text-paper/60" : "text-ink-soft"}
                    >
                      {k}
                    </dt>
                    <dd className="text-right">{val}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-8 flex-1 font-latin text-5xl md:text-4xl lg:text-5xl">
                <span className="align-top text-lg">NT$</span>
                {price(b.price)}
              </p>
              <a
                href="#order"
                className={`mt-8 block rounded-full py-3.5 text-center text-sm tracking-widest transition ${
                  b.featured
                    ? "bg-mango text-ink hover:bg-paper"
                    : "bg-ink text-paper hover:bg-leaf"
                }`}
              >
                預購這一盒
              </a>
            </article>
          ))}
        </div>
      </section>

      {/* ───────── 果園故事 ───────── */}
      <section id="story" className="scroll-mt-28 py-20 md:py-24">
        <SectionLabel no="03" title="果園故事" en="Our Orchard" />

        <div className="grid items-center gap-10 md:grid-cols-12 md:gap-8 lg:gap-12">
          <div className="relative md:col-span-5">
            <ParallaxImage
              src={photos.mango2}
              alt="掛在枝頭、還沾著露水的芒果"
              sizes="(min-width: 768px) 40vw, 90vw"
              speed={0.14}
              className="aspect-[4/3] rounded-3xl sm:aspect-[16/10] md:aspect-[3/4]"
            />
            <Parallax
              speed={-0.25}
              className="absolute -bottom-6 -right-4 hidden md:block"
            >
              <div className="glass rounded-2xl px-5 py-4">
                <p className="font-latin text-3xl">1987</p>
                <p className="text-xs tracking-widest text-ink-soft">
                  種下第一棵愛文
                </p>
              </div>
            </Parallax>
          </div>

          <Parallax
            speed={-0.05}
            className="md:col-span-7 lg:col-span-6 lg:col-start-7"
          >
            <p className="font-serif text-2xl font-medium leading-[1.6] sm:text-3xl lg:text-4xl">
              「芒果不能急，
              <span className="text-leaf">要等它自己告訴你</span>
              ，什麼時候該下樹。」
            </p>
            <p className="mt-8 leading-8 text-ink-soft">
              1987
              年，阿公在玉井山腳種下第一批愛文。三十多年來，我們堅持每顆果實套袋保護、
              少量施肥、讓果實在樹上慢慢累積糖分。採收時一顆一顆用手摘，輕放進鋪著紙的果籃，
              就像對待剛出生的孩子。
            </p>
            <div className="mt-10 grid grid-cols-3 gap-4 border-t border-ink/10 pt-8 sm:gap-6">
              {[
                ["3", "代人"],
                ["12", "公頃果園"],
                ["1987", "年起"],
              ].map(([n, label]) => (
                <div key={label}>
                  <p className="font-latin text-3xl sm:text-4xl">{n}</p>
                  <p className="mt-1 text-xs tracking-widest text-ink-soft">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </Parallax>
        </div>
      </section>

      {/* ───────── 預購流程 ───────── */}
      <section id="order" className="scroll-mt-28 py-20 md:py-24">
        <SectionLabel no="04" title="預購流程" en="How to Order" />

        <div className="relative overflow-hidden rounded-[2rem]">
          {/* 背景圖以較強的視差移動，做出前後景深 */}
          <Parallax
            speed={0.3}
            max={160}
            className="absolute inset-0"
            innerClassName="absolute inset-x-0 -inset-y-[30%]"
          >
            <Image
              src={photos.mango4}
              alt=""
              fill
              placeholder="blur"
              sizes="100vw"
              className="object-cover"
            />
          </Parallax>
          <div aria-hidden className="absolute inset-0 bg-paper/25" />

          <div className="relative grid gap-4 p-5 sm:p-8 md:grid-cols-3 md:p-10 lg:p-16">
            {[
              ["選擇禮盒", "挑選想要的禮盒與數量，送禮可分開寄送到不同地址。"],
              [
                "LINE 或電話下單",
                "加入官方 LINE 或來電，告訴我們收件資訊與最早到貨日。",
              ],
              ["等待夏天", "產季開始後依熟度出貨，出貨前 3 天簡訊通知。"],
            ].map(([title, text], i) => (
              <Parallax key={title} speed={-0.04 * (i + 1)}>
                <div className="glass h-full rounded-2xl p-6 lg:p-7">
                  <span className="font-latin text-4xl italic text-ink">
                    {pad(i + 1)}
                  </span>
                  <p className="mt-4 font-serif text-xl font-semibold tracking-widest">
                    {title}
                  </p>
                  <p className="mt-2 text-sm leading-7">{text}</p>
                </div>
              </Parallax>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
          <a
            href="#contact"
            className="group inline-flex items-center gap-3 rounded-full bg-ink px-8 py-4 text-sm tracking-widest text-paper transition hover:bg-leaf"
          >
            加入 LINE 預購
            <span className="transition group-hover:translate-x-1">→</span>
          </a>
          <a
            href="tel:+88665741234"
            className="border-b border-ink/40 pb-1 text-sm tracking-widest transition hover:border-mango hover:text-mango"
          >
            來電 06-574-1234
          </a>
        </div>
        <PreorderEmail />
      </section>

      {/* ───────── 其他鮮果 ───────── */}
      <section id="more" className="scroll-mt-28 py-20 md:py-24">
        <SectionLabel no="05" title="芒果季之外" en="Seasonal Picks" />
        <p className="-mt-4 mb-10 max-w-xl leading-8 text-ink-soft md:-mt-6">
          一年只有一季芒果，其他月份，我們向信任的鄰近果農選品，把各地當季的好味道一起送給你。
        </p>

        {/* 手機、平板：橫向滑動；電腦：網格 */}
        <div className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 sm:-mx-8 sm:gap-5 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-x-8 lg:gap-y-12 lg:overflow-visible lg:px-0 lg:pb-12">
          {fruits.map((f, i) => (
            <figure
              key={f.name}
              className={`w-48 shrink-0 snap-start sm:w-56 lg:w-auto ${i % 3 === 1 ? "lg:translate-y-12" : ""}`}
            >
              <div className="relative aspect-square overflow-hidden rounded-2xl lg:aspect-[4/3]">
                <Image
                  src={f.image}
                  alt={f.name}
                  fill
                  placeholder="blur"
                  sizes="(min-width: 1024px) 30vw, 224px"
                  className="object-cover transition duration-700 hover:scale-105"
                />
              </div>
              <figcaption className="mt-4">
                <p className="font-serif text-lg font-semibold">{f.name}</p>
                <p className="mt-1 flex justify-between text-xs tracking-widest text-ink-soft">
                  <span>{f.origin}</span>
                  <span>{f.season}</span>
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ───────── 小遊戲 ───────── */}
      <section className="py-10 md:py-14">
        <Link
          href="/game"
          className="glass group flex flex-col items-start gap-6 rounded-[2rem] p-7 transition hover:-translate-y-1 sm:flex-row sm:items-center sm:p-10"
        >
          <div className="flex shrink-0 gap-2" aria-hidden>
            <div className="orb h-12 w-12" style={orb("#f6a640", "#c4471f")} />
            <div
              className="orb mt-5 h-9 w-9"
              style={orb("#ffe680", "#d99a00")}
            />
          </div>
          <div className="flex-1">
            <p className="text-[11px] uppercase tracking-[0.35em] text-ink-soft">
              Mini Game
            </p>
            <p className="mt-2 font-serif text-2xl font-semibold tracking-widest">
              等芒果季的空檔，來接芒果吧！
            </p>
            <p className="mt-2 text-sm leading-7 text-ink-soft">
              移動果籃接住熟芒果、避開爛芒果，看看你能拿幾分。
            </p>
          </div>
          <span className="inline-flex items-center gap-3 rounded-full bg-ink px-7 py-3.5 text-sm tracking-widest text-paper transition group-hover:bg-leaf">
            開始玩
            <span className="transition group-hover:translate-x-1">→</span>
          </span>
        </Link>
      </section>

      {/* ───────── FAQ ───────── */}
      <section id="faq" className="scroll-mt-28 py-20 md:py-24">
        <SectionLabel no="06" title="常見問題" en="FAQ" />

        <div className="mx-auto max-w-3xl divide-y divide-ink/10 border-y border-ink/10">
          {faqs.map((f) => (
            <details key={f.q} className="group py-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-serif text-lg font-semibold [&::-webkit-details-marker]:hidden">
                {f.q}
                <span className="text-2xl font-light text-mango transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-4 leading-8 text-ink-soft">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
