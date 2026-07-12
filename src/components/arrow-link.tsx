import Link from "next/link";

type ArrowLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  download?: boolean;
  external?: boolean;
};

export function ArrowLink({
  href,
  children,
  className = "",
  download = false,
  external = false,
}: ArrowLinkProps) {
  const classes = `arrow-link ${className}`.trim();
  const content = (
    <>
      <span>{children}</span>
      <svg aria-hidden="true" viewBox="0 0 20 20" width="18" height="18">
        <path d="M3 10h13M11 5l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    </>
  );

  if (external || download) {
    return (
      <a href={href} className={classes} download={download || undefined}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
