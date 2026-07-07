"""Automobile sector: tariff-protection-vs-capacity-utilization gap, and import value trend.

Reads data/processed/automobiles_*.csv, writes charts to outputs/charts/ and
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


def chart_capacity_utilization():
    df = pd.read_csv(PROCESSED / "automobiles_naddc_capacity.csv").sort_values("utilization_pct", ascending=True)
    agg_util = df["actual_units_per_year"].sum() / df["installed_units_per_year"].sum() * 100

    fig, ax = plt.subplots(figsize=(7.5, 9.5))
    colors = [GREEN if u >= 60 else (ORANGE if u < 20 else NAVY) for u in df["utilization_pct"]]
    ax.barh(df["company"], df["utilization_pct"], color=colors, zorder=3, height=0.65)
    ax.set_xlim(0, 88)
    ax.axvline(agg_util, color=GRAY, linestyle="--", linewidth=1.2, zorder=2)
    ax.text(
        80, len(df) - 3, f"Sector\naggregate:\n{agg_util:.0f}%",
        fontsize=8.5, color=GRAY, va="top", ha="center",
    )
    apply_style(
        ax,
        "Licensed auto assemblers operate far below installed capacity",
        subtitle="Utilization rate by company, despite a 0-10% tariff wall protecting local assembly (Apr 2024 NADDC data)",
        ylabel=None,
        source="NADDC, 'Automotive Companies Under NAIDP That Are In Full Commercial Operation,' April 2024",
        source_offset=-28,
    )
    ax.set_xlabel("Capacity utilization (%)", fontsize=9.5, color=GRAY)
    ax.tick_params(axis="y", labelsize=7.5)
    save(fig, CHARTS / "automobiles_naddc_utilization.png")


def chart_tariff_differential():
    df = pd.read_csv(PROCESSED / "automobiles_tariff_timeline.csv")
    snap = df[df["date"] == "2022-01-01"].copy()
    snap["combined_pct"] = snap["combined_pct"].fillna(0)
    fig, ax = plt.subplots(figsize=(7, 4.2))
    labels = ["Used\nvehicles", "New\nvehicles", "CKD kits\n(licensed)", "SKD kits\n(licensed)"]
    values = [35, 40, 0, 10]
    colors = [NAVY, NAVY, GREEN, GREEN]
    ax.bar(labels, values, color=colors, width=0.55, zorder=3)
    for i, v in enumerate(values):
        ax.text(i, v + 1, f"{v}%", ha="center", fontsize=10, color=NAVY, fontweight="bold")
    apply_style(
        ax,
        "The tariff wall favoring local assembly, 2022-2025",
        subtitle="Combined duty + levy: fully-built imports vs. kits for licensed assemblers",
        ylabel="Combined duty + levy (%)",
        source="trade.gov Nigeria Country Commercial Guide, 'Nigeria - Import Tariffs'",
    )
    save(fig, CHARTS / "automobiles_tariff_differential.png")


def chart_import_value_trend():
    df = pd.read_csv(PROCESSED / "automobiles_import_value.csv")
    fig, ax = plt.subplots(figsize=(7.5, 4.2))
    for series, color, marker in [("used_vehicle_imports", NAVY, "o"), ("passenger_car_imports", ORANGE, "s")]:
        sub = df[df["series"] == series]
        ax.plot(sub["year"].astype(str), sub["value_ngn_billion"], color=color, marker=marker, linewidth=2, label=series.replace("_", " "), zorder=3)
    ax.legend(frameon=False, fontsize=8.5, loc="upper left")
    apply_style(
        ax,
        "Vehicle import value, 2022-2024",
        subtitle="Two distinct NBS-attributed series (scope overlap not reconciled) both spike 2022→2023, then diverge",
        ylabel="₦ billion",
        source="NBS via Nairametrics, Mar 2024 and Mar 2025",
    )
    save(fig, CHARTS / "automobiles_import_value_trend.png")


def table_naddc_capacity_summary():
    df = pd.read_csv(PROCESSED / "automobiles_naddc_capacity.csv")
    summary = pd.DataFrame({
        "installed_total": [df["installed_units_per_year"].sum()],
        "actual_total": [df["actual_units_per_year"].sum()],
        "aggregate_utilization_pct": [round(df["actual_units_per_year"].sum() / df["installed_units_per_year"].sum() * 100, 1)],
        "n_companies": [len(df)],
        "n_above_60pct": [len(df[df["utilization_pct"] >= 60])],
        "n_below_20pct": [len(df[df["utilization_pct"] < 20])],
    })
    summary.to_csv(TABLES / "automobiles_naddc_summary.csv", index=False)
    print(f"wrote {TABLES / 'automobiles_naddc_summary.csv'}")


def table_tariff_timeline():
    df = pd.read_csv(PROCESSED / "automobiles_tariff_timeline.csv")
    df.to_csv(TABLES / "automobiles_tariff_timeline.csv", index=False)
    print(f"wrote {TABLES / 'automobiles_tariff_timeline.csv'}")


if __name__ == "__main__":
    chart_capacity_utilization()
    chart_tariff_differential()
    chart_import_value_trend()
    table_naddc_capacity_summary()
    table_tariff_timeline()
