import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, ResponsiveContainer } from 'recharts'
import SectionHeading from './SectionHeading'
import annual from '../data/petroleum_pms_import_value.json'

export default function PetroleumSection() {
  const data = annual.map((d) => ({
    year: String(d.year),
    value: d.value_ngn_trillion,
  }))

  const colorFor = (year: string) => (year === '2024' ? '#D9822B' : year === '2025' ? '#3F7A5E' : '#1B2A4A')

  return (
    <section className="px-6 md:px-16 py-16 md:py-20 max-w-6xl mx-auto">
      <SectionHeading eyebrow="Case I · Refined petroleum" title="Near-zero tariff, fastest substitution — Dangote Refinery is doing what policy didn't" color="#1B2A4A" />
      <div className="grid md:grid-cols-3 gap-8 items-start">
        <div className="md:col-span-2 bg-lightgray rounded-xl p-6" style={{ height: 340 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid stroke="#E2E5EA" vertical={false} />
              <XAxis dataKey="year" tick={{ fill: '#8C96A3', fontSize: 12 }} axisLine={{ stroke: '#D6DAE0' }} tickLine={false} />
              <YAxis tick={{ fill: '#8C96A3', fontSize: 12 }} axisLine={false} tickLine={false} label={{ value: '₦ trillion', angle: -90, position: 'insideLeft', fill: '#8C96A3', fontSize: 12 }} />
              <Tooltip formatter={(v) => `₦${v}tn`} />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {data.map((d) => (
                  <Cell key={d.year} fill={colorFor(d.year)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <p className="text-xs text-slate-400 mt-2">
            PMS (petrol) import bill, 2020-2025 — orange = 2024's currency-driven spike, green = 2025's Dangote-driven decline
          </p>
        </div>
        <ul className="flex flex-col gap-5 text-sm text-slate-700">
          <li className="border-l-2 border-navy pl-4">
            Petrol import bill fell <strong>42%</strong> in 2025 (₦15.42tn → ₦8.96tn) as Dangote reached ~85% utilization of its 650,000 bpd refinery
          </li>
          <li className="border-l-2 border-orange pl-4">
            The only dedicated petroleum tariff of the period — a <strong>15% duty</strong> — was approved 21 Oct 2025 and suspended 13 Nov 2025, before ever taking effect
          </li>
          <li className="border-l-2 border-green pl-4">
            2024's naira-value spike (+105%) is substantially a currency story: the naira depreciated <strong>40.9%</strong> that year, not a volume story
          </li>
        </ul>
      </div>
      <p className="text-xs text-slate-400 mt-6">
        Source: NBS Foreign Trade Statistics via Nairametrics/Businessday/Daily Trust, 2025-2026
      </p>

      <div className="mt-14">
        <h3 className="text-lg font-bold text-navy mb-1">
          The substitution mechanism is real, but institutionally fragile
        </h3>
        <p className="text-sm text-slate-500 mb-6">
          Read this as "genuine structural shift, immature governance" — not a settled outcome.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-lightgray rounded-xl p-6">
            <p className="text-3xl font-bold text-navy mb-2">82M barrels</p>
            <p className="text-sm text-slate-600">
              allocated to Dangote Oct 2024-Oct 2025 under the naira-for-crude deal, 60% naira-denominated
            </p>
          </div>
          <div className="bg-lightgray rounded-xl p-6">
            <p className="text-3xl font-bold text-navy mb-2">3 weeks</p>
            <p className="text-sm text-slate-600">
              how long the Oct 2025 15% import duty survived before being suspended amid industry pushback
            </p>
          </div>
          <div className="bg-lightgray rounded-xl p-6">
            <p className="text-3xl font-bold text-navy mb-2">~79.5M barrel</p>
            <p className="text-sm text-slate-600">
              reported NNPC supply shortfall to Dangote, Oct 2025-mid 2026 — and an active Dangote lawsuit disputing import-license enforcement
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
