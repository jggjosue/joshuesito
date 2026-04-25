import Image from "next/image";
import type { PortableTextComponents } from "@portabletext/react";
import type { ReactNode } from "react";
import { urlFor } from "./sanity";

const headingClass = {
  h1: "mt-16 scroll-mt-28 text-balance text-3xl font-bold text-foreground first:mt-8",
  h2: "mb-4 mt-16 scroll-mt-28 text-balance text-[1.45rem] font-bold leading-snug text-foreground first:mt-8 sm:mt-20 sm:mb-5 sm:text-2xl",
  h3: "mb-4 mt-14 scroll-mt-28 text-balance text-xl font-bold leading-snug text-foreground first:mt-6 sm:mt-16 sm:text-[1.35rem]",
  h4: "mb-3 mt-12 scroll-mt-28 text-balance text-lg font-bold text-foreground first:mt-6",
  h5: "mb-2 mt-10 scroll-mt-28 text-base font-bold text-foreground first:mt-5",
} as const;

type ImageBlockValue = {
  _type: "image";
  asset?: unknown;
  alt?: string;
  caption?: string;
  dimensions?: { width?: number; height?: number };
};

export const blogPortableTextComponents: PortableTextComponents = {
  block: {
    h1: ({ children }: { children?: ReactNode }) => (
      <h1 className={headingClass.h1}>{children}</h1>
    ),
    h2: ({ children }: { children?: ReactNode }) => (
      <h2 className={headingClass.h2}>{children}</h2>
    ),
    h3: ({ children }: { children?: ReactNode }) => (
      <h3 className={headingClass.h3}>{children}</h3>
    ),
    h4: ({ children }: { children?: ReactNode }) => (
      <h4 className={headingClass.h4}>{children}</h4>
    ),
    h5: ({ children }: { children?: ReactNode }) => (
      <h5 className={headingClass.h5}>{children}</h5>
    ),
    h6: ({ children }: { children?: ReactNode }) => (
      <h6 className={headingClass.h5}>{children}</h6>
    ),
    blockquote: ({ children }: { children?: ReactNode }) => (
      <blockquote className="not-prose my-8 border-l-4 border-primary/50 pl-5 text-foreground/80 italic">
        {children}
      </blockquote>
    ),
  },
  types: {
    image: ({ value }: { value: ImageBlockValue }) => {
      if (!value?.asset) return null;

      const src = urlFor(value).width(1600).quality(85).url();
      const alt = value.alt?.trim() ?? "";
      const w = value.dimensions?.width ?? 1200;
      const h = value.dimensions?.height ?? Math.round((w * 2) / 3);

      return (
        <figure className="my-8 not-prose">
          <Image
            src={src}
            alt={alt}
            width={w}
            height={h}
            className="h-auto w-full rounded-xl border border-border/60 bg-muted/30 shadow-sm"
            sizes="(max-width: 768px) 100vw, 48rem"
          />
          {value.caption?.trim() ? (
            <figcaption className="mt-3 text-center text-sm text-muted-foreground">
              {value.caption.trim()}
            </figcaption>
          ) : null}
        </figure>
      );
    },
  },
};
