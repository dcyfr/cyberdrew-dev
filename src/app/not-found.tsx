import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl py-20 text-center">
      <h1 className="text-3xl font-semibold tracking-tight">Page not found</h1>
      <p className="text-muted-foreground mt-2">The page you&apos;re looking for doesn&apos;t exist.</p>
      <div className="mt-6">
        <Link href="/" className="underline underline-offset-4">Go home</Link>
      </div>
    </div>
  );
}
