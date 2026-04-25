import { ProjectsCard } from "../../lib/interface";
import { X } from 'lucide-react';
import { PortableText } from '@portabletext/react';

interface JobDetailProps {
  job: ProjectsCard;
  onClose: () => void;
}

export function JobDetail({ job, onClose }: JobDetailProps) {
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button
        type="button"
        className="flex-1 cursor-default bg-background/80 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close panel"
      />
      <div className="flex h-full w-full max-w-md flex-col border-l border-border bg-card shadow-2xl">
        <div className="border-b border-border/80 bg-muted/30 px-6 py-5">
          <div className="flex items-start justify-between gap-4">
            <h2 className="text-xl font-semibold leading-snug tracking-tight sm:text-2xl pr-2">
              {job.title}
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="shrink-0 rounded-xl border border-transparent p-2 text-muted-foreground transition-colors hover:border-border hover:bg-background hover:text-foreground"
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </button>
          </div>
        </div>
        <div className="flex-1 space-y-6 overflow-y-auto px-6 py-6">
          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Description
            </h3>
            <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground sm:prose-base prose-headings:font-semibold prose-a:text-primary">
              <PortableText value={job.description} />
            </div>
          </div>
          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {job.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center rounded-full border border-primary/15 bg-primary/[0.07] px-3 py-1 text-[10px] font-normal leading-normal text-primary dark:bg-primary/10 sm:text-[11px]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <a
            href={job.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center rounded-xl bg-primary px-4 py-3 text-base font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Apply now
          </a>
        </div>
      </div>
    </div>
  );
}
