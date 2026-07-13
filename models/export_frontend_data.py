"""Export data/processed/*.csv into frontend/src/data/*.json for the dashboard.

Run after any change to data/processed/ so the dashboard stays in sync with the
same source data used by the paper, memo, and deck.
"""
import json
from pathlib import Path
import pandas as pd

ROOT = Path(__file__).resolve().parent.parent
PROCESSED = ROOT / "data" / "processed"
OUT = ROOT / "frontend" / "src" / "data"
OUT.mkdir(parents=True, exist_ok=True)

FILES = [
    "petroleum_pms_import_value",
    "petroleum_pms_import_value_quarterly",
    "petroleum_tariff_timeline",
    "petroleum_dangote_capacity",
    "automobiles_naddc_capacity",
    "automobiles_tariff_timeline",
    "automobiles_import_value",
    "rice_tariff_timeline",
    "rice_production",
    "rice_imports",
    "rice_smuggling_seizures",
    "afcfta_category_framework",
    "afcfta_sector_classification",
    "sector_comparison",
    "framework_matrix",
]

for name in FILES:
    df = pd.read_csv(PROCESSED / f"{name}.csv")
    # pandas float columns coerce None back to NaN, and json.dumps emits bare
    # NaN tokens that aren't valid JSON (JSON.parse in the browser rejects
    # them) -- df.to_json() handles this NaN->null conversion correctly.
    records = json.loads(df.to_json(orient="records"))
    out_path = OUT / f"{name}.json"
    out_path.write_text(json.dumps(records, indent=2), encoding="utf-8")
    print(f"wrote {out_path} ({len(records)} rows)")
