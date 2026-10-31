import type { StaticImageData } from "next/image";
import pineapple from "../../public/images/pineapple.jpg";
import lychee from "../../public/images/lychee.jpg";
import guava from "../../public/images/guava.jpg";
import pomelo from "../../public/images/pomelo.jpg";
import atemoya from "../../public/images/atemoya.jpg";
import waxApple from "../../public/images/wax-apple.jpg";
import banana from "../../public/images/banana.jpg";
import papaya from "../../public/images/papaya.jpg";
import dragonFruit from "../../public/images/dragon-fruit.jpg";

export type Fruit = {
  name: string;
  origin: string;
  season: string;
  image: StaticImageData;
};

/** 芒果季之外，果園合作夥伴的當季水果 */
export const fruits: Fruit[] = [
  { name: "金鑽鳳梨", origin: "屏東", season: "3–7 月", image: pineapple },
  { name: "玉荷包荔枝", origin: "高雄大樹", season: "5–6 月", image: lychee },
  { name: "麻豆文旦", origin: "台南麻豆", season: "8–9 月", image: pomelo },
  { name: "紅龍果", origin: "彰化", season: "6–11 月", image: dragonFruit },
  { name: "珍珠芭樂", origin: "高雄燕巢", season: "全年", image: guava },
  { name: "鳳梨釋迦", origin: "台東", season: "11–4 月", image: atemoya },
  { name: "黑珍珠蓮霧", origin: "屏東林邊", season: "12–4 月", image: waxApple },
  { name: "北蕉", origin: "高雄旗山", season: "全年", image: banana },
  { name: "木瓜", origin: "台南", season: "全年", image: papaya },
];
