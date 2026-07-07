import sectorComparison from '../data/sector_comparison.json'

export default function SectorTable() {
  return (
    <section className="px-6 md:px-16 py-16 md:py-20 max-w-6xl mx-auto">
      <p className="text-orange font-semibold tracking-widest text-sm mb-3">SECTOR COMPARISON</p>
      <h2 className="text-2xl md:text-3xl font-bold text-navy mb-8 max-w-4xl">
        Three different policy tools, three different results
      </h2>
      <div className="overflow-x-auto rounded-xl shadow-sm">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-navy text-white">
              <th className="text-left font-semibold px-4 py-3">Sector</th>
              <th className="text-left font-semibold px-4 py-3">Effective tariff (2025)</th>
              <th className="text-left font-semibold px-4 py-3">Primary policy tool</th>
              <th className="text-left font-semibold px-4 py-3">Outcome</th>
            </tr>
          </thead>
          <tbody>
            {sectorComparison.map((row, i) => (
              <tr key={row.sector} className={i % 2 === 0 ? 'bg-white' : 'bg-lightgray'}>
                <td className="px-4 py-4 font-bold text-navy align-top">{row.sector}</td>
                <td className="px-4 py-4 align-top whitespace-nowrap">{row.effective_tariff_label}</td>
                <td className="px-4 py-4 align-top text-slate-600">{row.primary_policy_tool}</td>
                <td className="px-4 py-4 align-top text-slate-600">{row.outcome_summary}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-slate-400 mt-3">
        Full sourcing: data/raw/&#123;petroleum,automobiles,rice&#125;/sources.md
      </p>
    </section>
  )
}
