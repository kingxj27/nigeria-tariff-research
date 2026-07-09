"""Render nigeria-tariff-investment-memo.md into a clean PDF for portfolio use."""
from pathlib import Path
import markdown
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

ROOT = Path(__file__).resolve().parent
SRC = ROOT / "nigeria-tariff-investment-memo.md"
OUT = ROOT / "nigeria-tariff-investment-memo.pdf"

raw = SRC.read_text(encoding="utf-8")
raw = raw.replace("₦", "N")  # see paper/build_pdf.py -- reportlab TTF cmap drops this glyph

body_html = markdown.markdown(raw, extensions=["tables", "fenced_code", "nl2br"])

CSS = """
@page {
    size: letter;
    margin: 1in;
    @frame footer {
        -pdf-frame-content: footerContent;
        bottom: 0.5in;
        margin-left: 1in;
        margin-right: 1in;
        height: 0.4in;
    }
}
body { font-family: "TimesReal"; font-size: 11pt; line-height: 1.5; color: #1a1a1a; }
h2 { font-size: 13.5pt; margin-top: 18pt; margin-bottom: 6pt; }
p { margin: 0 0 9pt 0; text-align: justify; }
strong { font-weight: bold; }
em { font-style: italic; }
table { width: 100%; border-collapse: collapse; margin: 12pt 0; font-size: 9.5pt; }
th, td { border: 0.5pt solid #888888; padding: 5pt 7pt; text-align: left; vertical-align: top; }
th { background-color: #E8E8E8; font-weight: bold; }
hr { border: none; border-top: 0.5pt solid #aaaaaa; margin: 16pt 0; }
#footerContent { font-size: 8.5pt; color: #777777; text-align: center; }
"""

full_html = f"<html><head><style>{CSS}</style></head><body>{body_html}<div id=\"footerContent\">Nigeria Tariff Policy Research, 2023-2025</div></body></html>"

with open(OUT, "wb") as f:
    result = pisa.CreatePDF(full_html, dest=f)

if result.err:
    raise SystemExit(f"PDF generation failed with {result.err} errors")
print(f"wrote {OUT}")
