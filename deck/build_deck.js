const pptxgen = require("pptxgenjs");
const path = require("path");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");
const { FaGasPump, FaCar, FaSeedling, FaBalanceScale, FaLightbulb, FaDatabase, FaChartLine } = require("react-icons/fa");

const NAVY = "1B2A4A";
const ORANGE = "D9822B";
const GREEN = "3F7A5E";
const GRAY = "8C96A3";
const LIGHT_GRAY = "F2F4F7";
const WHITE = "FFFFFF";

const CHARTS = path.join(__dirname, "..", "outputs", "charts");

function renderIconSvg(IconComponent, color, size) {
  return ReactDOMServer.renderToStaticMarkup(React.createElement(IconComponent, { color, size: String(size) }));
}
async function iconToBase64Png(IconComponent, color, size = 256) {
  const svg = renderIconSvg(IconComponent, color, size);
  const pngBuffer = await sharp(Buffer.from(svg)).png().toBuffer();
  return "image/png;base64," + pngBuffer.toString("base64");
}

// icon in a colored circle badge, returns nothing -- adds directly to slide
async function addIconBadge(slide, IconComponent, x, y, d, circleColor, iconColor) {
  slide.addShape("ellipse", { x, y, w: d, h: d, fill: { color: circleColor } });
  const iconData = await iconToBase64Png(IconComponent, iconColor, 256);
  const pad = d * 0.28;
  slide.addImage({ data: iconData, x: x + pad / 2, y: y + pad / 2, w: d - pad, h: d - pad });
}

function pageNum(slide, n) {
  slide.addText(String(n), { x: 12.6, y: 7.05, w: 0.5, h: 0.3, fontSize: 9, color: GRAY, align: "right" });
}

function footer(slide, text) {
  slide.addText(text, { x: 0.5, y: 7.05, w: 11.5, h: 0.3, fontSize: 8, color: GRAY, italic: true });
}

function eyebrow(slide, text, color) {
  slide.addText(text.toUpperCase(), { x: 0.5, y: 0.35, w: 8, h: 0.35, fontSize: 12, bold: true, color, charSpacing: 1.5 });
}

function actionTitle(slide, text, y = 0.76) {
  slide.addText(text, { x: 0.5, y, w: 12.3, h: 0.9, fontSize: 25, bold: true, color: NAVY, fontFace: "Calibri" });
}

async function main() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_WIDE"; // 13.3 x 7.5
  pres.author = "Nigeria Tariff Research";
  pres.title = "Tariffs Without a Strategy";

  // ---------- Slide 1: Title ----------
  {
    const s = pres.addSlide();
    s.background = { color: NAVY };
    // three sector dots as a motif, top-right
    const dotY = 0.7, dotD = 0.42;
    await addIconBadge(s, FaGasPump, 10.6, dotY, dotD, "24365C", ORANGE);
    await addIconBadge(s, FaCar, 11.2, dotY, dotD, "24365C", ORANGE);
    await addIconBadge(s, FaSeedling, 11.8, dotY, dotD, "24365C", GREEN);

    s.addText("NIGERIA TARIFF POLICY, 2023-2025", { x: 0.7, y: 2.55, w: 10, h: 0.4, fontSize: 14, bold: true, color: ORANGE, charSpacing: 2 });
    s.addText("Tariffs Without a Strategy", { x: 0.65, y: 2.95, w: 12, h: 1.1, fontSize: 44, bold: true, color: WHITE, fontFace: "Calibri" });
    s.addText("Three sectors, three outcomes: refined petroleum, automobiles, and rice under Nigeria's tariff regime", {
      x: 0.7, y: 4.35, w: 10.5, h: 0.7, fontSize: 16, color: "CBD3E0", italic: true,
    });
    s.addText("Comparative case study  •  July 2026", { x: 0.7, y: 6.7, w: 8, h: 0.35, fontSize: 11, color: GRAY });
  }

  // ---------- Slide 2: Governing thought ----------
  {
    const s = pres.addSlide();
    eyebrow(s, "Governing thought", ORANGE);
    actionTitle(s, "Tariff level doesn't predict import-substitution outcome. A credible domestic supply response does.");

    const cardY = 2.1, cardH = 3.5;
    const cards = [
      { icon: FaGasPump, color: NAVY, sector: "Refined petroleum", tariff: "~0.5% tariff", outcome: "Fastest substitution, driven by Dangote Refinery" },
      { icon: FaCar, color: ORANGE, sector: "Automobiles", tariff: "35-40% tariff", outcome: "Heavy protection, only 29.0% aggregate capacity utilization" },
      { icon: FaSeedling, color: GREEN, sector: "Rice / agriculture", tariff: "70% tariff", outcome: "Heaviest wall, most persistent leakage, and the top-smuggled commodity" },
    ];
    const cardW = 3.85, gap = 0.35;
    for (let i = 0; i < 3; i++) {
      const x = 0.5 + i * (cardW + gap);
      s.addShape("roundRect", {
        x, y: cardY, w: cardW, h: cardH, rectRadius: 0.08, fill: { color: LIGHT_GRAY },
        shadow: { type: "outer", color: "000000", blur: 6, offset: 2, angle: 90, opacity: 0.1 },
      });
      await addIconBadge(s, cards[i].icon, x + 0.3, cardY + 0.35, 0.75, cards[i].color, WHITE);
      s.addText(cards[i].sector, { x: x + 0.25, y: cardY + 1.3, w: cardW - 0.5, h: 0.5, fontSize: 16, bold: true, color: NAVY });
      s.addText(cards[i].tariff, { x: x + 0.25, y: cardY + 1.85, w: cardW - 0.5, h: 0.45, fontSize: 20, bold: true, color: cards[i].color });
      s.addText(cards[i].outcome, { x: x + 0.25, y: cardY + 2.4, w: cardW - 0.5, h: 1.0, fontSize: 12.5, color: "3D4759" });
    }
    footer(s, "The variable that predicts outcomes isn't the tariff line. It's whether a credible domestic supply response exists behind it.");
    pageNum(s, 2);
  }

  // ---------- Slide 3: Sector comparison table ----------
  {
    const s = pres.addSlide();
    eyebrow(s, "Sector comparison", ORANGE);
    actionTitle(s, "Three different policy tools, three different results");

    const rows = [
      [
        { text: "Sector", options: { bold: true, color: WHITE, fill: { color: NAVY }, fontSize: 13 } },
        { text: "Effective tariff (2025)", options: { bold: true, color: WHITE, fill: { color: NAVY }, fontSize: 13 } },
        { text: "Primary policy tool", options: { bold: true, color: WHITE, fill: { color: NAVY }, fontSize: 13 } },
        { text: "Outcome", options: { bold: true, color: WHITE, fill: { color: NAVY }, fontSize: 13 } },
      ],
      [
        { text: "Refined petroleum", options: { bold: true, color: NAVY, fontSize: 12.5 } },
        { text: "~0.5%", options: { fontSize: 12.5 } },
        { text: "Signaling: an approved-then-suspended duty, import license halts", options: { fontSize: 12.5 } },
        { text: "Fastest import substitution, driven by Dangote Refinery", options: { fontSize: 12.5 } },
      ],
      [
        { text: "Automobiles", options: { bold: true, color: NAVY, fontSize: 12.5 } },
        { text: "35-40%", options: { fontSize: 12.5 } },
        { text: "Sustained tariff differential (fully-built vs. CKD/SKD)", options: { fontSize: 12.5 } },
        { text: "Protection without competitiveness: 29.0% aggregate utilization", options: { fontSize: 12.5 } },
      ],
      [
        { text: "Rice / agriculture", options: { bold: true, color: NAVY, fontSize: 12.5 } },
        { text: "70%", options: { fontSize: 12.5 } },
        { text: "Sustained high tariff plus intermittent bans and waivers", options: { fontSize: 12.5 } },
        { text: "Heaviest wall, most persistent leakage, top-smuggled commodity", options: { fontSize: 12.5 } },
      ],
    ];
    s.addTable(rows, {
      x: 0.5, y: 2.15, w: 12.3, h: 3.6,
      colW: [2.4, 1.9, 4.2, 3.8],
      border: { pt: 0.75, color: "E2E5EA" },
      fill: { color: WHITE },
      autoPage: false,
      valign: "middle",
      margin: [6, 8, 6, 8],
    });
    footer(s, "Full sourcing: data/raw/{petroleum,automobiles,rice}/sources.md");
    pageNum(s, 3);
  }

  // ---------- Slide 4: Petroleum - substitution ----------
  {
    const s = pres.addSlide();
    eyebrow(s, "Case I · Refined petroleum", NAVY);
    actionTitle(s, "Near-zero tariff, fastest substitution. Dangote Refinery is doing what policy didn't.");
    s.addImage({ path: path.join(CHARTS, "petroleum_pms_import_value_annual.png"), x: 0.5, y: 2.0, w: 7.6, h: 4.9, sizing: { type: "contain", w: 7.6, h: 4.9 } });

    const bulletX = 8.35, bulletW = 4.45;
    s.addText([
      { text: "Petrol import bill fell 42% in 2025 (₦15.42tn to ₦8.96tn) as Dangote reached ~85% utilization of its 650,000 bpd refinery", options: { bullet: true, breakLine: true, paraSpaceAfter: 14 } },
      { text: "The only dedicated petroleum tariff of the period, a 15% duty, was approved 21 Oct 2025 and suspended 13 Nov 2025, before ever taking effect", options: { bullet: true, breakLine: true, paraSpaceAfter: 14 } },
      { text: "2024's naira-value spike (+105%) is mostly a currency story. The naira depreciated 40.9% that year.", options: { bullet: true } },
    ], { x: bulletX, y: 2.1, w: bulletW, h: 4.6, fontSize: 13, color: "3D4759", valign: "top" });
    footer(s, "Source: NBS Foreign Trade Statistics via Nairametrics/Businessday/Daily Trust, 2025-2026");
    pageNum(s, 4);
  }

  // ---------- Slide 5: Petroleum - fragile mechanism ----------
  {
    const s = pres.addSlide();
    eyebrow(s, "Case I · Refined petroleum", NAVY);
    actionTitle(s, "The substitution mechanism is real, but institutionally fragile");

    const items = [
      { stat: "82M barrels", label: "allocated to Dangote Oct 2024-Oct 2025 under the naira-for-crude deal, 60% naira-denominated" },
      { stat: "3 weeks", label: "how long the Oct 2025 15% import duty survived before being suspended amid industry pushback" },
      { stat: "~79.5M barrel", label: "reported NNPC supply shortfall to Dangote, Oct 2025-mid 2026. Dangote also has an active lawsuit disputing import-license enforcement." },
    ];
    const cardY = 2.2, cardH = 3.3, cardW = 3.85, gap = 0.35;
    for (let i = 0; i < 3; i++) {
      const x = 0.5 + i * (cardW + gap);
      s.addShape("roundRect", {
        x, y: cardY, w: cardW, h: cardH, rectRadius: 0.08, fill: { color: LIGHT_GRAY },
        shadow: { type: "outer", color: "000000", blur: 6, offset: 2, angle: 90, opacity: 0.1 },
      });
      s.addText(items[i].stat, { x: x + 0.3, y: cardY + 0.35, w: cardW - 0.6, h: 0.9, fontSize: 30, bold: true, color: NAVY });
      s.addText(items[i].label, { x: x + 0.3, y: cardY + 1.3, w: cardW - 0.6, h: 1.8, fontSize: 12.5, color: "3D4759" });
    }
    s.addText("Read this as a genuine structural shift with governance that's still catching up.", {
      x: 0.5, y: 5.75, w: 12.3, h: 0.5, fontSize: 14, italic: true, color: ORANGE,
    });
    footer(s, "Sources: Nairametrics, Punch, ICIR Nigeria, Authority News, 2025-2026. See data/raw/petroleum/sources.md.");
    pageNum(s, 5);
  }

  // ---------- Slide 6: Automobiles - tariff wall + utilization ----------
  {
    const s = pres.addSlide();
    eyebrow(s, "Case II · Automobiles", ORANGE);
    actionTitle(s, "A textbook tariff wall (0-40%) that hasn't produced scale");
    s.addImage({ path: path.join(CHARTS, "automobiles_tariff_differential.png"), x: 0.4, y: 2.05, w: 5.9, h: 4.85, sizing: { type: "contain", w: 5.9, h: 4.85 } });
    s.addImage({ path: path.join(CHARTS, "automobiles_naddc_utilization.png"), x: 6.55, y: 1.85, w: 6.25, h: 5.15, sizing: { type: "contain", w: 6.25, h: 5.15 } });
    footer(s, "Source: trade.gov Nigeria Import Tariffs; NADDC, April 2024. Aggregate utilization verified at 29.0% (93,950 / 323,650 units/year).");
    pageNum(s, 6);
  }

  // ---------- Slide 7: Automobiles - no legal durability ----------
  {
    const s = pres.addSlide();
    eyebrow(s, "Case II · Automobiles", ORANGE);
    actionTitle(s, "The policy has never had the force of law");

    await addIconBadge(s, FaBalanceScale, 0.6, 2.25, 1.1, ORANGE, WHITE);
    s.addText([
      { text: "The revised NAIDP was approved by Federal Executive Council in May 2023. That's an executive plan, not a statute.", options: { bullet: true, breakLine: true, paraSpaceAfter: 16 } },
      { text: "The original NAIDP's ten-year statutory term lapsed in 2024. A successor 2024-2034 framework still awaited legal drafting as of March 2025.", options: { bullet: true, breakLine: true, paraSpaceAfter: 16 } },
      { text: "As of October 2025, stakeholders, including NADDC's own Director-General, were still demanding passage of a “NAIDP Bill”", options: { bullet: true, breakLine: true, paraSpaceAfter: 16 } },
      { text: "20 of 58 historically licensed assemblers had suspended operations by March 2025 (~$89.6M in stranded investment)", options: { bullet: true } },
    ], { x: 2.05, y: 2.05, w: 6.6, h: 5.0, fontSize: 14.5, color: "3D4759", valign: "top" });

    s.addShape("roundRect", { x: 9.0, y: 2.3, w: 3.8, h: 3.0, rectRadius: 0.08, fill: { color: NAVY } });
    s.addText("“Nobody wants to commit serious capital to the auto industry without adequate laws to protect their investments.”", {
      x: 9.3, y: 2.6, w: 3.2, h: 2.0, fontSize: 13, italic: true, color: WHITE, valign: "top",
    });
    s.addText("Joseph Osanipin, NADDC Director-General, Oct 2025", { x: 9.3, y: 4.6, w: 3.2, h: 0.6, fontSize: 10.5, color: "9FB0CC" });
    footer(s, "Sources: The Guardian Nigeria, 27 Mar 2025; Vanguard, 10 Oct 2025. See data/raw/automobiles/sources.md.");
    pageNum(s, 7);
  }

  // ---------- Slide 8: Rice ----------
  {
    const s = pres.addSlide();
    eyebrow(s, "Case III · Rice / agriculture", GREEN);
    actionTitle(s, "The heaviest tariff, and the most persistent leakage");
    s.addImage({ path: path.join(CHARTS, "rice_production_vs_imports.png"), x: 0.5, y: 2.0, w: 7.6, h: 4.9, sizing: { type: "contain", w: 7.6, h: 4.9 } });

    s.addText([
      { text: "70% combined duty and levy: among the heaviest in Nigeria's tariff schedule, roughly stable since 2013", options: { bullet: true, breakLine: true, paraSpaceAfter: 14 } },
      { text: "Rice was the single most-smuggled commodity through Nigerian Customs in Q1 2025: 159 cases, 135,474 bags, ₦939M", options: { bullet: true, breakLine: true, paraSpaceAfter: 14 } },
      { text: "The 2019 land-border closure remains only partially reversed. Rice stayed formally banned even after the Dec 2020 reopening.", options: { bullet: true } },
    ], { x: 8.35, y: 2.1, w: 4.45, h: 4.6, fontSize: 13, color: "3D4759", valign: "top" });
    footer(s, "Sources: USDA FAS Grain and Feed Annual, 13 Mar 2024; PRNigeria, 24 Apr 2025. See data/raw/rice/sources.md.");
    pageNum(s, 8);
  }

  // ---------- Slide 9: Cross-sector synthesis ----------
  {
    const s = pres.addSlide();
    eyebrow(s, "Synthesis", ORANGE);
    actionTitle(s, "Tariff level runs inversely to substitution outcome across all 3 sectors");
    s.addImage({ path: path.join(CHARTS, "sector_comparison_effective_tariff.png"), x: 2.55, y: 1.95, w: 8.2, h: 4.7, sizing: { type: "contain", w: 8.2, h: 4.7 } });
    footer(s, "Source: see data/raw/{petroleum,automobiles,rice}/sources.md for underlying citations.");
    pageNum(s, 9);
  }

  // ---------- Slide 10: The framework ----------
  {
    const s = pres.addSlide();
    eyebrow(s, "The framework", ORANGE);
    actionTitle(s, "The vertical axis predicts substitution. The horizontal one doesn't.");
    s.addImage({ path: path.join(CHARTS, "framework_matrix.png"), x: 2.35, y: 1.85, w: 8.6, h: 5.1, sizing: { type: "contain", w: 8.6, h: 5.1 } });
    footer(s, "Credibility positioning is qualitative, grounded in the evidence in Sections 4-9. Automobiles plotted at the midpoint of its 35-40% range.");
    pageNum(s, 10);
  }

  // ---------- Slide 11: AfCFTA ----------
  {
    const s = pres.addSlide();
    eyebrow(s, "The AfCFTA question", GREEN);
    actionTitle(s, "Commitment without a clear test. Well-evidenced only for rice.");

    await addIconBadge(s, FaBalanceScale, 0.6, 2.2, 1.0, GREEN, WHITE);
    s.addText("Clear finding", { x: 2.0, y: 2.15, w: 5.0, h: 0.4, fontSize: 15, color: GREEN });
    s.addText("Rice sits on Nigeria's AfCFTA exclusion or long-timeline “sensitive” list, alongside flour, sugar, and cement. That's consistent with decades of food-security-driven protection.", {
      x: 2.0, y: 2.6, w: 5.1, h: 1.5, fontSize: 13, color: "3D4759", valign: "top",
    });

    await addIconBadge(s, FaDatabase, 7.1, 2.2, 1.0, GRAY, WHITE);
    s.addText("Important non-finding", { x: 8.5, y: 2.15, w: 4.3, h: 0.4, fontSize: 15, color: GRAY });
    s.addText("No source, primary or secondary, states where refined petroleum or automobiles sit on Nigeria's AfCFTA schedule. A clean 3-sector AfCFTA comparison can't be made with confidence.", {
      x: 8.5, y: 2.6, w: 4.3, h: 1.9, fontSize: 13, color: "3D4759", valign: "top",
    });

    s.addShape("line", { x: 0.5, y: 4.35, w: 12.3, h: 0, line: { color: "E2E5EA", width: 1 } });

    s.addText("Nigeria gazetted its AfCFTA tariff schedule only in 2025, six years after signing. Within the 2023-2025 window, unilateral tools (subsidy policy, import bans, forex allocation) are doing far more work shaping sector outcomes than AfCFTA commitments.", {
      x: 0.5, y: 4.7, w: 12.3, h: 1.3, fontSize: 15, italic: true, color: NAVY, valign: "top",
    });
    footer(s, "Sources: Boysen (2024), The World Economy; WTO Trade Policy Review, Nigeria, Nov 2024; ITRC, 16 Apr 2025. See data/raw/afcfta/sources.md.");
    pageNum(s, 11);
  }

  // ---------- Slide 12: Implications ----------
  {
    const s = pres.addSlide();
    s.background = { color: NAVY };
    eyebrowDark(s, "Implications");
    s.addText("Three takeaways for reading Nigeria as a market", { x: 0.5, y: 0.7, w: 12.3, h: 0.8, fontSize: 25, bold: true, color: WHITE, fontFace: "Calibri" });

    const items = [
      { icon: FaChartLine, title: "Don't read tariff schedules as a proxy for policy seriousness", body: "The sector with almost no tariff is undergoing the most real structural change. The sector with the highest tariff has the weakest enforcement outcome." },
      { icon: FaLightbulb, title: "Look for a scaled domestic supply response as the leading indicator", body: "A single, well-capitalized asset (Dangote) displaced more imports in 18 months than a decade of auto tariffs achieved for local assembly." },
      { icon: FaBalanceScale, title: "Treat AfCFTA as immature through 2025-2026, not decisive yet", body: "The schedule was only gazetted in 2025. Nigeria's unilateral tools remain the dominant lever for sector-level forecasting on this horizon." },
    ];
    const cardY = 2.15, cardH = 4.2, cardW = 3.85, gap = 0.35;
    for (let i = 0; i < 3; i++) {
      const x = 0.5 + i * (cardW + gap);
      await addIconBadge(s, items[i].icon, x + 0.3, cardY + 0.3, 0.75, ORANGE, NAVY);
      s.addText(items[i].title, { x: x + 0.05, y: cardY + 1.25, w: cardW - 0.3, h: 1.1, fontSize: 14.5, color: WHITE, valign: "top" });
      s.addText(items[i].body, { x: x + 0.05, y: cardY + 2.4, w: cardW - 0.3, h: 1.7, fontSize: 12.5, color: "CBD3E0", valign: "top" });
    }
    pageNum(s, 12);
  }

  // ---------- Slide 13: Sources / appendix ----------
  {
    const s = pres.addSlide();
    eyebrow(s, "Appendix", GRAY);
    actionTitle(s, "Full sourcing and underlying data");

    await addIconBadge(s, FaDatabase, 0.6, 2.3, 1.0, GRAY, WHITE);
    s.addText([
      { text: "Raw research notes & full citations:  data/raw/{petroleum,automobiles,rice,afcfta}/{notes.md,sources.md}", options: { bullet: true, breakLine: true, paraSpaceAfter: 16 } },
      { text: "Structured datasets:  data/processed/*.csv", options: { bullet: true, breakLine: true, paraSpaceAfter: 16 } },
      { text: "Analysis & chart-generation code:  models/{petroleum,automobiles,rice,sector_comparison}_analysis.py", options: { bullet: true, breakLine: true, paraSpaceAfter: 16 } },
      { text: "Full paper and investment memo:  paper/nigeria-tariff-policy-paper.md, memo/nigeria-tariff-investment-memo.md", options: { bullet: true } },
    ], { x: 2.05, y: 2.3, w: 10.2, h: 4.0, fontSize: 15, color: "3D4759", valign: "top" });
    footer(s, "Every figure in this deck traces to a named, dated source. Where sources conflicted, both figures are presented. See appendix notes in the paper.");
    pageNum(s, 13);
  }

  function eyebrowDark(slide, text) {
    slide.addText(text.toUpperCase(), { x: 0.5, y: 0.3, w: 8, h: 0.35, fontSize: 12, bold: true, color: ORANGE, charSpacing: 1.5 });
  }

  const outPath = path.join(__dirname, "nigeria-tariff-policy-deck.pptx");
  await pres.writeFile({ fileName: outPath });
  console.log("wrote " + outPath);
}

main().catch((e) => { console.error(e); process.exit(1); });
