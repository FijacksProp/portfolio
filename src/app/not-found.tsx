import Link from "next/link";

export default function NotFound() {
  return (
    <section className="not-found page-shell">
      <span className="folio-label">404 / Outside the system</span>
      <h1>This route does not resolve.</h1>
      <p>The page may have moved, or the address may be incomplete.</p>
      <Link href="/">Return to the index →</Link>
    </section>
  );
}
