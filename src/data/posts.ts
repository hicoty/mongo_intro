import type { StaticImageData } from "next/image";
import { photos } from "@/data/mango";

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "quote"; text: string }
  | { type: "list"; items: { title: string; text: string }[] }
  | { type: "image"; src: StaticImageData; alt: string; caption: string };

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  /** ISO 日期 */
  date: string;
  minutes: number;
  cover: StaticImageData;
  coverAlt: string;
  body: Block[];
};

export const posts: Post[] = [
  {
    slug: "how-to-pick-a-mango",
    title: "挑一顆好芒果，只要看、聞、摸",
    excerpt:
      "紅不代表熟，大也不代表甜。果農每天在果園裡用的三個判斷方法，讓你在市場也能挑到剛剛好的那一顆。",
    category: "選購指南",
    date: "2026-09-18",
    minutes: 5,
    cover: photos.mango1,
    coverAlt: "一堆紅黃相間的愛文芒果",
    body: [
      {
        type: "p",
        text: "每到夏天，總有人問我們：「芒果要挑紅一點的嗎？」答案是不一定。愛文的紅色來自陽光照射，同一棵樹上，向陽面的果實比較紅、背陽面的偏黃綠，但甜度未必有差。真正決定好不好吃的，是熟度與香氣。",
      },
      { type: "h2", text: "一、看：果形飽滿、果皮有光澤" },
      {
        type: "p",
        text: "好的芒果果肩圓潤、整體飽滿，拿起來有沉甸甸的手感。果皮表面若有一層自然的果粉、微微發亮，代表果實新鮮。避開果皮皺縮、有大片黑斑或壓傷凹陷的果實；細小的斑點多半是果皮上的皮孔，不影響風味。",
      },
      { type: "h2", text: "二、聞：靠近果蒂聞香氣" },
      {
        type: "p",
        text: "熟成的芒果在果蒂附近會散發明顯的甜香。若幾乎沒有味道，代表還需要放幾天；如果聞到酒味或發酵味，則是過熟了。這是最可靠、也最容易學會的方法。",
      },
      { type: "h2", text: "三、摸：用指腹輕壓，微微回彈" },
      {
        type: "p",
        text: "用指腹（不是指尖）輕輕按壓果實，能感覺到些微柔軟、放開後會回彈，就是可以吃的時候。整顆硬梆梆的就放在室溫等待；一按就凹陷不回彈，請盡快食用。",
      },
      {
        type: "quote",
        text: "芒果是後熟型水果，採收後還會繼續變甜。買回家時硬一點沒關係，交給時間就好。",
      },
      { type: "h2", text: "買回家之後" },
      {
        type: "list",
        items: [
          {
            title: "還沒熟：放室溫",
            text: "放在陰涼通風處，避免陽光直射。未熟的芒果不要冷藏，低溫會讓果實停止後熟、口感變差。",
          },
          {
            title: "熟了：再冷藏",
            text: "散發香氣、果皮微軟後，用報紙包起來放進冰箱，3–5 天內吃完風味最好。",
          },
          {
            title: "吃不完：切塊冷凍",
            text: "去皮切塊、平鋪冷凍，可以保存一個月左右，直接當冰沙或打果汁。",
          },
        ],
      },
    ],
  },
  {
    slug: "taiwan-mango-varieties",
    title: "愛文、金煌、凱特：台灣夏天的三種滋味",
    excerpt:
      "從五月的愛文、盛夏的金煌，到八月底才登場的凱特。認識三個品種的身世與風味，就知道整個夏天該怎麼吃芒果。",
    category: "品種故事",
    date: "2026-08-02",
    minutes: 6,
    cover: photos.mango3,
    coverAlt: "紅色與黃色的芒果堆疊在一起",
    body: [
      {
        type: "p",
        text: "台灣的芒果季從五月開始，一路延續到九月。不同品種在不同時間成熟，就像一場接力賽。在玉井，我們主要種植三個品種，各自有很不一樣的個性。",
      },
      { type: "h2", text: "愛文：讓台南玉井成為「芒果之鄉」" },
      {
        type: "p",
        text: "愛文原產於美國佛羅里達，1950 年代引進台灣後，在台南玉井找到最適合的風土。外皮紅潤、果肉細緻幾乎無纖維，帶有濃郁的蜜香。它是芒果冰的主角，也是大多數人心中「芒果」的樣子。產季約在 5 到 7 月。",
      },
      { type: "h2", text: "金煌：台灣自己育成的大果" },
      {
        type: "p",
        text: "金煌由高雄六龜的果農黃金煌先生選育而成，品種名稱也由此而來。果實碩大，一顆常有七八百公克、甚至超過一公斤，果皮成熟後呈金黃色。種子扁薄、果肉厚實，香氣比愛文清淡，但汁多清甜，非常適合整顆切開大口吃。產季約在 6 到 8 月。",
      },
      { type: "h2", text: "凱特：夏末最後的一棒" },
      {
        type: "p",
        text: "凱特同樣來自佛羅里達，是晚熟品種。成熟時果皮仍帶著綠色，不要被外表騙了——它的果肉緊實、纖維少，甜中帶一點微酸，尾韻清爽。當愛文與金煌都下市後，凱特在 8 到 9 月接手，替夏天畫下句點。",
      },
      {
        type: "image",
        src: photos.mango5,
        alt: "成堆的黃色芒果",
        caption: "金煌成熟後果皮轉為金黃，果型修長。",
      },
      { type: "h2", text: "怎麼選？看你想怎麼吃" },
      {
        type: "list",
        items: [
          {
            title: "做芒果冰、甜點",
            text: "選愛文，香氣濃、顏色漂亮，果肉細滑。",
          },
          {
            title: "全家一起切來吃",
            text: "選金煌，一顆就有滿滿果肉，份量十足。",
          },
          {
            title: "喜歡清爽不膩口",
            text: "選凱特，酸甜平衡，冰過之後特別好吃。",
          },
        ],
      },
    ],
  },
  {
    slug: "a-year-in-the-orchard",
    title: "從開花到採收：一顆芒果的一年",
    excerpt:
      "你吃到的每一口芒果，都在樹上等了將近半年。跟著果園的四季，看一顆愛文怎麼從細小的花穗，長成夏天的甜。",
    category: "果園日常",
    date: "2026-06-20",
    minutes: 7,
    cover: photos.mango2,
    coverAlt: "一顆掛在枝頭、沾著水珠的芒果",
    body: [
      {
        type: "p",
        text: "很多人以為芒果只在夏天忙，其實果園一整年都沒有停過。夏天的採收，只是一年工作的最後一段。",
      },
      { type: "h2", text: "冬天：開花" },
      {
        type: "p",
        text: "每年 12 月到隔年 2 月，芒果樹會抽出一串串細小的花穗。一個花穗上有上千朵小花，但最後能結成果實的只有少數幾顆。這段時間最怕連日陰雨或寒流，會影響授粉與著果。",
      },
      { type: "h2", text: "春天：疏果與套袋" },
      {
        type: "p",
        text: "3 到 4 月，小果實陸續長出來。我們會先「疏果」，只留下形狀端正、位置好的果實，讓養分集中。接著一顆一顆套上紙袋，保護果實不被果實蠅叮咬，也避免強烈日照造成曬傷。一棵樹可能要套上百個袋子，全靠人工完成。",
      },
      {
        type: "quote",
        text: "套袋那幾週，整個果園像下了一場紙做的雪。",
      },
      { type: "h2", text: "夏天：等待與採收" },
      {
        type: "p",
        text: "5 月開始，愛文陸續成熟。我們會打開紙袋確認果色、輕捏果肩感受硬度，七、八分熟才採收，讓果實在運送途中繼續後熟，抵達你手上時剛好最香甜。採收一律用剪刀連著果柄剪下，避免乳汁沾到果皮造成黑斑。",
      },
      { type: "h2", text: "秋天：修剪與休養" },
      {
        type: "p",
        text: "採收結束後，果樹需要休息。9 到 10 月是修剪枝條、施肥養樹的季節，為下一次開花儲存力氣。等到冬天的第一批花穗冒出來，新的一年又開始了。",
      },
    ],
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

export const formatDate = (iso: string) => {
  const [y, m, d] = iso.split("-");
  return `${y}.${m}.${d}`;
};
