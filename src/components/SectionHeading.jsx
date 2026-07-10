/**
 * One heading treatment for every section.
 *
 * Deliberately omits the three things the old sections shared: a tiny uppercase
 * tracked eyebrow, gradient-clipped heading text, and a little gradient rule
 * underneath. Each is an AI tell, and repeating them section after section is
 * what made the page read as scaffolding rather than design.
 *
 * Hierarchy comes from scale and weight instead.
 */
export default function SectionHeading({ title, lede, align = 'left' }) {
  const centered = align === 'center';

  return (
    <div className={centered ? 'mb-16 text-center' : 'mb-16 max-w-3xl'}>
      <h2 className="text-4xl font-extrabold leading-[0.98] tracking-[-0.03em] text-ink md:text-6xl">
        {title}
      </h2>
      {lede && (
        <p className={`lede mt-6 text-muted ${centered ? 'mx-auto' : ''}`}>{lede}</p>
      )}
    </div>
  );
}
