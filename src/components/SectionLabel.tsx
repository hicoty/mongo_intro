export default function SectionLabel({
  no,
  title,
  en,
}: {
  no: string;
  title: string;
  en: string;
}) {
  return (
    <div className="mb-10 flex items-baseline gap-4 border-b border-ink/15 pb-4 md:mb-14 lg:mb-16">
      <span className="font-latin text-lg italic text-mango">{no}</span>
      <h2 className="font-serif text-2xl font-semibold tracking-[0.2em] md:text-3xl">
        {title}
      </h2>
      <span className="ml-auto hidden font-latin text-sm uppercase tracking-[0.3em] text-ink-soft sm:block">
        {en}
      </span>
    </div>
  );
}
