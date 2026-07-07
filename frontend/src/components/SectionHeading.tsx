export default function SectionHeading({
  eyebrow,
  title,
  color = '#D9822B',
}: {
  eyebrow: string
  title: string
  color?: string
}) {
  return (
    <div className="mb-8">
      <p className="font-semibold tracking-widest text-sm mb-3" style={{ color }}>
        {eyebrow.toUpperCase()}
      </p>
      <h2 className="text-2xl md:text-3xl font-bold text-navy max-w-4xl">{title}</h2>
    </div>
  )
}
