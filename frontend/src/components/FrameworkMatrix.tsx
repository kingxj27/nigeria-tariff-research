import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, ReferenceArea, Cell, ResponsiveContainer } from 'recharts'
import SectionHeading from './SectionHeading'
import data from '../data/framework_matrix.json'

const COLOR_BY_SECTOR: Record<string, string> = {
  'Refined petroleum': '#1B2A4A',
  'Automobiles': '#D9822B',
  'Rice/agriculture': '#3F7A5E',
}

function CustomTooltip({ active, payload }: { active?: boolean; payload?: { payload: (typeof data)[number] }[] }) {
  if (!active || !payload || !payload.length) return null
  const d = payload[0].payload
  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-md p-3 max-w-xs text-sm">
      <p className="font-bold text-navy">{d.sector}</p>
      <p className="text-slate-600 mt-1">{d.tariff_pct}% tariff, {d.credibility_band.toLowerCase()} supply-response credibility</p>
      <p className="text-slate-500 text-xs mt-2">{d.rationale}</p>
    </div>
  )
}

export default function FrameworkMatrix() {
  return (
    <section className="px-6 md:px-16 py-16 md:py-20 max-w-6xl mx-auto">
      <SectionHeading eyebrow="The framework" title="The vertical axis predicts substitution. The horizontal one doesn't." color="#D9822B" />
      <div className="bg-lightgray rounded-xl p-6" style={{ height: 440 }}>
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 30, left: 10, bottom: 20 }}>
            <ReferenceArea y1={50} y2={100} fill="#E4F0E9" fillOpacity={1} />
            <ReferenceArea y1={0} y2={50} fill="#FBEAE0" fillOpacity={1} />
            <CartesianGrid stroke="#D6DAE0" />
            <XAxis
              type="number" dataKey="tariff_pct" domain={[-5, 85]} tick={{ fill: '#8C96A3', fontSize: 12 }}
              axisLine={{ stroke: '#D6DAE0' }} tickLine={false}
              label={{ value: 'Effective tariff level (%)', position: 'insideBottom', offset: -10, fill: '#8C96A3', fontSize: 12 }}
            />
            <YAxis
              type="number" dataKey="credibility_y" domain={[0, 100]} ticks={[15, 50, 85]}
              tickFormatter={(v) => (v <= 20 ? 'Low' : v <= 60 ? 'Medium' : 'High')}
              tick={{ fill: '#8C96A3', fontSize: 12 }} axisLine={false} tickLine={false}
              label={{ value: 'Domestic supply-response credibility', angle: -90, position: 'insideLeft', fill: '#8C96A3', fontSize: 12 }}
            />
            <ZAxis range={[600, 600]} />
            <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
            <Scatter data={data}>
              {data.map((d) => (
                <Cell key={d.sector} fill={COLOR_BY_SECTOR[d.sector]} stroke="white" strokeWidth={2} />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>
      <p className="text-sm text-slate-600 mt-6 max-w-3xl">
        Petroleum sits at the lowest tariff and the highest supply-response credibility (a single, well-capitalized
        refinery financed independently of tariff policy), and it substituted imports fastest. Automobiles and rice
        sit at very different tariff levels but the same low credibility band (fragmented, under-scaled supply
        bases), and both show weak substitution. Hover each point for the underlying evidence.
      </p>
      <p className="text-xs text-slate-400 mt-4">
        Credibility positioning is qualitative, grounded in the evidence in the sector sections above. Automobiles
        plotted at the midpoint of its 35-40% tariff range.
      </p>
    </section>
  )
}
