import Image from "next/image";
import { alt, blur, src, type ImageKey } from "@/lib/images";

/**
 * Every photograph on the site goes through here: it fills its (positioned)
 * parent, carries the alt text and blur placeholder from the registry, and keeps
 * `sizes` mandatory so we never ship an oversized image.
 */
export default function Photo({
  image,
  sizes,
  res = 1200,
  className,
  eager = false,
}: {
  image: ImageKey;
  sizes: string;
  res?: number;
  className?: string;
  eager?: boolean;
}) {
  return (
    <Image
      src={src(image, res)}
      alt={alt(image)}
      placeholder="blur"
      blurDataURL={blur(image)}
      fill
      sizes={sizes}
      className={className}
      preload={eager}
    />
  );
}

