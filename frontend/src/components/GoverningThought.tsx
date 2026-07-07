import sectorComparison from '../data/sector_comparison.json'

const ICONS: Record<string, string> = {
  'Refined petroleum': '⛽',
  'Automobiles': '🚗',
  'Rice/agriculture': '🌾',
}

const COLORS: Record<string, string> = {
  'Refined petroleum': 'bg-navy',
  'Automobiles': 'bg-orange',
  'Rice/agriculture': 'bg-green',
}

export default function GoverningThought() {
  return (
    <section className="px-6 md:px-16 py-16 md:py-20 max-w-6xl mx-auto">
      <p className="text-orange font-semibold tracking-widest text-sm mb-3">
        GOVERNING THOUGHT
      </p>
      <h2 className="text-2xl md:text-3xl font-bold text-navy max-w-4xl mb-12">
        Tariff level does not predict import-substitution outcome — a credible
        domestic supply response does
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        {sectorComparison.map((row) => (
          <div
            key={row.sector}
            className="bg-lightgray rounded-xl p-6 shadow-sm flex flex-col gap-3"
          >
            <div
              className={`${COLORS[row.sector]} w-12 h-12 rounded-full flex items-center justify-center text-2xl`}
            >
              {ICONS[row.sector]}
            </div>
            <h3 className="text-lg font-bold text-navy">{row.sector}</h3>
            <p className="text-2xl font-bold" style={{ color: row.sector === 'Automobiles' ? '#D9822B' : row.sector === 'Rice/agriculture' ? '#3F7A5E' : '#1B2A4A' }}>
              {row.effective_tariff_label} tariff
            </p>
            <p className="text-sm text-slate-600">{row.outcome_summary}</p>
          </div>
        ))}
      </div>
      <p className="mt-10 text-navy italic font-medium border-t border-slate-200 pt-6">
        The variable that predicts outcomes is not the tariff line — it's whether
        a credible domestic supply response exists behind it.
      </p>
    </section>
  )
}
