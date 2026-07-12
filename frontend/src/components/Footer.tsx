export default function Footer() {
  return (
    <footer className="px-6 md:px-16 py-12 border-t border-slate-200">
      <div className="max-w-6xl mx-auto text-sm text-slate-500">
        <p className="font-semibold text-navy mb-2">Full sourcing and underlying data</p>
        <ul className="flex flex-col gap-1">
          <li>Raw research notes &amp; citations: <code className="text-xs bg-lightgray px-1.5 py-0.5 rounded">data/raw/&#123;petroleum,automobiles,rice,afcfta&#125;/&#123;notes.md,sources.md&#125;</code></li>
          <li>Structured datasets: <code className="text-xs bg-lightgray px-1.5 py-0.5 rounded">data/processed/*.csv</code></li>
          <li>Analysis code: <code className="text-xs bg-lightgray px-1.5 py-0.5 rounded">models/*_analysis.py</code></li>
          <li>Full paper and memo: <code className="text-xs bg-lightgray px-1.5 py-0.5 rounded">paper/</code>, <code className="text-xs bg-lightgray px-1.5 py-0.5 rounded">memo/</code></li>
        </ul>
        <p className="mt-4 text-xs">
          Every figure traces to a named, dated source. Where sources conflicted, both figures are presented
          instead of silently reconciled.
        </p>
      </div>
    </footer>
  )
}
