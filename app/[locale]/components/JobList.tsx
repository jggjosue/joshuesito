'use client';

import { useState } from 'react';
import { ProjectsCard } from '../../lib/interface';
import { JobDetail } from './JobDetail';
import { Pagination } from './Pagination';
import { ArrowUpRight, Briefcase } from 'lucide-react';
import { cn } from '@/lib/utils';

interface JobListProps {
  jobs: ProjectsCard[];
  totalPages: number;
  currentPage: number;
}

export function JobList({ jobs, totalPages, currentPage }: JobListProps) {
  const [selectedJob, setSelectedJob] = useState<ProjectsCard | null>(null);

  const handleSelectJob = (job: ProjectsCard) => {
    setSelectedJob(job);
  };

  const handleCloseDetail = () => {
    setSelectedJob(null);
  };

  if (jobs.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border/80 bg-muted/20 px-8 py-16 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Briefcase className="h-7 w-7" />
        </div>
        <p className="mt-5 text-lg font-medium tracking-tight">No jobs match your search</p>
        <p className="mt-2 max-w-sm mx-auto text-sm text-muted-foreground">
          Try another keyword or clear the search to see all listings.
        </p>
      </div>
    );
  }

  return (
    <div>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        {jobs.map((item) => (
          <li key={item._id} className="min-w-0 h-full">
            <button
              type="button"
              onClick={() => handleSelectJob(item)}
              className={cn(
                'group relative flex h-full w-full flex-col text-left',
                'rounded-2xl border border-border/70 bg-card p-5 shadow-sm transition-all duration-200',
                'hover:border-primary/25 hover:shadow-md hover:-translate-y-0.5',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                'dark:border-border/50 dark:hover:border-primary/35'
              )}
            >
              <div className="flex gap-3">
                <div
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary/15"
                  aria-hidden
                >
                  <Briefcase className="h-5 w-5" />
                </div>
                <h2 className="min-w-0 flex-1 text-base font-semibold leading-snug tracking-tight text-foreground transition-colors group-hover:text-primary line-clamp-3">
                  {item.title}
                </h2>
              </div>
              <div className="mt-3 flex flex-1 flex-wrap content-start gap-2 sm:gap-2.5">
                {item.tags.map((tagItem, index) => (
                  <span
                    className="inline-flex max-w-full items-center truncate rounded-full border border-primary/15 bg-primary/[0.07] px-3 py-1 text-[10px] font-normal leading-normal text-primary dark:bg-primary/10 dark:border-primary/25 sm:text-[11px]"
                    key={index}
                    title={tagItem}
                  >
                    {tagItem}
                  </span>
                ))}
              </div>
              <div className="mt-auto w-full pt-4">
                <div
                  className={cn(
                    'flex w-full items-center justify-center gap-1.5',
                    'rounded-xl border border-primary/20 bg-primary/[0.06] px-3 py-2.5 text-sm font-semibold text-primary',
                    'transition-colors duration-200',
                    'group-hover:border-primary/40 group-hover:bg-primary group-hover:text-primary-foreground',
                  )}
                >
                  View role
                  <ArrowUpRight className="h-4 w-4 shrink-0 opacity-80 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </button>
          </li>
        ))}
      </ul>
      {totalPages > 0 ? (
        <Pagination totalPages={totalPages} currentPage={currentPage} />
      ) : null}

      {selectedJob && (
        <JobDetail job={selectedJob} onClose={handleCloseDetail} />
      )}
    </div>
  );
}
