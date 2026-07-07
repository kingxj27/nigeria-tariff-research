"""Cross-sector summary: effective tariff rate, primary policy tool, and AfCFTA
treatment side by side. This is the single table the paper/memo/deck/dashboard
should all cite when making the 3-sector comparison.

Reads data/processed/sector_comparison.csv, writes a chart to outputs/charts/
and the summary table to outputs/tables/.
"""
import pandas as pd
import matplotlib.pyplot as plt
from pathlib import Path
from _style import NAVY, ORANGE, GREEN, GRAY, apply_style, save

ROOT = Path(__file__).resolve().parent.parent
PROCESSED = ROOT / "data" / "processed"
CHARTS = ROOT / "outputs" / "charts"
TABLES = ROOT / "outputs" / "tables"
CHARTS.mkdir(parents=True, exist_ok=True)
TABLES.mkdir(parents=True, exist_ok=True)


def chart_effective_tariff_comparison():
    df = pd.read_csv(PROCESSED / "sector_comparison.csv")
    fig, ax = plt.subplots(figsize=(7, 4.5))
    colors = [NAVY, ORANGE, GREEN]
    ax.bar(df["sector"], df["effective_tariff_2025_pct"], color=colors, width=0.5, zorder=3)
    for i, (v, label) in enumerate(zip(df["effective_tariff_2025_pct"], df["effective_tariff_label"])):
        ax.text(i, v + 1.5, label, ha="center", fontsize=10, color=NAVY, fontweight="bold")
    apply_style(
        ax,
        "Effective tariff protection varies sharply across the 3 sectors",
        subtitle="Rice carries the heaviest tariff wall; petroleum has almost none — policy relies on other tools instead",
        ylabel="Effective tariff rate (%)",
        source="See data/raw/{petroleum,automobiles,rice}/sources.md for underlying citations",
    )
    plt.setp(ax.get_xticklabels(), rotation=0)
    save(fig, CHARTS / "sector_comparison_effective_tariff.png")


def table_summary():
    df = pd.read_csv(PROCESSED / "sector_comparison.csv")
    df.to_csv(TABLES / "sector_comparison_summary.csv", index=False)
    print(f"wrote {TABLES / 'sector_comparison_summary.csv'}")


if __name__ == "__main__":
    chart_effective_tariff_comparison()
    table_summary()
