"use client";

import { useState } from "react";

import { portfolioData } from "@/data/portfolio-data";
import { savePortfolioAction } from "@/app/actions/portfolio";
import { signOutAction } from "@/app/auth/actions";
import { clonePortfolioData, usePortfolioData } from "@/lib/portfolio-store";
import type {
  Experience,
  PortfolioData,
  Project,
  Skill,
  SkillCategory,
  SkillLevel,
} from "@/types/portfolio";

const createId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

const createEmptyProject = (): Project => ({
  id: createId(),
  title: "",
  summary: "",
  problem: "",
  stack: [""],
  impact: [""],
  links: [
    { label: "Live Demo", href: "" },
    { label: "Source Code", href: "" },
  ],
});

const createEmptyExperience = (): Experience => ({
  id: createId(),
  company: "",
  role: "",
  location: "",
  startDate: "",
  endDate: "",
  summary: "",
  achievements: [""],
});

const createEmptySkill = (): Skill => ({
  id: createId(),
  name: "",
  category: "Languages",
  level: "Proficient",
});

export default function AdminPage() {
  const { portfolio, setPortfolio, ready, dirty, markSaved } = usePortfolioData();
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [saveError, setSaveError] = useState(false);

  const persistPortfolio = async (nextPortfolio: PortfolioData) => {
    setIsSaving(true);
    setSaveMessage("");
    setSaveError(false);
    try {
      const result = await savePortfolioAction(nextPortfolio);
      if ("error" in result) {
        setSaveMessage(result.error);
        setSaveError(true);
        return;
      }
      markSaved();
      setSaveMessage("Portfolio saved.");
    } catch {
      setSaveMessage("The portfolio could not be saved. Try again.");
      setSaveError(true);
    } finally {
      setIsSaving(false);
    }
  };

  const updateProfile = <K extends keyof PortfolioData["profile"]>(key: K, value: PortfolioData["profile"][K]) => {
    setPortfolio((current) => ({
      ...current,
      profile: { ...current.profile, [key]: value },
    }));
  };

  const updateProject = (projectId: string, patch: Partial<Project>) => {
    setPortfolio((current) => ({
      ...current,
      projects: current.projects.map((project) =>
        project.id === projectId ? { ...project, ...patch } : project,
      ),
    }));
  };

  const addProject = () => {
    setPortfolio((current) => ({
      ...current,
      projects: [...current.projects, createEmptyProject()],
    }));
  };

  const removeProject = (projectId: string) => {
    setPortfolio((current) => ({
      ...current,
      projects: current.projects.filter((project) => project.id !== projectId),
    }));
  };

  const updateExperience = (experienceId: string, patch: Partial<Experience>) => {
    setPortfolio((current) => ({
      ...current,
      experience: current.experience.map((entry) =>
        entry.id === experienceId ? { ...entry, ...patch } : entry,
      ),
    }));
  };

  const addExperience = () => {
    setPortfolio((current) => ({
      ...current,
      experience: [...current.experience, createEmptyExperience()],
    }));
  };

  const removeExperience = (experienceId: string) => {
    setPortfolio((current) => ({
      ...current,
      experience: current.experience.filter((entry) => entry.id !== experienceId),
    }));
  };

  const updateSkill = (skillIndex: number, patch: Partial<Skill>) => {
    setPortfolio((current) => ({
      ...current,
      skills: current.skills.map((skill, index) =>
        index === skillIndex ? { ...skill, ...patch } : skill,
      ),
    }));
  };

  const addSkill = () => {
    setPortfolio((current) => ({
      ...current,
      skills: [...current.skills, createEmptySkill()],
    }));
  };

  const removeSkill = (skillIndex: number) => {
    setPortfolio((current) => ({
      ...current,
      skills: current.skills.filter((_, index) => index !== skillIndex),
    }));
  };

  const saveToFile = () => {
    const blob = new Blob([JSON.stringify(portfolio, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "portfolio-data.json";
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const resetPortfolio = () => {
    if (!window.confirm("Reset the saved portfolio to the starter content?")) return;
    const resetData = clonePortfolioData(portfolioData);
    setPortfolio(resetData);
    void persistPortfolio(resetData);
  };

  if (!ready) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-12 text-sm text-muted-foreground sm:px-6 lg:px-8">
        Loading admin editor…
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">Admin</p>
          <h1 className="mt-2 text-4xl font-semibold text-foreground">Portfolio editor</h1>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={saveToFile}
            className="inline-flex h-11 items-center justify-center rounded-full border border-border bg-transparent px-4 text-sm font-medium text-foreground transition-colors hover:bg-muted/50"
          >
            Export JSON
          </button>
          <button
            type="button"
            onClick={() => void persistPortfolio(portfolio)}
            disabled={!dirty || isSaving}
            className="inline-flex h-11 items-center justify-center rounded-full bg-primary px-4 text-sm font-medium text-background transition-opacity hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSaving ? "Saving…" : "Save changes"}
          </button>
          <button
            type="button"
            onClick={resetPortfolio}
            className="inline-flex h-11 items-center justify-center rounded-full border border-border bg-transparent px-4 text-sm font-medium text-foreground transition-colors hover:bg-muted/50"
          >
            Reset data
          </button>
          <form action={signOutAction}>
            <button
              type="submit"
              className="inline-flex h-11 items-center justify-center rounded-full border border-border bg-transparent px-4 text-sm font-medium text-foreground transition-colors hover:bg-muted/50"
            >
              Sign out
            </button>
          </form>
        </div>
      </div>
      {saveMessage && (
        <p className={`mb-6 text-sm ${saveError ? "text-red-600" : "text-muted-foreground"}`} role={saveError ? "alert" : "status"}>
          {saveMessage}
        </p>
      )}

      <section className="mb-10 rounded-3xl border border-border bg-card p-6 shadow-sm">
        <h2 className="mb-5 text-2xl font-semibold text-foreground">Profile</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2 text-sm text-muted-foreground">
            <span>Name</span>
            <input
              value={portfolio.profile.name}
              onChange={(event) => updateProfile("name", event.target.value)}
              className="w-full rounded-xl border border-border bg-background px-3 py-2 text-foreground outline-none ring-0 transition focus:border-foreground"
            />
          </label>
          <label className="space-y-2 text-sm text-muted-foreground">
            <span>Role</span>
            <input
              value={portfolio.profile.role}
              onChange={(event) => updateProfile("role", event.target.value)}
              className="w-full rounded-xl border border-border bg-background px-3 py-2 text-foreground outline-none ring-0 transition focus:border-foreground"
            />
          </label>
          <label className="space-y-2 text-sm text-muted-foreground md:col-span-2">
            <span>Headline</span>
            <input
              value={portfolio.profile.headline}
              onChange={(event) => updateProfile("headline", event.target.value)}
              className="w-full rounded-xl border border-border bg-background px-3 py-2 text-foreground outline-none ring-0 transition focus:border-foreground"
            />
          </label>
          <label className="space-y-2 text-sm text-muted-foreground md:col-span-2">
            <span>Bio</span>
            <textarea
              value={portfolio.profile.bio}
              onChange={(event) => updateProfile("bio", event.target.value)}
              rows={4}
              className="w-full rounded-xl border border-border bg-background px-3 py-2 text-foreground outline-none ring-0 transition focus:border-foreground"
            />
          </label>
          <label className="space-y-2 text-sm text-muted-foreground">
            <span>Location</span>
            <input
              value={portfolio.profile.location}
              onChange={(event) => updateProfile("location", event.target.value)}
              className="w-full rounded-xl border border-border bg-background px-3 py-2 text-foreground outline-none ring-0 transition focus:border-foreground"
            />
          </label>
          <label className="space-y-2 text-sm text-muted-foreground">
            <span>Availability</span>
            <input
              value={portfolio.profile.availability}
              onChange={(event) => updateProfile("availability", event.target.value)}
              className="w-full rounded-xl border border-border bg-background px-3 py-2 text-foreground outline-none ring-0 transition focus:border-foreground"
            />
          </label>
          <label className="space-y-2 text-sm text-muted-foreground">
            <span>Email</span>
            <input
              value={portfolio.profile.email}
              onChange={(event) => updateProfile("email", event.target.value)}
              className="w-full rounded-xl border border-border bg-background px-3 py-2 text-foreground outline-none ring-0 transition focus:border-foreground"
            />
          </label>
          <label className="space-y-2 text-sm text-muted-foreground">
            <span>Resume URL</span>
            <input
              value={portfolio.profile.resumeUrl}
              onChange={(event) => updateProfile("resumeUrl", event.target.value)}
              className="w-full rounded-xl border border-border bg-background px-3 py-2 text-foreground outline-none ring-0 transition focus:border-foreground"
            />
          </label>
        </div>
      </section>

      <section className="mb-10 rounded-3xl border border-border bg-card p-6 shadow-sm">
        <div className="mb-5 flex items-center justify-between gap-4">
          <h2 className="text-2xl font-semibold text-foreground">Projects</h2>
          <button
            type="button"
            onClick={addProject}
            className="inline-flex h-10 items-center justify-center rounded-full border border-border bg-transparent px-4 text-sm font-medium text-foreground transition-colors hover:bg-muted/50"
          >
            Add project
          </button>
        </div>
        <div className="space-y-6">
          {portfolio.projects.map((project, projectIndex) => (
            <div key={project.id} className="rounded-2xl border border-border bg-background p-4">
              <div className="mb-4 flex items-center justify-between gap-3">
                <h3 className="text-lg font-medium text-foreground">Project {projectIndex + 1}</h3>
                <button
                  type="button"
                  onClick={() => removeProject(project.id)}
                  className="text-sm text-red-500 transition-opacity hover:opacity-80"
                >
                  Remove
                </button>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="space-y-2 text-sm text-muted-foreground md:col-span-2">
                  <span>Title</span>
                  <input
                    value={project.title}
                    onChange={(event) => updateProject(project.id, { title: event.target.value })}
                    className="w-full rounded-xl border border-border bg-background px-3 py-2 text-foreground outline-none transition focus:border-foreground"
                  />
                </label>
                <label className="space-y-2 text-sm text-muted-foreground md:col-span-2">
                  <span>Summary</span>
                  <textarea
                    value={project.summary}
                    onChange={(event) => updateProject(project.id, { summary: event.target.value })}
                    rows={3}
                    className="w-full rounded-xl border border-border bg-background px-3 py-2 text-foreground outline-none transition focus:border-foreground"
                  />
                </label>
                <label className="space-y-2 text-sm text-muted-foreground md:col-span-2">
                  <span>Problem</span>
                  <textarea
                    value={project.problem}
                    onChange={(event) => updateProject(project.id, { problem: event.target.value })}
                    rows={3}
                    className="w-full rounded-xl border border-border bg-background px-3 py-2 text-foreground outline-none transition focus:border-foreground"
                  />
                </label>
                <label className="space-y-2 text-sm text-muted-foreground md:col-span-2">
                  <span>Stack (comma separated)</span>
                  <input
                    value={project.stack.join(", ")}
                    onChange={(event) =>
                      updateProject(project.id, {
                        stack: event.target.value
                          .split(",")
                          .map((item) => item.trim())
                          .filter(Boolean),
                      })
                    }
                    className="w-full rounded-xl border border-border bg-background px-3 py-2 text-foreground outline-none transition focus:border-foreground"
                  />
                </label>
                <label className="space-y-2 text-sm text-muted-foreground md:col-span-2">
                  <span>Impact (one item per line)</span>
                  <textarea
                    value={project.impact.join("\n")}
                    onChange={(event) =>
                      updateProject(project.id, {
                        impact: event.target.value.split("\n").map((item) => item.trim()).filter(Boolean),
                      })
                    }
                    rows={4}
                    className="w-full rounded-xl border border-border bg-background px-3 py-2 text-foreground outline-none transition focus:border-foreground"
                  />
                </label>
                {project.links.map((link, linkIndex) => (
                  <div key={`${project.id}-${link.label}`} className="space-y-2 text-sm text-muted-foreground">
                    <span>{link.label}</span>
                    <input
                      value={link.href}
                      onChange={(event) => {
                        const nextLinks = [...project.links];
                        nextLinks[linkIndex] = { ...nextLinks[linkIndex], href: event.target.value };
                        updateProject(project.id, { links: nextLinks });
                      }}
                      className="w-full rounded-xl border border-border bg-background px-3 py-2 text-foreground outline-none transition focus:border-foreground"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10 rounded-3xl border border-border bg-card p-6 shadow-sm">
        <div className="mb-5 flex items-center justify-between gap-4">
          <h2 className="text-2xl font-semibold text-foreground">Experience</h2>
          <button
            type="button"
            onClick={addExperience}
            className="inline-flex h-10 items-center justify-center rounded-full border border-border bg-transparent px-4 text-sm font-medium text-foreground transition-colors hover:bg-muted/50"
          >
            Add experience
          </button>
        </div>
        <div className="space-y-6">
          {portfolio.experience.map((entry, index) => (
            <div key={entry.id} className="rounded-2xl border border-border bg-background p-4">
              <div className="mb-4 flex items-center justify-between gap-3">
                <h3 className="text-lg font-medium text-foreground">Experience {index + 1}</h3>
                <button
                  type="button"
                  onClick={() => removeExperience(entry.id)}
                  className="text-sm text-red-500 transition-opacity hover:opacity-80"
                >
                  Remove
                </button>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="space-y-2 text-sm text-muted-foreground">
                  <span>Company</span>
                  <input
                    value={entry.company}
                    onChange={(event) => updateExperience(entry.id, { company: event.target.value })}
                    className="w-full rounded-xl border border-border bg-background px-3 py-2 text-foreground outline-none transition focus:border-foreground"
                  />
                </label>
                <label className="space-y-2 text-sm text-muted-foreground">
                  <span>Role</span>
                  <input
                    value={entry.role}
                    onChange={(event) => updateExperience(entry.id, { role: event.target.value })}
                    className="w-full rounded-xl border border-border bg-background px-3 py-2 text-foreground outline-none transition focus:border-foreground"
                  />
                </label>
                <label className="space-y-2 text-sm text-muted-foreground">
                  <span>Location</span>
                  <input
                    value={entry.location}
                    onChange={(event) => updateExperience(entry.id, { location: event.target.value })}
                    className="w-full rounded-xl border border-border bg-background px-3 py-2 text-foreground outline-none transition focus:border-foreground"
                  />
                </label>
                <label className="space-y-2 text-sm text-muted-foreground">
                  <span>Dates</span>
                  <input
                    value={`${entry.startDate} – ${entry.endDate}`}
                    onChange={(event) => {
                      const [startDate = "", ...rest] = event.target.value.split("–");
                      updateExperience(entry.id, {
                        startDate: startDate.trim(),
                        endDate: rest.join("–").trim(),
                      });
                    }}
                    className="w-full rounded-xl border border-border bg-background px-3 py-2 text-foreground outline-none transition focus:border-foreground"
                  />
                </label>
                <label className="space-y-2 text-sm text-muted-foreground md:col-span-2">
                  <span>Summary</span>
                  <textarea
                    value={entry.summary}
                    onChange={(event) => updateExperience(entry.id, { summary: event.target.value })}
                    rows={3}
                    className="w-full rounded-xl border border-border bg-background px-3 py-2 text-foreground outline-none transition focus:border-foreground"
                  />
                </label>
                <label className="space-y-2 text-sm text-muted-foreground md:col-span-2">
                  <span>Achievements (one item per line)</span>
                  <textarea
                    value={entry.achievements.join("\n")}
                    onChange={(event) =>
                      updateExperience(entry.id, {
                        achievements: event.target.value
                          .split("\n")
                          .map((item) => item.trim())
                          .filter(Boolean),
                      })
                    }
                    rows={4}
                    className="w-full rounded-xl border border-border bg-background px-3 py-2 text-foreground outline-none transition focus:border-foreground"
                  />
                </label>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-border bg-card p-6 shadow-sm">
        <div className="mb-5 flex items-center justify-between gap-4">
          <h2 className="text-2xl font-semibold text-foreground">Skills</h2>
          <button
            type="button"
            onClick={addSkill}
            className="inline-flex h-10 items-center justify-center rounded-full border border-border bg-transparent px-4 text-sm font-medium text-foreground transition-colors hover:bg-muted/50"
          >
            Add skill
          </button>
        </div>
        <div className="space-y-4">
          {portfolio.skills.map((skill, index) => (
            <div key={`${skill.name}-${index}`} className="grid gap-3 rounded-2xl border border-border bg-background p-4 md:grid-cols-[1.3fr_1fr_1fr_auto]">
              <label className="space-y-2 text-sm text-muted-foreground">
                <span>Name</span>
                <input
                  value={skill.name}
                  onChange={(event) => updateSkill(index, { name: event.target.value })}
                  className="w-full rounded-xl border border-border bg-background px-3 py-2 text-foreground outline-none transition focus:border-foreground"
                />
              </label>
              <label className="space-y-2 text-sm text-muted-foreground">
                <span>Category</span>
                <select
                  value={skill.category}
                  onChange={(event) => updateSkill(index, { category: event.target.value as SkillCategory })}
                  className="w-full rounded-xl border border-border bg-background px-3 py-2 text-foreground outline-none transition focus:border-foreground"
                >
                  <option value="Languages">Languages</option>
                  <option value="Frontend">Frontend</option>
                  <option value="Backend & Databases">Backend & Databases</option>
                  <option value="DevOps & Cloud">DevOps & Cloud</option>
                  <option value="Tools & Testing">Tools & Testing</option>
                </select>
              </label>
              <label className="space-y-2 text-sm text-muted-foreground">
                <span>Level</span>
                <select
                  value={skill.level}
                  onChange={(event) => updateSkill(index, { level: event.target.value as SkillLevel })}
                  className="w-full rounded-xl border border-border bg-background px-3 py-2 text-foreground outline-none transition focus:border-foreground"
                >
                  <option value="Production">Production</option>
                  <option value="Proficient">Proficient</option>
                  <option value="Familiar">Familiar</option>
                </select>
              </label>
              <button
                type="button"
                onClick={() => removeSkill(index)}
                className="self-end rounded-full border border-border bg-transparent px-3 py-2 text-sm text-red-500 transition-colors hover:bg-muted/50"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
