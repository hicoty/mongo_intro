import Image, { type ImageProps } from "next/image";
import Parallax from "@/components/Parallax";

/** 圖片視差框：外框固定、圖片在框內以較慢速度移動 */
export default function ParallaxImage({
  src,
  alt,
  sizes,
  speed = 0.1,
  className = "",
  preload,
  anchor,
}: {
  src: ImageProps["src"];
  alt: string;
  sizes: string;
  speed?: number;
  className?: string;
  preload?: boolean;
  anchor?: "center" | "top";
}) {
  return (
    <Parallax
      speed={speed}
      anchor={anchor}
      max={70}
      className={`relative overflow-hidden ${className}`}
      innerClassName="absolute inset-x-0 -inset-y-[12%]"
    >
      <Image
        src={src}
        alt={alt}
        fill
        preload={preload}
        placeholder="blur"
        sizes={sizes}
        className="object-cover"
      />
    </Parallax>
  );
}
