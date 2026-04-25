'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { Search } from 'lucide-react';

export function SearchForm() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="relative w-full">
      <label htmlFor="search" className="sr-only">
        Search jobs
      </label>
      <div
        className="group flex h-12 md:h-14 items-center gap-3 rounded-2xl border border-border/80 bg-muted/30 px-4 shadow-sm transition-[box-shadow,border-color,background-color] duration-200 hover:bg-muted/50 hover:border-border focus-within:border-primary/40 focus-within:bg-background focus-within:shadow-md focus-within:ring-2 focus-within:ring-ring/30 dark:bg-muted/20 dark:hover:bg-muted/30"
      >
        <Search className="h-5 w-5 shrink-0 text-muted-foreground transition-colors group-focus-within:text-primary" />
        <input
          id="search"
          className="flex-1 bg-transparent py-2 text-base outline-none placeholder:text-muted-foreground/70 md:text-[15px]"
          placeholder="Search for jobs..."
          autoComplete="off"
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
          defaultValue={searchParams.get('query')?.toString()}
        />
      </div>
    </div>
  );
}
