"use client";

import { useState } from "react";
import type { SectorTile } from "@/types/market";
import SectionHeading from "@/components/SectionHeading";
import { formatPercent } from "@/lib/format";

type SectorHeatmapProps = {
    jp: SectorTile[];
    us: SectorTile[];
};

type MarketTab = "jp" | "us";

// 騰落率に応じた背景色（緑=上昇 / 赤=下落）。強度を透明度で表現。
function tileStyle(changePercent: number): React.CSSProperties {
    const clamped = Math.max(-3, Math.min(3, changePercent));
    const intensity = Math.min(0.85, 0.15 + (Math.abs(clamped) / 3) * 0.7);
    const color = changePercent >= 0 ? "52, 211, 153" : "244, 63, 94"; // up / down (RGB)
    return { backgroundColor: `rgba(${color}, ${intensity})` };
}

export default function SectorHeatmap({ jp, us }: SectorHeatmapProps) {
    const [tab, setTab] = useState<MarketTab>("jp");
    const tiles = tab === "jp" ? jp : us;
    const caption = tab === "jp" ? "TOPIX-17 業種別" : "GICS 11セクター";

    return (
        <section
            aria-labelledby="sector-heatmap-heading"
            className="rounded-lg border border-border bg-surface p-5"
        >
            <SectionHeading
                id="sector-heatmap-heading"
                eyebrow="Sector Heatmap"
                title="セクターヒートマップ"
                mock
                action={
                    <div
                        role="tablist"
                        aria-label="市場切り替え"
                        className="flex rounded-md border border-border bg-surface-2 p-0.5 text-xs"
                    >
                        {(
                            [
                                { key: "jp", label: "日本株" },
                                { key: "us", label: "米国株" },
                            ] as const
                        ).map((t) => (
                            <button
                                key={t.key}
                                role="tab"
                                aria-selected={tab === t.key}
                                onClick={() => setTab(t.key)}
                                className={`rounded px-3 py-1 font-semibold transition-colors ${tab === t.key
                                        ? "bg-accent/20 text-accent"
                                        : "text-muted hover:text-foreground"
                                    }`}
                            >
                                {t.label}
                            </button>
                        ))}
                    </div>
                }
            />

            <p className="mb-3 text-[11px] text-muted">{caption}</p>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                {tiles.map((tile) => (
                    <div
                        key={tile.id}
                        style={tileStyle(tile.changePercent)}
                        className="flex min-h-[74px] flex-col justify-between rounded-md p-2.5 text-slate-950"
                    >
                        <span className="text-[11px] font-semibold leading-tight text-pretty">
                            {tile.name}
                        </span>
                        <span className="tabular text-sm font-bold">
                            {formatPercent(tile.changePercent)}
                        </span>
                    </div>
                ))}
            </div>

            <p className="mt-3 text-[11px] text-muted">
                ※ タイル色は騰落率に対応。将来的にタイルの大きさを時価総額に対応させる予定です。
            </p>
        </section>
    );
}
