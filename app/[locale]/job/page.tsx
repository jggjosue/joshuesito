import { client } from "../../lib/sanity";
import { SearchForm } from "../components/SearchForm";
import { JobList } from "../components/JobList";
import { JobTagFilters } from "../components/JobTagFilters";
import { unstable_setRequestLocale } from 'next-intl/server';

export const dynamic = 'force-dynamic';

const JOBS_PAGE_SIZE = 30;

async function getData(page: number, query: string, tag: string | null) {
  const pageSize = JOBS_PAGE_SIZE;
  const skip = (page - 1) * pageSize;

  const searchQuery = query ? `&& title match "*${query}*"` : "";
  const tagQuery = tag ? `&& $jobTag in tags` : "";

  const groqQuery = `{
    "jobs": *[_type == 'job' ${searchQuery} ${tagQuery}] | order(_createdAt desc) [${skip}...${skip + pageSize}] {
      title,
      _id,
      link,
      description,
      tags,
    },
    "total": count(*[_type == 'job' ${searchQuery} ${tagQuery}]),
    "allTags": array::unique(*[_type == "job"].tags[])
  }`;

  const params: { jobTag?: string } = {};
  if (tag) params.jobTag = tag;

  const data = await client.fetch(groqQuery, params, { next: { revalidate: 30 } });
  return data;
}

function searchParamToString(
  value: string | string[] | undefined,
): string | null {
  if (value == null) return null;
  const s = Array.isArray(value) ? value[0] : value;
  const t = s?.trim();
  return t ? t : null;
}

export default async function BooksPage({ params, searchParams, }: { params: { locale: string }; searchParams: { [key: string]: string | string[] | undefined }; }) {
  unstable_setRequestLocale(params.locale);

  const page = searchParams["page"] ?? "1";
  const query = (searchParams["query"] as string) ?? "";
  const tag = searchParamToString(searchParams["tag"]);
  const pageNumber = Number(page);
  const { jobs, total, allTags } = await getData(pageNumber, query, tag);
  const totalPages = Math.ceil(total / JOBS_PAGE_SIZE);
  const filterTags = (allTags as string[] | null)?.filter(Boolean) ?? [];

  return (
    <section className="relative max-w-7xl w-full px-4 md:px-8 mx-auto pb-16 md:pb-24">
      <div
        className="pointer-events-none absolute inset-x-0 -top-px h-px max-w-3xl mx-auto bg-gradient-to-r from-transparent via-primary/40 to-transparent"
        aria-hidden
      />
      <div className="pt-8 md:pt-12 max-w-2xl">
        <p className="text-sm font-medium text-primary tracking-wide uppercase mb-3">
          Careers
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-foreground lg:text-5xl">
          Jobs
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          Explore new opportunities and work in the world&apos;s leading AI labs.
        </p>
      </div>
      <div className="mt-8 md:mt-10 w-full">
        <SearchForm />
        <JobTagFilters tags={filterTags} />
      </div>
      <div className="mt-10 md:mt-12">
        <JobList jobs={jobs} totalPages={totalPages} currentPage={pageNumber} />
      </div>
    </section>
  );
}
