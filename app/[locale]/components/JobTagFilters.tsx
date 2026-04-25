"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { jobTagLabelEn, sortJobTagsForDisplay } from "@/app/lib/jobTagLabels";
import { cn } from "@/lib/utils";

interface JobTagFiltersProps {
  tags: string[];
}

export function JobTagFilters({ tags }: JobTagFiltersProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const activeTag = searchParams.get("tag")?.trim() ?? "";
  const sorted = sortJobTagsForDisplay(tags);

  if (sorted.length === 0) return null;

  const applyTag = (value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1");
    if (value) {
      params.set("tag", value);
    } else {
      params.delete("tag");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const pillClass = (isActive: boolean) =>
    cn(
      "rounded-full border px-3 py-1 text-[10px] font-normal leading-normal transition-colors sm:text-[11px]",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      isActive
        ? "border-primary bg-primary text-primary-foreground shadow-sm"
        : "border-primary/15 bg-primary/[0.07] text-primary hover:border-primary/25 hover:bg-primary/10 dark:border-primary/25 dark:bg-primary/10",
    );

  return (
    <div className="mt-5 w-full">
      <p className="mb-2 text-[10px] font-medium uppercase tracking-wide text-muted-foreground sm:text-xs">
        Filter by tag
      </p>
      <div className="flex flex-wrap gap-2 sm:gap-2.5">
        <button
          type="button"
          onClick={() => applyTag(null)}
          className={pillClass(!activeTag)}
        >
          All roles
        </button>
        {sorted.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() =>
              applyTag(activeTag === tag ? null : tag)
            }
            className={pillClass(activeTag === tag)}
          >
            {jobTagLabelEn(tag)}
          </button>
        ))}
      </div>
    </div>
  );
}
