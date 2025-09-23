export const metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl py-12 md:py-16 space-y-6">
      <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">About</h1>
      <p className="text-muted-foreground leading-7">
        I&apos;m Drew, a full‑stack engineer focused on building fast, reliable, and
        minimal experiences. I love TypeScript, Next.js, and cloud‑native
        tooling that helps ideas ship quickly.
      </p>
      <p className="text-muted-foreground leading-7">
        My work spans developer tooling, performance tuning, and clean UI
        systems. I care about DX, accessibility, and thoughtful details.
      </p>
    </div>
  );
}
