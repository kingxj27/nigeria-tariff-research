"""Rice/agriculture sector: 70% tariff wall vs. persistent import dependence and smuggling.

Reads data/processed/rice_*.csv, writes charts to outputs/charts/ and
summary tables to outputs/tables/.
"""
import pandas as pd
import matplotlib.pyplot as plt
from pathlib import Path
from _style import NAVY, ORANGE, GRAY, GREEN, apply_style, save

ROOT = Path(__file__).resolve().parent.parent
PROCESSED = ROOT / "data" / "processed"
CHARTS = ROOT / "outputs" / "charts"
TABLES = ROOT / "outputs" / "tables"
CHARTS.mkdir(parents=True, exist_ok=True)
TABLES.mkdir(parents=True, exist_ok=True)


def chart_production_vs_imports():
    prod = pd.read_csv(PROCESSED / "rice_production.csv")
    prod = prod[prod["source_series"] == "USDA_FAS"].copy()
    imports = pd.read_csv(PROCESSED / "rice_imports.csv")
    imports = imports[imports["marketing_year"].isin(prod["marketing_year"])].copy()

    labels = ["2022/23", "2023/24", "2024/25 (forecast)"]
    fig, ax = plt.subplots(figsize=(7.5, 4.5))
    x = range(len(labels))
    width = 0.35
    ax.bar([i - width / 2 for i in x], prod["milled_mmt"], width=width, color=NAVY, label="Domestic milled production", zorder=3)
    ax.bar([i + width / 2 for i in x], imports["import_mmt"], width=width, color=ORANGE, label="Imports", zorder=3)
    ax.set_xticks(list(x))
    ax.set_xticklabels(labels)
    ax.legend(frameon=False, fontsize=8.5, loc="upper right")
    apply_style(
        ax,
        "Nigeria still imports roughly a fifth of its rice despite a 70% tariff",
        subtitle="Domestic milled production vs. imports, USDA FAS marketing-year estimates",
        ylabel="Million metric tons",
        source="USDA FAS, Grain and Feed Annual NI2024-0002, 13 Mar 2024",
    )
    save(fig, CHARTS / "rice_production_vs_imports.png")


def table_smuggling_seizures():
    # Not charted: the three seizure events span different, non-comparable time
    # windows (a full quarter vs. a 5-day patrol vs. a 40-day corridor total), so a
    # bar chart would visually imply a trend/decline that the data doesn't support.
    df = pd.read_csv(PROCESSED / "rice_smuggling_seizures.csv")
    df.to_csv(TABLES / "rice_smuggling_seizures.csv", index=False)
    print(f"wrote {TABLES / 'rice_smuggling_seizures.csv'}")


def table_tariff_timeline():
    df = pd.read_csv(PROCESSED / "rice_tariff_timeline.csv")
    df.to_csv(TABLES / "rice_tariff_timeline.csv", index=False)
    print(f"wrote {TABLES / 'rice_tariff_timeline.csv'}")


def table_production_import_gap():
    prod = pd.read_csv(PROCESSED / "rice_production.csv")
    prod = prod[prod["source_series"] == "USDA_FAS"][["marketing_year", "milled_mmt"]]
    imports = pd.read_csv(PROCESSED / "rice_imports.csv")[["marketing_year", "import_mmt"]]
    merged = prod.merge(imports, on="marketing_year", how="left")
    merged["self_sufficiency_pct"] = (merged["milled_mmt"] / (merged["milled_mmt"] + merged["import_mmt"]) * 100).round(1)
    merged.to_csv(TABLES / "rice_production_import_gap.csv", index=False)
    print(f"wrote {TABLES / 'rice_production_import_gap.csv'}")


if __name__ == "__main__":
    chart_production_vs_imports()
    table_smuggling_seizures()
    table_tariff_timeline()
    table_production_import_gap()
