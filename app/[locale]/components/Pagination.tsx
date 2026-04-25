'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

interface iAppProps {
  totalPages: number;
  currentPage: number;
}

export function Pagination({ totalPages, currentPage }: iAppProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const prevPage = currentPage - 1 > 0;
  const nextPage = currentPage + 1 <= totalPages;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="flex items-center justify-center mt-8 sm:mt-10">
      <div className="flex items-center gap-x-4">
        {prevPage ? (
          <Link
            href={createPageURL(currentPage - 1)}
            className="flex items-center gap-x-2 rounded-md border bg-card px-3 sm:px-4 py-2 text-sm font-medium hover:bg-accent"
          >
            <p>Previous</p>
          </Link>
        ) : (
          <div className="flex items-center gap-x-2 rounded-md border border-gray-300 bg-gray-100 px-3 sm:px-4 py-2 text-sm font-medium text-gray-500 cursor-not-allowed">
            <p>Previous</p>
          </div>
        )}

        <p className="text-sm font-medium">
          Page {currentPage} of {totalPages}
        </p>

        {nextPage ? (
          <Link
            href={createPageURL(currentPage + 1)}
            className="flex items-center gap-x-2 rounded-md border bg-card px-3 sm:px-4 py-2 text-sm font-medium hover:bg-accent"
          >
            <p>Next</p>
          </Link>
        ) : (
          <div className="flex items-center gap-x-2 rounded-md border border-gray-300 bg-gray-100 px-3 sm:px-4 py-2 text-sm font-medium text-gray-500 cursor-not-allowed">
            <p>Next</p>
          </div>
        )}
      </div>
    </div>
  );
}
