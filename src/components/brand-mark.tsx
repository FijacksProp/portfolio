import Image from "next/image";
import Link from "next/link";

type BrandMarkProps = {
  compact?: boolean;
  linked?: boolean;
};

export function BrandMark({ compact = false, linked = true }: BrandMarkProps) {
  const content = (
    <span className="brand-lockup">
      <Image
        src="/fp-mark.png"
        width={240}
        height={180}
        sizes="56px"
        className="brand-stamp"
        alt=""
        priority
      />
      {!compact && (
        <span className="brand-copy">
          <strong>Joshua Olugbemi</strong>
          <small>Full-stack software engineer</small>
        </span>
      )}
    </span>
  );

  if (!linked) return content;

  return (
    <Link href="/" aria-label="Joshua Olugbemi — home" className="brand-link">
      {content}
    </Link>
  );
}
