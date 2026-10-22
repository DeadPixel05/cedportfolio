import { Contact } from "@/components/sections/contact";
import { ExperienceTimeline } from "@/components/sections/experience-timeline";
import { Footer } from "@/components/sections/footer";
import { Hero } from "@/components/sections/hero";
import { Navbar } from "@/components/sections/navbar";
import { ProjectCard } from "@/components/sections/project-card";
import { SkillBadge } from "@/components/sections/skill-badge";
import { Badge } from "@/components/ui/badge";
import { getPortfolioData } from "@/lib/portfolio-data";

const categoryOrder = [
  "Languages",
  "Frontend",
  "Backend & Databases",
  "DevOps & Cloud",
  "Tools & Testing",
] as const;

export const dynamic = "force-dynamic";

export default async function Home() {
  const portfolio = await getPortfolioData();
  const { profile, projects, experience, skills } = portfolio;

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero profile={profile} />

        <section id="projects" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4 border-b border-border pb-6">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">Selected Engineering Work</h2>
              <p className="mt-1 text-sm text-muted-foreground">Architectural deep-dives and production metrics across full-stack applications</p>
            </div>
            <Badge variant="glow" className="text-xs py-1">Featured Case Studies</Badge>
          </div>

          <div className="grid gap-12">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>

        <section id="experience" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-10 border-b border-border pb-6">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">Career & Experience Timeline</h2>
            <p className="mt-1 text-sm text-muted-foreground">Proven track record of building, scaling, and maintaining software systems</p>
          </div>
          <ExperienceTimeline experience={experience} />
        </section>

        <section id="skills" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-10 border-b border-border pb-6">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">Technical Competencies</h2>
            <p className="mt-1 text-sm text-muted-foreground">Core languages, frameworks, infrastructure, and engineering tooling</p>
          </div>

          <div className="space-y-8">
            {categoryOrder.map((category) => {
              const categorySkills = skills.filter((skill) => skill.category === category);

              if (categorySkills.length === 0) return null;

              return (
                <div key={category}>
                  <h3 className="mb-3 text-sm font-semibold text-muted-foreground uppercase tracking-wider">{category}</h3>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {categorySkills.map((skill) => (
                      <SkillBadge key={skill.name} skill={skill} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <Contact profile={profile} />
      </main>
      <Footer />
    </>
  );
}
