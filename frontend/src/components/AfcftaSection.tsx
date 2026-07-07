import SectionHeading from './SectionHeading'

export default function AfcftaSection() {
  return (
    <section className="px-6 md:px-16 py-16 md:py-20 max-w-6xl mx-auto">
      <SectionHeading eyebrow="The AfCFTA question" title="Commitment without a clear test — well-evidenced only for rice" color="#3F7A5E" />
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <p className="font-bold text-green mb-2">Clear finding</p>
          <p className="text-sm text-slate-700">
            Rice sits on Nigeria's AfCFTA exclusion / long-timeline "sensitive" list, alongside flour, sugar, and
            cement — consistent with decades of food-security-driven protection.
          </p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <p className="font-bold text-gray mb-2">Important non-finding</p>
          <p className="text-sm text-slate-700">
            No source — primary or secondary — states where refined petroleum or automobiles sit on Nigeria's
            AfCFTA schedule. A clean 3-sector AfCFTA comparison cannot be made with confidence.
          </p>
        </div>
      </div>
      <p className="text-navy italic font-medium mt-8 border-t border-slate-200 pt-6 max-w-4xl">
        Nigeria gazetted its AfCFTA tariff schedule only in 2025 — six years after signing. Within the 2023-2025
        window, unilateral tools (subsidy policy, import bans, forex allocation) are doing far more work shaping
        sector outcomes than AfCFTA commitments.
      </p>
      <p className="text-xs text-slate-400 mt-6">
        Sources: Boysen (2024), The World Economy; WTO Trade Policy Review — Nigeria, Nov 2024; ITRC, 16 Apr 2025
      </p>
    </section>
  )
}
