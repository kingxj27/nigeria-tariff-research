const ITEMS = [
  {
    icon: '📈',
    title: "Don't read tariff schedules as a proxy for policy seriousness",
    body: 'The sector with almost no tariff is undergoing the most real structural change; the sector with the highest tariff has the weakest enforcement outcome.',
  },
  {
    icon: '💡',
    title: 'Look for a scaled domestic supply response as the leading indicator',
    body: 'A single, well-capitalized asset (Dangote) displaced more imports in 18 months than a decade of auto tariffs achieved for local assembly.',
  },
  {
    icon: '⚖️',
    title: 'Treat AfCFTA as immature, not decisive, through 2025-2026',
    body: "The schedule was only gazetted in 2025. Nigeria's unilateral tools remain the dominant lever for sector-level forecasting on this horizon.",
  },
]

export default function Implications() {
  return (
    <section className="px-6 md:px-16 py-16 md:py-20 bg-navy text-white">
      <div className="max-w-6xl mx-auto">
        <p className="text-orange font-semibold tracking-widest text-sm mb-3">IMPLICATIONS</p>
        <h2 className="text-2xl md:text-3xl font-bold mb-12">Three takeaways for reading Nigeria as a market</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {ITEMS.map((item) => (
            <div key={item.title} className="flex flex-col gap-3">
              <div className="w-12 h-12 rounded-full bg-orange flex items-center justify-center text-2xl">
                {item.icon}
              </div>
              <h3 className="font-bold text-lg">{item.title}</h3>
              <p className="text-slate-300 text-sm">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
