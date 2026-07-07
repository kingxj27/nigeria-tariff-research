"""Refined petroleum sector: import-value trend vs. Dangote refinery ramp-up, and tariff timeline.

Reads data/processed/petroleum_*.csv, writes charts to outputs/charts/ and
summary tables to outputs/tables/.
"""
import pandas as pd
import matplotlib.pyplot as plt
from pathlib import Path
from _style import NAVY, ORANGE, GRAY, apply_style, save

ROOT = Path(__file__).resolve().parent.parent
PROCESSED = ROOT / "data" / "processed"
CHARTS = ROOT / "outputs" / "charts"
TABLES = ROOT / "outputs" / "tables"
CHARTS.mkdir(parents=True, exist_ok=True)
TABLES.mkdir(parents=True, exist_ok=True)

SOURCE = "NBS Foreign Trade Statistics via Nairametrics/Businessday/Daily Trust, 2025-2026"


def chart_annual_import_value():
    df = pd.read_csv(PROCESSED / "petroleum_pms_import_value.csv")
    fig, ax = plt.subplots(figsize=(7.5, 4.2))
    colors = [NAVY] * len(df)
    colors[df.index[df["year"] == 2024][0]] = ORANGE
    colors[df.index[df["year"] == 2025][0]] = "#3F7A5E"
    ax.bar(df["year"].astype(str), df["value_ngn_trillion"], color=colors, width=0.6, zorder=3)
    ax.set_ylim(0, 18)
    ax.annotate(
        "2024 spike is ~naira\ndepreciation (40.9%),\nnot import volume",
        xy=("2024", 15.42), xytext=(1.6, 16.6),
        fontsize=8, color=ORANGE, ha="center", va="top",
        arrowprops=dict(arrowstyle="->", color=ORANGE, lw=1),
    )
    ax.annotate(
        "2025 drop: Dangote\nramp-up displacing\nimports",
        xy=("2025", 8.96), xytext=(4.6, 12.5),
        fontsize=8, color="#3F7A5E", ha="center",
        arrowprops=dict(arrowstyle="->", color="#3F7A5E", lw=1),
    )
    apply_style(
        ax,
        "Nigeria's PMS (petrol) import bill, 2020-2025",
        subtitle="Naira value of imports — a value spike is not the same as a volume spike",
        ylabel="₦ trillion",
        source=SOURCE,
    )
    save(fig, CHARTS / "petroleum_pms_import_value_annual.png")


def chart_quarterly_2023_2025():
    df = pd.read_csv(PROCESSED / "petroleum_pms_import_value_quarterly.csv")
    df["label"] = df["year"].astype(str) + " " + df["quarter"]
    fig, ax = plt.subplots(figsize=(8.5, 4.2))
    ax.plot(df["label"], df["value_ngn_trillion"], color=NAVY, marker="o", linewidth=2, zorder=3)
    ax.fill_between(range(len(df)), df["value_ngn_trillion"], color=NAVY, alpha=0.08, zorder=2)
    apply_style(
        ax,
        "Quarterly PMS import bill, 2023-2025",
        subtitle="Volatile quarter-to-quarter, but every 2025 quarter sits below the 2024 Q1 peak of ₦3.81tn",
        ylabel="₦ trillion",
        source=SOURCE + "; Q1 2025 figure conflicts across sources (₦1.76tn vs ₦2.27tn), flagged unreconciled",
        source_offset=-65,
    )
    plt.setp(ax.get_xticklabels(), rotation=45, ha="right")
    save(fig, CHARTS / "petroleum_pms_import_value_quarterly.png")


def table_tariff_timeline():
    df = pd.read_csv(PROCESSED / "petroleum_tariff_timeline.csv")
    df.to_csv(TABLES / "petroleum_tariff_timeline.csv", index=False)
    print(f"wrote {TABLES / 'petroleum_tariff_timeline.csv'}")


def table_dangote_capacity():
    df = pd.read_csv(PROCESSED / "petroleum_dangote_capacity.csv")
    df.to_csv(TABLES / "petroleum_dangote_capacity.csv", index=False)
    print(f"wrote {TABLES / 'petroleum_dangote_capacity.csv'}")


if __name__ == "__main__":
    chart_annual_import_value()
    chart_quarterly_2023_2025()
    table_tariff_timeline()
    table_dangote_capacity()
