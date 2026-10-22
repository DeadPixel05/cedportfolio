export function Footer() {
  return (
    <footer className="border-t border-border overflow-hidden pt-12 pb-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-xs text-muted-foreground pb-8">
          <p>© 2026 Cedric. All rights reserved.</p>
          <p>Built with Next.js, React 19 & Tailwind CSS</p>
        </div>
        <div className="pt-4 border-t border-border/40 select-none">
          <span className="block text-[12vw] font-bold tracking-tighter leading-none text-foreground/5 dark:text-foreground/5 text-center">
            CEDRIC
          </span>
        </div>
      </div>
    </footer>
  );
}
