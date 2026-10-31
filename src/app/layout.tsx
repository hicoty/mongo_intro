import type { Metadata } from "next";
import { Cormorant_Garamond, Noto_Sans_TC, Noto_Serif_TC } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const notoSans = Noto_Sans_TC({
  variable: "--font-noto-sans",
  subsets: ["latin"],
});

const notoSerif = Noto_Serif_TC({
  variable: "--font-noto-serif",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "夏芒果園｜台南玉井愛文芒果產地直送",
  description: "台南玉井三代家族果園，樹上自然熟愛文、金煌、凱特芒果，2027 產季預購中。",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="zh-Hant"
      className={`${notoSans.variable} ${notoSerif.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="relative flex min-h-full flex-col overflow-x-hidden font-sans">
        {/* 背景色塊：讓玻璃面板有東西可以折射 */}
        <div className="pointer-events-none fixed inset-0 -z-10">
          <div className="absolute -right-40 -top-40 h-[36rem] w-[36rem] rounded-full bg-[#f5b56a]/45 blur-[120px]" />
          <div className="absolute -left-40 top-1/2 h-[30rem] w-[30rem] rounded-full bg-[#9cc59a]/40 blur-[120px]" />
        </div>

        <Header />
        <main className="mx-auto w-full max-w-7xl flex-1 px-5 sm:px-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
