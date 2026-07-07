"""Shared matplotlib styling for consulting-style charts across all sector scripts."""
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt

NAVY = "#1B2A4A"
ORANGE = "#D9822B"
GRAY = "#8C96A3"
LIGHT_GRAY = "#D6DAE0"
GREEN = "#3F7A5E"

PALETTE = [NAVY, ORANGE, GREEN, GRAY]


def apply_style(ax, title, subtitle=None, ylabel=None, source=None, source_offset=-32):
    """source_offset: vertical offset in points from the axes bottom edge (negative = below)."""
    ax.annotate(
        title, xy=(0, 1), xycoords="axes fraction", xytext=(0, 30 if subtitle else 10),
        textcoords="offset points", fontsize=13, fontweight="bold", color=NAVY, ha="left", va="bottom",
    )
    if subtitle:
        ax.annotate(
            subtitle, xy=(0, 1), xycoords="axes fraction", xytext=(0, 10),
            textcoords="offset points", fontsize=9.5, color=GRAY, ha="left", va="bottom",
        )
    if ylabel:
        ax.set_ylabel(ylabel, fontsize=9.5, color=GRAY)
    ax.spines["top"].set_visible(False)
    ax.spines["right"].set_visible(False)
    ax.spines["left"].set_color(LIGHT_GRAY)
    ax.spines["bottom"].set_color(LIGHT_GRAY)
    ax.tick_params(colors=GRAY, labelsize=9)
    ax.grid(axis="y", color=LIGHT_GRAY, linewidth=0.7, zorder=0)
    ax.set_axisbelow(True)
    if source:
        ax.annotate(
            f"Source: {source}", xy=(0, 0), xycoords="axes fraction", xytext=(0, source_offset),
            textcoords="offset points", fontsize=7.5, color=GRAY, ha="left", va="top",
        )


def save(fig, path):
    fig.savefig(path, dpi=200, bbox_inches="tight", pad_inches=0.35, facecolor="white")
    plt.close(fig)
    print(f"wrote {path}")
