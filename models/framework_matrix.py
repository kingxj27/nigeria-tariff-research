"""The core cross-sector framework: tariff level vs. domestic supply-response
credibility. Visualizes the paper's central finding directly -- the vertical
axis (credibility) separates fast from weak substitution; the horizontal axis
(tariff level) does not.

credibility_y is illustrative/qualitative (grounded in the cited facts in
credibility_band and rationale, not a precision score) -- axis is labeled in
bands (Low/Medium/High), not numbers, to avoid implying false precision.
"""
import pandas as pd
import matplotlib.pyplot as plt
from pathlib import Path
from _style import NAVY, ORANGE, GREEN, GRAY, LIGHT_GRAY, apply_style, save

ROOT = Path(__file__).resolve().parent.parent
PROCESSED = ROOT / "data" / "processed"
CHARTS = ROOT / "outputs" / "charts"
TABLES = ROOT / "outputs" / "tables"
CHARTS.mkdir(parents=True, exist_ok=True)
TABLES.mkdir(parents=True, exist_ok=True)

COLOR_BY_SECTOR = {
    "Refined petroleum": NAVY,
    "Automobiles": ORANGE,
    "Rice/agriculture": GREEN,
}


def chart_framework_matrix():
    df = pd.read_csv(PROCESSED / "framework_matrix.csv")

    fig, ax = plt.subplots(figsize=(8, 6.2))

    # background bands: top = credible supply response, bottom = fragmented
    ax.axhspan(50, 108, color="#E4F0E9", zorder=0)
    ax.axhspan(0, 50, color="#FBEAE0", zorder=0)
    ax.text(45, 102, "CREDIBLE DOMESTIC SUPPLY RESPONSE", fontsize=8.5, color="#2F6B4C", fontweight="bold", va="top", ha="center")
    ax.text(45, 46, "FRAGMENTED / NO SCALED SUPPLY RESPONSE", fontsize=8.5, color="#B1542C", fontweight="bold", va="top", ha="center")

    label_va = {"Refined petroleum": ("bottom", 16), "Automobiles": ("top", -20), "Rice/agriculture": ("top", -20)}
    for _, row in df.iterrows():
        color = COLOR_BY_SECTOR[row["sector"]]
        ax.scatter(row["tariff_pct"], row["credibility_y"], s=420, color=color, zorder=3, edgecolors="white", linewidths=1.5)
        va, offset = label_va[row["sector"]]
        ax.annotate(
            f"{row['sector']}\n({row['tariff_pct']:g}% tariff)\n{row['outcome_label']}",
            xy=(row["tariff_pct"], row["credibility_y"]),
            xytext=(0, offset),
            textcoords="offset points",
            ha="center", va=va, fontsize=9, color=NAVY, fontweight="bold", linespacing=1.4,
        )

    ax.set_xlim(-5, 85)
    ax.set_ylim(0, 108)
    ax.set_xlabel("Effective tariff level (%)", fontsize=10, color=GRAY)
    ax.set_yticks([15, 50, 85])
    ax.set_yticklabels(["Low", "Medium", "High"])
    ax.set_ylabel("Domestic supply-response credibility", fontsize=10, color=GRAY)
    ax.spines["top"].set_visible(False)
    ax.spines["right"].set_visible(False)
    ax.spines["left"].set_color(LIGHT_GRAY)
    ax.spines["bottom"].set_color(LIGHT_GRAY)
    ax.tick_params(colors=GRAY, labelsize=9)

    apply_style(
        ax,
        "The variable that predicts substitution is the vertical axis, not the horizontal one",
        subtitle="Tariff level (x) vs. domestic supply-response credibility (y), by sector",
        source="Credibility positioning is qualitative, grounded in the cited evidence in Section 4 of the paper. Automobiles plotted at the midpoint of its 35-40% range.",
        source_offset=-50,
    )
    save(fig, CHARTS / "framework_matrix.png")


def table_framework_matrix():
    df = pd.read_csv(PROCESSED / "framework_matrix.csv")
    df.to_csv(TABLES / "framework_matrix.csv", index=False)
    print(f"wrote {TABLES / 'framework_matrix.csv'}")


if __name__ == "__main__":
    chart_framework_matrix()
    table_framework_matrix()
