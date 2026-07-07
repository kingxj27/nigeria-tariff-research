import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import SectionHeading from './SectionHeading'
import production from '../data/rice_production.json'
import imports from '../data/rice_imports.json'

export default function RiceSection() {
  const prod = production.filter((d) => d.source_series === 'USDA_FAS')
  const labels = ['2022/23', '2023/24', '2024/25 (forecast)']
  const data = prod.map((p, i) => ({
    year: labels[i],
    production: p.milled_mmt,
    imports: imports[i]?.import_mmt ?? null,
  }))

  return (
    <section className="px-6 md:px-16 py-16 md:py-20 max-w-6xl mx-auto">
      <SectionHeading eyebrow="Case III · Rice / agriculture" title="The heaviest tariff, and the most persistent leakage" color="#3F7A5E" />
      <div className="grid md:grid-cols-3 gap-8 items-start">
        <div className="md:col-span-2 bg-lightgray rounded-xl p-6" style={{ height: 340 }}>
          <ResponsiveContainer width="100%" height="90%">
            <BarChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid stroke="#E2E5EA" vertical={false} />
              <XAxis dataKey="year" tick={{ fill: '#8C96A3', fontSize: 12 }} axisLine={{ stroke: '#D6DAE0' }} tickLine={false} />
              <YAxis tick={{ fill: '#8C96A3', fontSize: 12 }} axisLine={false} tickLine={false} label={{ value: 'Million metric tons', angle: -90, position: 'insideLeft', fill: '#8C96A3', fontSize: 12 }} />
              <Tooltip formatter={(v: number) => `${v} MMT`} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="production" name="Domestic milled production" fill="#1B2A4A" radius={[4, 4, 0, 0]} />
              <Bar dataKey="imports" name="Imports" fill="#D9822B" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <p className="text-xs text-slate-400">USDA FAS marketing-year estimates</p>
        </div>
        <ul className="flex flex-col gap-5 text-sm text-slate-700">
          <li className="border-l-2 border-green pl-4">
            <strong>70%</strong> combined duty + levy — among the heaviest in Nigeria's tariff schedule, roughly stable since 2013
          </li>
          <li className="border-l-2 border-green pl-4">
            Rice was the single most-smuggled commodity through Nigerian Customs in Q1 2025: <strong>159 cases, 135,474 bags, ₦939M</strong>
          </li>
          <li className="border-l-2 border-green pl-4">
            The 2019 land-border closure remains only partially reversed — rice stayed formally banned even after the Dec 2020 reopening
          </li>
        </ul>
      </div>
      <p className="text-xs text-slate-400 mt-6">
        Sources: USDA FAS Grain and Feed Annual, 13 Mar 2024; PRNigeria, 24 Apr 2025
      </p>
    </section>
  )
}
