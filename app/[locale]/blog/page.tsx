import { Blog } from "@/app/[locale]/components/Blog";
import { Pagination } from "@/app/[locale]/components/Pagination";
import { simpleBlogCard } from "@/app/lib/interface";
import { client } from "@/app/lib/sanity";
import { unstable_setRequestLocale } from "next-intl/server";
import { Suspense } from "react";

export const revalidate = 30;

const BLOG_PAGE_SIZE = 30;

async function getBlogPage(requestedPage: number) {
  const total = await client.fetch<number>(
    `count(*[_type == "blog"])`,
    {},
    { next: { revalidate: 30 } },
  );

  const totalPages = Math.ceil(total / BLOG_PAGE_SIZE);
  const page =
    totalPages > 0
      ? Math.min(Math.max(1, requestedPage), totalPages)
      : 1;
  const skip = (page - 1) * BLOG_PAGE_SIZE;

  const posts = await client.fetch<simpleBlogCard[]>(
    `*[_type == 'blog'] | order(_createdAt desc) [${skip}...${skip + BLOG_PAGE_SIZE}] {
      title,
      smallDescription,
      "currentSlug": slug.current,
      titleImage
    }`,
    {},
    { next: { revalidate: 30 } },
  );

  return { posts, totalPages, page };
}

function PaginationFallback() {
  return (
    <div className="mt-8 flex h-10 items-center justify-center sm:mt-10">
      <p className="text-sm text-muted-foreground">…</p>
    </div>
  );
}

export default async function BlogIndexPage({
  params,
  searchParams,
}: {
  params: { locale: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  unstable_setRequestLocale(params.locale);

  const pageRaw = searchParams["page"] ?? "1";
  const requestedPage = Math.max(1, Number(pageRaw) || 1);

  const { posts, totalPages, page: pageNumber } =
    await getBlogPage(requestedPage);

  return (
    <section className="mx-auto w-full max-w-7xl px-4 pb-12 md:px-8">
      <h1 className="pt-5 text-4xl font-semibold lg:text-5xl">Blog</h1>
      <p className="mt-2 leading-7 text-muted-foreground">
        Artículos y notas sobre tecnología, proyectos y aprendizajes.
      </p>
      <Blog posts={posts} />
      {totalPages > 0 ? (
        <Suspense fallback={<PaginationFallback />}>
          <Pagination
            totalPages={totalPages}
            currentPage={pageNumber}
          />
        </Suspense>
      ) : null}
    </section>
  );
}
