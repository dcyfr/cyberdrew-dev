export function SiteFooter() {
  return (
    <footer className="border-t mt-16">
      <div className="mx-auto max-w-5xl px-6 md:px-8 h-16 flex items-center justify-between text-sm">
        <p className="text-muted-foreground">© {new Date().getFullYear()} CyberDrew</p>
        <div className="flex items-center gap-4">
          <a href="/sitemap.xml" className="hover:underline underline-offset-4">
            Sitemap
          </a>
          <a href="/robots.txt" className="hover:underline underline-offset-4">
            Robots
          </a>
        </div>
      </div>
    </footer>
  );
}
