import Image from "next/image";
import type { Photo } from "@/types";
import { cn } from "@/lib/cn";

type PlateProps = {
  number: string;
  caption: string;
  photo?: Photo;
  sizes: string;
  className?: string;
};

/** A photograph with a numbered plate caption. Without a photo it shows a neutral placeholder. */
export function Plate({ number, caption, photo, sizes, className }: PlateProps) {
  return (
    <figure className={cn("plate", className)}>
      {photo ? (
        <Image
          src={photo.src}
          width={photo.width}
          height={photo.height}
          alt={photo.alt}
          sizes={sizes}
          className="h-auto w-full rounded-panel"
        />
      ) : (
        <div className="plate-placeholder" role="img" aria-label="Photograph to come">
          <span className="text-small">Photograph to come</span>
        </div>
      )}
      <figcaption className="text-small mt-4 flex flex-wrap justify-between gap-x-6 gap-y-1">
        <span>
          <span className="text-fg">Plate {number}.</span> {caption}
        </span>
        <span>{photo ? `Photo: ${photo.credit}` : "Credit to come"}</span>
      </figcaption>
    </figure>
  );
}
