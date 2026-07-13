"""Build a single landscape-page 'case on a page' leave-behind, combining the
framework exhibit, the three sector findings, and the implication.

Distinct from build_pdf.py (which renders the full markdown paper) -- this
writes its own tightly laid-out HTML rather than converting markdown, since a
one-pager needs exact control over what fits on the single page.
"""
import base64
from pathlib import Path
from xhtml2pdf import pisa
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

FONTS = Path(r"C:\Windows\Fonts")
pdfmetrics.registerFont(TTFont("TimesReal", str(FONTS / "times.ttf")))
pdfmetrics.registerFont(TTFont("TimesReal-Bold", str(FONTS / "timesbd.ttf")))
pdfmetrics.registerFont(TTFont("TimesReal-Italic", str(FONTS / "timesi.ttf")))
pdfmetrics.registerFontFamily(
    "TimesReal", normal="TimesReal", bold="TimesReal-Bold", italic="TimesReal-Italic"
)

ROOT = Path(__file__).resolve().parent.parent
CHART = ROOT / "outputs" / "charts" / "framework_matrix.png"
OUT = ROOT / "paper" / "nigeria-tariff-one-pager.pdf"

chart_b64 = base64.b64encode(CHART.read_bytes()).decode("ascii")

CSS = """
@page { size: letter landscape; margin: 0.4in; }
body { font-family: "TimesReal"; font-size: 10.5pt; color: #1a1a1a; }
.header { background-color: #1B2A4A; color: white; padding: 8pt 14pt; margin: -0.4in -0.4in 8pt -0.4in; }
.header h1 { font-size: 18pt; margin: 0 0 2pt 0; }
.header p { font-size: 9pt; color: #CBD3E0; font-style: italic; margin: 0; }
.thought { font-size: 12.5pt; font-weight: bold; color: #1B2A4A; margin: 0 0 7pt 0; }
table.layout { width: 100%; border-collapse: collapse; }
table.layout td { vertical-align: top; padding: 0; }
.sector-card { border: 0.75pt solid #D6DAE0; padding: 5pt 8pt; margin-bottom: 5pt; }
.sector-name { font-weight: bold; color: #1B2A4A; font-size: 10pt; }
.sector-stat { font-weight: bold; font-size: 13pt; margin: 1pt 0; }
.sector-body { font-size: 8.5pt; color: #333333; line-height: 1.35; }
.implication { font-size: 10pt; font-style: italic; color: #1B2A4A; border-top: 0.75pt solid #D6DAE0; padding-top: 6pt; margin-top: 3pt; }
.footer { font-size: 7.5pt; color: #777777; margin-top: 6pt; }
"""

HTML = f"""
<html><head><style>{CSS}</style></head><body>
<div class="header">
  <h1>Tariffs Without a Strategy</h1>
  <p>Nigeria's tariff policy across refined petroleum, automobiles, and rice, 2023-2025</p>
</div>

<p class="thought">Tariff level does not predict import-substitution outcome. A credible domestic supply response does.</p>

<table class="layout">
<tr>
<td style="width: 46%; padding-right: 14pt;">

  <div class="sector-card" style="border-left: 3pt solid #1B2A4A;">
    <div class="sector-name">Refined petroleum</div>
    <div class="sector-stat" style="color:#1B2A4A;">~0.5% tariff &rarr; fastest substitution</div>
    <div class="sector-body">A single well-capitalized asset (Dangote Refinery, ~85% utilization by mid-2025) displaced imports 42% in 2025, with almost no tariff support. The one dedicated duty of the period was suspended within three weeks.</div>
  </div>

  <div class="sector-card" style="border-left: 3pt solid #D9822B;">
    <div class="sector-name">Automobiles</div>
    <div class="sector-stat" style="color:#D9822B;">35-40% tariff &rarr; weak substitution</div>
    <div class="sector-body">A tariff wall built specifically to reward local assembly produced a verified 29.0% aggregate capacity utilization across 34 licensed firms &mdash; and a policy framework that has never acquired the force of law.</div>
  </div>

  <div class="sector-card" style="border-left: 3pt solid #3F7A5E;">
    <div class="sector-name">Rice / agriculture</div>
    <div class="sector-stat" style="color:#3F7A5E;">70% tariff &rarr; weakest substitution</div>
    <div class="sector-body">The heaviest tariff of the three, and the least effective. Rice was Nigeria's single most-smuggled commodity in Q1 2025, despite decades of protection.</div>
  </div>

</td>
<td style="width: 54%;">
  <img src="data:image/png;base64,{chart_b64}" width="430" height="298" />
  <p style="font-size: 9pt; color: #333333; margin-top: 8pt; line-height: 1.4;">
    Plotted this way, the three sectors separate cleanly along the vertical axis (supply-response
    credibility), not the horizontal one (tariff level). That is the whole argument in one chart:
    protection without a credible domestic supply behind it does not produce substitution, and a
    credible supply response can substitute imports with almost no protection at all.
  </p>
</td>
</tr>
</table>

<p class="implication">The variable that predicts outcomes is not the tariff line. It's whether a credible, scaled domestic supply response exists behind it &mdash; a single large asset in petroleum, a fragmented base of 34 under-scaled firms in automobiles, and a still-fragmented milling sector with porous enforcement in rice.</p>

<p class="footer">Full paper, memo, deck, and interactive dashboard: github.com/kingxj27/nigeria-tariff-research &nbsp;&bull;&nbsp; Live dashboard: frontend-iota-woad-42.vercel.app &nbsp;&bull;&nbsp; Every figure traces to a named, dated source.</p>
</body></html>
"""

with open(OUT, "wb") as f:
    result = pisa.CreatePDF(HTML, dest=f)

if result.err:
    raise SystemExit(f"PDF generation failed with {result.err} errors")
print(f"wrote {OUT}")
