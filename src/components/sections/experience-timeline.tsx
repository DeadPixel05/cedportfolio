import Image from "next/image";

import type { Experience } from "@/types/portfolio";

export function ExperienceTimeline({ experience }: { experience: Experience[] }) {
  return (
    <ol className="relative ml-4 space-y-8 border-l border-border pl-8 before:absolute before:left-[-1px] before:top-0 before:h-full before:w-px before:bg-border">
      {experience.map((item) => (
        <li key={item.id} className="relative">
          <span className="absolute -left-[2.3rem] top-1 flex h-4 w-4 items-center justify-center rounded-full border-4 border-background bg-primary" />
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
              <div className="flex items-center gap-3">
                {item.logoUrl && (
                  <Image
                    src={item.logoUrl}
                    alt=""
                    width={48}
                    height={48}
                    unoptimized
                    className="h-12 w-12 shrink-0 rounded-lg border border-border bg-background object-contain p-1"
                  />
                )}
                <div>
                  <p className="text-sm font-medium uppercase tracking-[0.14em] text-muted-foreground">{item.company}</p>
                  <h3 className="mt-2 text-xl font-semibold text-foreground">{item.role}</h3>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                {item.startDate} – {item.endDate}
              </div>
            </div>

            <p className="mt-2 text-sm text-muted-foreground">{item.location}</p>
            <p className="mt-4 text-base leading-7 text-muted-foreground">{item.summary}</p>

            <ul className="mt-5 list-disc space-y-2 pl-5 text-sm leading-6 text-foreground">
              {item.achievements.map((achievement) => (
                <li key={achievement}>{achievement}</li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ol>
  );
}
