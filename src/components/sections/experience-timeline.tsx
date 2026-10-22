import Image from "next/image";
import type { Experience } from "@/types/portfolio";
import { Badge } from "@/components/ui/badge";

export function ExperienceTimeline({ experience }: { experience: Experience[] }) {
  return (
    <div className="relative">
      {/* Central timeline line - visible on desktop, hidden on mobile */}
      <div className="absolute left-[19px] top-6 bottom-6 w-px bg-border sm:left-1/2 sm:-translate-x-1/2 no-print" />
      
      <div className="space-y-10 sm:space-y-16">
        {experience.map((item, index) => {
          const isEven = index % 2 === 0;
          return (
            <div key={item.id} className="relative flex flex-col sm:flex-row group page-break-inside-avoid">
              
              {/* Timeline dot */}
              <div className="absolute left-[16px] sm:left-1/2 top-6 h-2.5 w-2.5 -translate-x-1/2 rounded-full border-2 border-background bg-primary z-10 transition-colors group-hover:bg-emerald-500 no-print" />
              
              {/* Content card */}
              <div className={`ml-10 sm:ml-0 flex w-full flex-col sm:w-1/2 ${isEven ? 'sm:pr-12 sm:items-end' : 'sm:pl-12 sm:ml-auto sm:items-start'}`}>
                
                <div className="rounded-2xl border border-border bg-card p-6 shadow-xs transition-shadow hover:shadow-md w-full">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground tracking-tight">{item.role}</h3>
                      <p className="text-sm font-medium text-muted-foreground">{item.company}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Badge variant="muted" className="text-xs">
                        {item.startDate} – {item.endDate}
                      </Badge>
                    </div>
                  </div>

                  <p className="mb-4 text-xs leading-relaxed text-muted-foreground">
                    {item.summary}
                  </p>

                  <ul className="space-y-2 text-xs text-foreground/90 leading-relaxed">
                    {item.achievements.map((achievement, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent no-print" />
                        <span className="print:list-item print:ml-4">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
