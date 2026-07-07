"""Render nigeria-tariff-academic-paper.md into a polished PDF for portfolio use."""
import re
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
SRC = ROOT / "nigeria-tariff-academic-paper.md"
OUT = ROOT / "nigeria-tariff-academic-paper.pdf"

raw = SRC.read_text(encoding="utf-8")
# reportlab's TTF cmap parsing drops the Naira glyph (U+20A6) even though the
# font itself contains it -- renders as a solid box. Substitute at render time
# only; the source .md keeps the real symbol for GitHub/web rendering.
raw = raw.replace("₦", "N")

# Split off the title (first H1) and the italic subtitle line right after it,
# so we can render a proper title block instead of an inline H1.
lines = raw.splitlines()
title = lines[0].lstrip("# ").strip()
subtitle = ""
rest_start = 1
for i in range(1, min(5, len(lines))):
    if lines[i].strip().startswith("*") and lines[i].strip().endswith("*"):
        subtitle = lines[i].strip().strip("*")
        rest_start = i + 1
        break
body_md = "\n".join(lines[rest_start:])
# drop the "---" rule right after the subtitle
body_md = re.sub(r"^\s*---\s*\n", "", body_md, count=1)

body_html = markdown.markdown(body_md, extensions=["tables", "fenced_code"])

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
body {
    font-family: "TimesReal";
    font-size: 11pt;
    line-height: 1.5;
    color: #1a1a1a;
}
.titleblock {
    text-align: center;
    margin-bottom: 0.5in;
}
.titleblock h1 {
    font-size: 18pt;
    margin-bottom: 6pt;
}
.titleblock .subtitle {
    font-size: 13pt;
    font-style: italic;
    color: #333333;
}
.titleblock .meta {
    font-size: 10pt;
    color: #555555;
    margin-top: 14pt;
}
h1 { font-size: 15pt; margin-top: 22pt; margin-bottom: 8pt; }
h2 { font-size: 13pt; margin-top: 18pt; margin-bottom: 6pt; }
h3 { font-size: 11.5pt; margin-top: 14pt; margin-bottom: 5pt; font-style: italic; }
p { margin: 0 0 9pt 0; text-align: justify; }
strong { font-weight: bold; }
em { font-style: italic; }
table {
    width: 100%;
    border-collapse: collapse;
    margin: 12pt 0;
    font-size: 9.5pt;
}
th, td {
    border: 0.5pt solid #888888;
    padding: 5pt 7pt;
    text-align: left;
    vertical-align: top;
}
th {
    background-color: #E8E8E8;
    font-weight: bold;
}
hr { border: none; border-top: 0.5pt solid #aaaaaa; margin: 16pt 0; }
#footerContent { font-size: 8.5pt; color: #777777; text-align: center; }
"""

title_block = f"""
<div class="titleblock">
  <h1>{title}</h1>
  <div class="subtitle">{subtitle}</div>
  <div class="meta">Nigeria Tariff Policy Research &nbsp;&bull;&nbsp; July 2026</div>
</div>
"""

full_html = f"""
<html>
<head><style>{CSS}</style></head>
<body>
{title_block}
{body_html}
<div id="footerContent">Nigeria Tariff Policy Research, 2023-2025</div>
</body>
</html>
"""

with open(OUT, "wb") as f:
    result = pisa.CreatePDF(full_html, dest=f)

if result.err:
    raise SystemExit(f"PDF generation failed with {result.err} errors")
print(f"wrote {OUT}")
