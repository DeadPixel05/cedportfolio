import Image from "next/image";
import type { Experience } from "@/types/portfolio";

export function ExperienceTimeline({ experience }: { experience: Experience[] }) {
  return (
    <div className="relative">
      {/* Central timeline line - visible on desktop, hidden on mobile */}
      <div className="absolute left-[27px] top-4 bottom-4 w-px bg-border sm:left-1/2 sm:-translate-x-1/2 no-print" />
      
      <div className="space-y-12 sm:space-y-24">
        {experience.map((item, index) => {
          const isEven = index % 2 === 0;
          return (
            <div key={item.id} className="relative flex flex-col sm:flex-row group page-break-inside-avoid">
              
              {/* Timeline dot */}
              <div className="absolute left-[24px] sm:left-1/2 top-6 h-2 w-2 -translate-x-1/2 rounded-full border border-background bg-primary ring-4 ring-background z-10 transition-colors group-hover:bg-emerald-500 no-print" />
              
              {/* Content area */}
              <div className={`ml-16 sm:ml-0 flex w-full flex-col sm:w-1/2 ${isEven ? 'sm:pr-16 sm:text-right sm:items-end' : 'sm:pl-16 sm:ml-auto sm:items-start'}`}>
                
                <div className={`flex items-center gap-4 mb-4 ${isEven ? 'sm:flex-row-reverse' : 'flex-row'}`}>
                  {item.logoUrl && (
                    <div className="h-12 w-12 shrink-0 rounded-xl border border-border bg-card p-2 shadow-sm">
                      <Image
                        src={item.logoUrl}
                        alt=""
                        width={40}
                        height={40}
                        unoptimized
                        className="h-full w-full object-contain"
                      />
                    </div>
                  )}
                  <div className={`flex flex-col ${isEven ? 'sm:items-end' : 'items-start'}`}>
                    <h3 className="text-xl font-semibold text-foreground tracking-tight">{item.role}</h3>
                    <p className="text-sm font-medium text-muted-foreground">{item.company}</p>
                  </div>
                </div>

                <div className={`mb-4 flex flex-wrap gap-x-2 text-xs text-muted-foreground font-mono ${isEven ? 'sm:justify-end' : 'justify-start'}`}>
                  <span>{item.startDate} – {item.endDate}</span>
                  <span className="opacity-50">•</span>
                  <span>{item.location}</span>
                </div>

                <p className={`mb-6 text-sm leading-relaxed text-muted-foreground ${isEven ? 'sm:text-right' : 'text-left'}`}>
                  {item.summary}
                </p>

                <ul className={`space-y-3 text-sm text-foreground/90 leading-relaxed ${isEven ? 'sm:text-right' : 'text-left'}`}>
                  {item.achievements.map((achievement, idx) => {
                    // Extracting X-Y-Z parts if they exist (simplistic styling)
                    // If the text contains " measured by ", we can highlight the metric.
                    const parts = achievement.split(/ measured by | by doing /i);
                    return (
                      <li key={idx} className={`flex gap-3 ${isEven ? 'sm:flex-row-reverse' : 'flex-row'}`}>
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary/30 no-print" />
                        <span className="print:list-item print:ml-4">{achievement}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
