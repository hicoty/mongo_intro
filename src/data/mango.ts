import type { StaticImageData } from "next/image";
import mango1 from "../../public/images/mango-1.jpg";
import mango2 from "../../public/images/mango-2.jpg";
import mango3 from "../../public/images/mango-3.jpg";
import mango4 from "../../public/images/mango-4.jpg";
import mango5 from "../../public/images/mango-5.jpg";

export const photos = { mango1, mango2, mango3, mango4, mango5 };

export type Variety = {
  name: string;
  en: string;
  months: number[];
  taste: string;
  description: string;
  image: StaticImageData;
  color: string;
};

export const varieties: Variety[] = [
  {
    name: "愛文",
    en: "Irwin",
    months: [5, 6, 7],
    taste: "濃郁蜜香・細緻無纖維",
    description: "外皮紅潤如蘋果，果肉橙黃滑嫩。玉井最具代表性的品種，也是芒果冰的首選。",
    image: mango3,
    color: "#d9483b",
  },
  {
    name: "金煌",
    en: "Chin Hwang",
    months: [6, 7, 8],
    taste: "清甜多汁・果肉厚實",
    description: "台灣自育的大果品種，一顆可達一公斤。果皮金黃，種子薄，切開幾乎都是果肉。",
    image: mango5,
    color: "#e9a93b",
  },
  {
    name: "凱特",
    en: "Keitt",
    months: [8, 9],
    taste: "酸甜平衡・尾韻清爽",
    description: "夏末才登場的晚熟品種，果肉緊實少纖維。芒果季的最後一棒，錯過要再等一年。",
    image: mango4,
    color: "#7f9a3c",
  },
];

export type Box = {
  name: string;
  spec: string;
  weight: string;
  price: number;
  note: string;
  featured?: boolean;
};

export const boxes: Box[] = [
  {
    name: "嚐鮮盒",
    spec: "愛文 8–9 顆",
    weight: "約 2.5 台斤",
    price: 880,
    note: "第一次訂購、小家庭剛剛好",
  },
  {
    name: "經典禮盒",
    spec: "愛文 12–14 顆",
    weight: "約 5 台斤",
    price: 1480,
    note: "附手提禮盒與品種卡，送禮自用皆宜",
    featured: true,
  },
  {
    name: "職人特選",
    spec: "特大果 6 顆",
    weight: "約 5 台斤",
    price: 1880,
    note: "每顆 400g 以上，限量供應",
  },
];

export const promises = [
  { title: "樹上自然熟", text: "七分熟以上才採收，不催熟、不打藥熟成。" },
  { title: "逐顆手工挑選", text: "外觀、重量、香氣逐一檢查，瑕疵果不出貨。" },
  { title: "產地低溫直送", text: "採收當天裝箱，冷藏宅配隔日抵達。" },
  { title: "到貨損壞包退", text: "拍照回報即補寄或退款，不用寄回。" },
];

export const faqs = [
  {
    q: "什麼時候出貨？",
    a: "愛文約 5 月下旬開始出貨，依果實成熟度排序寄出。預購完成後會在出貨前 3 天以簡訊通知。",
  },
  {
    q: "收到芒果要怎麼保存？",
    a: "請先放在室溫陰涼處，待果皮微軟、散發香氣後再放入冰箱冷藏，3–5 天內食用風味最佳。",
  },
  {
    q: "可以指定到貨日嗎？",
    a: "可以指定「最早到貨日」，我們會在該日期之後、果實熟度最佳時寄出。送禮需求請在備註說明。",
  },
  {
    q: "收到時有壓傷怎麼辦？",
    a: "請於到貨 24 小時內拍照傳給我們，確認後立即補寄或退款，不需要寄回商品。",
  },
];
