import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, ResponsiveContainer, LabelList } from 'recharts'
import sectorComparison from '../data/sector_comparison.json'

const COLOR_BY_SECTOR: Record<string, string> = {
  'Refined petroleum': '#1B2A4A',
  'Automobiles': '#D9822B',
  'Rice/agriculture': '#3F7A5E',
}

export default function SectorComparisonChart() {
  const data = sectorComparison.map((d) => ({
    sector: d.sector,
    tariff: d.effective_tariff_2025_pct,
    label: d.effective_tariff_label,
  }))

  return (
    <section className="px-6 md:px-16 py-16 md:py-20 bg-lightgray">
      <div className="max-w-6xl mx-auto">
        <p className="text-orange font-semibold tracking-widest text-sm mb-3">SYNTHESIS</p>
        <h2 className="text-2xl md:text-3xl font-bold text-navy mb-2 max-w-4xl">
          Tariff level runs inversely to substitution outcome across all 3 sectors
        </h2>
        <p className="text-slate-600 mb-8">
          Rice carries the heaviest tariff wall. Petroleum has almost none, and policy relies on other tools instead.
        </p>
        <div className="bg-white rounded-xl p-6 shadow-sm" style={{ height: 380 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 30, right: 30, left: 0, bottom: 10 }}>
              <CartesianGrid stroke="#E2E5EA" vertical={false} />
              <XAxis dataKey="sector" tick={{ fill: '#8C96A3', fontSize: 13 }} axisLine={{ stroke: '#D6DAE0' }} tickLine={false} />
              <YAxis tick={{ fill: '#8C96A3', fontSize: 12 }} axisLine={false} tickLine={false} label={{ value: 'Effective tariff (%)', angle: -90, position: 'insideLeft', fill: '#8C96A3', fontSize: 12 }} />
              <Tooltip formatter={(v) => `${v}%`} />
              <Bar dataKey="tariff" radius={[4, 4, 0, 0]}>
                {data.map((d) => (
                  <Cell key={d.sector} fill={COLOR_BY_SECTOR[d.sector]} />
                ))}
                <LabelList dataKey="label" position="top" fill="#1B2A4A" fontSize={14} fontWeight="bold" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="text-xs text-slate-400 mt-3">
          Source: see data/raw/&#123;petroleum,automobiles,rice&#125;/sources.md for underlying citations
        </p>
      </div>
    </section>
  )
}
