import { useMemo, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, ResponsiveContainer, ReferenceLine } from 'recharts'
import SectionHeading from './SectionHeading'
import capacity from '../data/automobiles_naddc_capacity.json'

const TARIFF_DATA = [
  { label: 'Used vehicles', value: 35, color: '#1B2A4A' },
  { label: 'New vehicles', value: 40, color: '#1B2A4A' },
  { label: 'CKD kits\n(licensed)', value: 0, color: '#3F7A5E' },
  { label: 'SKD kits\n(licensed)', value: 10, color: '#3F7A5E' },
]

// Recharts' default tick doesn't render \n as a line break (it stays on one
// SVG text line), which overlaps adjacent labels at narrow widths. Render
// each line as its own <text> inside a positioned <g> instead.
function MultilineTick(props: { x?: number | string; y?: number | string; payload?: { value?: unknown } }) {
  const { x = 0, y = 0, payload } = props
  if (!payload) return null
  const lines = String(payload.value).split('\n')
  return (
    <g transform={`translate(${x},${y})`}>
      {lines.map((line, i) => (
        <text key={i} x={0} y={0} dy={14 + i * 13} textAnchor="middle" fill="#8C96A3" fontSize={11}>
          {line}
        </text>
      ))}
    </g>
  )
}

export default function AutomobilesSection() {
  const [showAll, setShowAll] = useState(false)

  const { sorted, aggUtil } = useMemo(() => {
    const s = [...capacity].sort((a, b) => a.utilization_pct - b.utilization_pct)
    const totalInstalled = capacity.reduce((sum, c) => sum + c.installed_units_per_year, 0)
    const totalActual = capacity.reduce((sum, c) => sum + c.actual_units_per_year, 0)
    return { sorted: s, aggUtil: (totalActual / totalInstalled) * 100 }
  }, [])

  const visible = showAll ? sorted : sorted.slice(-12).concat(sorted.slice(0, 3))

  return (
    <section className="px-6 md:px-16 py-16 md:py-20 max-w-6xl mx-auto bg-lightgray/40">
      <SectionHeading eyebrow="Case II · Automobiles" title="A textbook tariff wall (0-40%) hasn't produced scale" color="#D9822B" />

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl p-6 shadow-sm" style={{ height: 320 }}>
          <p className="text-sm font-semibold text-navy mb-2">Combined duty + levy by import route</p>
          <ResponsiveContainer width="100%" height="85%">
            <BarChart data={TARIFF_DATA} margin={{ top: 20, right: 10, left: 0, bottom: 20 }}>
              <CartesianGrid stroke="#E2E5EA" vertical={false} />
              <XAxis dataKey="label" tick={MultilineTick} axisLine={{ stroke: '#D6DAE0' }} tickLine={false} interval={0} />
              <YAxis tick={{ fill: '#8C96A3', fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip formatter={(v) => `${v}%`} />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {TARIFF_DATA.map((d) => (
                  <Cell key={d.label} fill={d.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm" style={{ height: 320 }}>
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-semibold text-navy">
              Capacity utilization by assembler {showAll ? '(all 34)' : '(top + bottom 15)'}
            </p>
            <button
              onClick={() => setShowAll((v) => !v)}
              className="text-xs text-orange font-semibold hover:underline"
            >
              {showAll ? 'Show fewer' : 'Show all 34'}
            </button>
          </div>
          <ResponsiveContainer width="100%" height="85%">
            <BarChart data={visible} layout="vertical" margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
              <CartesianGrid stroke="#E2E5EA" horizontal={false} />
              <XAxis type="number" tick={{ fill: '#8C96A3', fontSize: 11 }} axisLine={false} tickLine={false} domain={[0, 80]} />
              <YAxis
                type="category"
                dataKey="company"
                tick={{ fill: '#8C96A3', fontSize: 9 }}
                axisLine={false}
                tickLine={false}
                width={140}
              />
              <Tooltip formatter={(v) => `${v}%`} />
              <ReferenceLine x={aggUtil} stroke="#8C96A3" strokeDasharray="4 4" />
              <Bar dataKey="utilization_pct" radius={[0, 4, 4, 0]}>
                {visible.map((d) => (
                  <Cell
                    key={d.company}
                    fill={d.utilization_pct >= 60 ? '#3F7A5E' : d.utilization_pct < 20 ? '#D9822B' : '#1B2A4A'}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <p className="text-xs text-slate-400 mt-1">Dashed line: sector aggregate ({aggUtil.toFixed(1)}%)</p>
        </div>
      </div>

      <p className="text-sm text-slate-600 mt-8 max-w-3xl">
        A primary NADDC document (April 2024) covering all 34 licensed assemblers shows a verified 29.0% aggregate
        capacity utilization (93,950 actual / 323,650 installed units/year), despite a tariff wall built specifically to make local
        assembly the cheaper path to market.
      </p>
      <p className="text-xs text-slate-400 mt-4">
        Source: trade.gov Nigeria Import Tariffs; NADDC, "Automotive Companies Under NAIDP That Are In Full Commercial Operation," April 2024
      </p>

      <div className="mt-14 grid md:grid-cols-2 gap-8 items-start">
        <div>
          <h3 className="text-lg font-bold text-navy mb-4">The policy has never had the force of law</h3>
          <ul className="flex flex-col gap-4 text-sm text-slate-700">
            <li className="border-l-2 border-orange pl-4">
              The revised NAIDP was approved by Federal Executive Council in May 2023. That's an executive plan, not a statute.
            </li>
            <li className="border-l-2 border-orange pl-4">
              The original NAIDP's ten-year statutory term lapsed in 2024. A successor 2024-2034 framework still awaited legal drafting as of March 2025.
            </li>
            <li className="border-l-2 border-orange pl-4">
              20 of 58 historically licensed assemblers had suspended operations by March 2025 (~$89.6M in stranded investment)
            </li>
          </ul>
        </div>
        <div className="bg-navy rounded-xl p-6 text-white">
          <p className="italic text-sm leading-relaxed">
            "Nobody wants to commit serious capital to the auto industry without adequate laws to protect their investments."
          </p>
          <p className="text-xs text-slate-400 mt-4">Joseph Osanipin, NADDC Director-General, Oct 2025</p>
        </div>
      </div>
    </section>
  )
}
