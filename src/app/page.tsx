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

        <section id="projects" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">Projects</p>
              <h2 className="mt-2 text-3xl font-semibold text-foreground">Selected work</h2>
            </div>
            <Badge variant="muted">Built with product and engineering focus</Badge>
          </div>

          <div className="flex flex-col gap-16">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>

        <section id="experience" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">Experience</p>
            <h2 className="mt-2 text-3xl font-semibold text-foreground">Career timeline</h2>
          </div>
          <ExperienceTimeline experience={experience} />
        </section>

        <section id="skills" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">Skills</p>
            <h2 className="mt-2 text-3xl font-semibold text-foreground">Capabilities</h2>
          </div>

          <div className="space-y-8">
            {categoryOrder.map((category) => {
              const categorySkills = skills.filter((skill) => skill.category === category);

              if (categorySkills.length === 0) return null;

              return (
                <div key={category}>
                  <h3 className="mb-4 text-lg font-semibold text-foreground">{category}</h3>
                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
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
