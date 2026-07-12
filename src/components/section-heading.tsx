type SectionHeadingProps = {
  number: string;
  label: string;
  title: string;
  description?: string;
  inverse?: boolean;
};

export function SectionHeading({
  number,
  label,
  title,
  description,
  inverse = false,
}: SectionHeadingProps) {
  return (
    <header className={`section-heading ${inverse ? "section-heading-inverse" : ""}`}>
      <div className="section-index">
        <span>{number}</span>
        <span>{label}</span>
      </div>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </header>
  );
}
