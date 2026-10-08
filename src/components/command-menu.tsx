"use client";

import * as React from "react";
import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import { Search, Folder, User, Mail, FileText } from "lucide-react";

export function CommandMenu() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] sm:pt-[20vh]">
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setOpen(false)} />
      
      <Command
        className="relative z-50 flex w-full max-w-[600px] flex-col overflow-hidden rounded-xl border border-border bg-card shadow-2xl"
        onKeyDown={(e) => {
          if (e.key === "Escape") setOpen(false);
        }}
      >
        <div className="flex items-center border-b border-border px-3">
          <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
          <Command.Input
            autoFocus
            className="flex h-12 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Type a command or search..."
          />
        </div>
        <Command.List className="max-h-[300px] overflow-y-auto overflow-x-hidden p-2">
          <Command.Empty className="py-6 text-center text-sm">No results found.</Command.Empty>
          
          <Command.Group heading="Navigation" className="text-xs font-medium text-muted-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5">
            <Command.Item
              onSelect={() => runCommand(() => router.push("#projects"))}
              className="relative flex cursor-pointer select-none items-center rounded-md px-2 py-2.5 text-sm outline-none aria-selected:bg-muted aria-selected:text-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
            >
              <Folder className="mr-2 h-4 w-4" />
              Projects
            </Command.Item>
            <Command.Item
              onSelect={() => runCommand(() => router.push("#experience"))}
              className="relative flex cursor-pointer select-none items-center rounded-md px-2 py-2.5 text-sm outline-none aria-selected:bg-muted aria-selected:text-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
            >
              <User className="mr-2 h-4 w-4" />
              Experience
            </Command.Item>
            <Command.Item
              onSelect={() => runCommand(() => router.push("#skills"))}
              className="relative flex cursor-pointer select-none items-center rounded-md px-2 py-2.5 text-sm outline-none aria-selected:bg-muted aria-selected:text-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
            >
              <Search className="mr-2 h-4 w-4" />
              Skills
            </Command.Item>
          </Command.Group>
          
          <Command.Group heading="Actions" className="text-xs font-medium text-muted-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 mt-2">
            <Command.Item
              onSelect={() => runCommand(() => window.open("/resume.pdf", "_blank"))}
              className="relative flex cursor-pointer select-none items-center rounded-md px-2 py-2.5 text-sm outline-none aria-selected:bg-muted aria-selected:text-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
            >
              <FileText className="mr-2 h-4 w-4" />
              Download Resume
            </Command.Item>
            <Command.Item
              onSelect={() => runCommand(() => window.location.href = "mailto:hello@example.com")}
              className="relative flex cursor-pointer select-none items-center rounded-md px-2 py-2.5 text-sm outline-none aria-selected:bg-muted aria-selected:text-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
            >
              <Mail className="mr-2 h-4 w-4" />
              Contact Me
            </Command.Item>
            <Command.Item
              onSelect={() => runCommand(() => window.print())}
              className="relative flex cursor-pointer select-none items-center rounded-md px-2 py-2.5 text-sm outline-none aria-selected:bg-muted aria-selected:text-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
            >
              <FileText className="mr-2 h-4 w-4" />
              Print Resume (Print View)
            </Command.Item>
          </Command.Group>
        </Command.List>
      </Command>
    </div>
  );
}
