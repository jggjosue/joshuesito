import { fullBlog } from "@/app/lib/interface";
import { blogPortableTextComponents } from "@/app/lib/blogPortableText";
import { blogContentWithImagesBeforeIntro } from "@/app/lib/reorderBlogContent";
import { client, urlFor } from "@/app/lib/sanity";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { unstable_setRequestLocale } from "next-intl/server";

export const revalidate = 30;

async function getData(slug: string) {
  const query = `
    *[_type == "blog" && slug.current == $slug][0] {
      "currentSlug": slug.current,
      title,
      "content": content[]{
        ...,
        _type == "image" => {
          ...,
          "dimensions": asset->metadata.dimensions
        }
      },
      titleImage,
      _createdAt
    }`;

  return client.fetch<fullBlog | null>(query, { slug });
}

export default async function BlogPage({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  unstable_setRequestLocale(params.locale);

  const data = await getData(params.slug);
  if (!data?.title || !data.titleImage) {
    notFound();
  }

  const dateLabel =
    data._createdAt != null
      ? new Intl.DateTimeFormat(params.locale === "es" ? "es" : "en", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }).format(new Date(data._createdAt))
      : null;

  const imageUrl = urlFor(data.titleImage).url();
  const contentOrdered = blogContentWithImagesBeforeIntro(
    data.content,
  ) as fullBlog["content"];

  return (
    <article className="mx-auto w-full max-w-3xl px-4 pb-20 pt-6 md:px-6 md:pb-28 md:pt-10 lg:pt-12">
      <header className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary md:text-sm">
          Blog
        </p>
        <h1 className="mt-4 text-balance text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-[2.5rem] lg:leading-[1.15]">
          {data.title}
        </h1>
        {dateLabel ? (
          <time
            dateTime={data._createdAt}
            className="mt-5 block text-sm text-muted-foreground"
          >
            {dateLabel}
          </time>
        ) : null}
      </header>

      <figure className="mt-10 md:mt-12">
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-border/60 bg-muted shadow-md ring-1 ring-black/5 dark:ring-white/10">
          <Image
            src={imageUrl}
            alt={data.title}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 48rem"
          />
        </div>
      </figure>

      <div
        className={[
          "mx-auto mt-12 max-w-prose md:mt-16",
          "prose prose-lg dark:prose-invert",
          /* Long-form reading: line length, rhythm, softer body color */
          "prose-p:text-foreground/[0.88] prose-p:leading-[1.75] prose-p:mb-6 prose-p:last:mb-0",
          "prose-li:text-foreground/[0.88] prose-li:leading-[1.75] prose-li:my-2 prose-li:pl-1",
          "prose-strong:font-semibold prose-strong:text-foreground",
          "prose-em:text-foreground/90",
          /* Headings: spacing comes from blogPortableText block renderers */
          "prose-headings:text-foreground",
          "prose-a:font-medium prose-a:text-primary prose-a:no-underline prose-a:decoration-primary/40 prose-a:underline-offset-4 hover:prose-a:underline",
          "prose-code:text-foreground prose-code:rounded-md prose-code:bg-muted/80 prose-code:px-1.5 prose-code:py-0.5 prose-code:font-normal prose-code:before:content-none prose-code:after:content-none",
          "prose-pre:bg-muted prose-pre:border prose-pre:border-border/60",
          /* Avoid double gap when the first block is a heading */
          "[&_h2:first-child]:mt-0 [&_h3:first-child]:mt-0",
        ].join(" ")}
      >
        <PortableText
          value={contentOrdered}
          components={blogPortableTextComponents}
        />
      </div>
    </article>
  );
}
