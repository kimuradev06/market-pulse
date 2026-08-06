"use client";

import { useState } from "react";
import type { YieldPoint } from "@/types/market";
import SectionHeading from "@/components/SectionHeading";

type YieldCurveChartProps = {
    jp: YieldPoint[];
    us: YieldPoint[];
};

type CurveTab = "jp" | "us";

// 依存追加を避けるための軽量な自作折れ線チャート（当日 vs 前日）。
function Chart({ data }: { data: YieldPoint[] }) {
    const width = 640;
    const height = 240;
    const padX = 44;
    const padY = 28;
    const innerW = width - padX * 2;
    const innerH = height - padY * 2;

    const values = data.flatMap((d) => [d.current, d.previous]);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min || 1;
    // 上下に余白を持たせる
    const yMin = min - range * 0.15;
    const yMax = max + range * 0.15;
    const yRange = yMax - yMin;

    const x = (i: number) => padX + (i / (data.length - 1)) * innerW;
    const y = (v: number) => padY + innerH - ((v - yMin) / yRange) * innerH;

    const toLine = (key: "current" | "previous") =>
        data.map((d, i) => `${x(i).toFixed(1)},${y(d[key]).toFixed(1)}`).join(" ");

    // Y軸グリッド（4本）
    const gridLines = Array.from({ length: 5 }, (_, i) => {
        const v = yMin + (yRange * i) / 4;
        return { v, y: y(v) };
    });

    return (
        <svg
            viewBox={`0 0 ${width} ${height}`}
            className="h-auto w-full"
            role="img"
            aria-label="イールドカーブ 当日と前日の比較"
        >
            {gridLines.map((g, i) => (
                <g key={i}>
                    <line
                        x1={padX}
                        x2={width - padX}
                        y1={g.y}
                        y2={g.y}
                        stroke="var(--color-border)"
                        strokeWidth="1"
                    />
                    <text
                        x={padX - 8}
                        y={g.y + 3}
                        textAnchor="end"
                        className="tabular"
                        fill="var(--color-muted)"
                        fontSize="10"
                    >
                        {g.v.toFixed(2)}
                    </text>
                </g>
            ))}

            {/* 前日カーブ（破線・グレー） */}
            <polyline
                points={toLine("previous")}
                fill="none"
                stroke="var(--color-muted)"
                strokeWidth="1.5"
                strokeDasharray="4 4"
            />
            {/* 当日カーブ（実線・シアン） */}
            <polyline
                points={toLine("current")}
                fill="none"
                stroke="var(--color-accent)"
                strokeWidth="2"
                strokeLinejoin="round"
            />
            {data.map((d, i) => (
                <circle
                    key={i}
                    cx={x(i)}
                    cy={y(d.current)}
                    r="3"
                    fill="var(--color-accent)"
                />
            ))}

            {/* X軸ラベル */}
            {data.map((d, i) => (
                <text
                    key={i}
                    x={x(i)}
                    y={height - 8}
                    textAnchor="middle"
                    fill="var(--color-muted)"
                    fontSize="10"
                >
                    {d.tenorLabel}
                </text>
            ))}
        </svg>
    );
}

export default function YieldCurveChart({ jp, us }: YieldCurveChartProps) {
    const [tab, setTab] = useState<CurveTab>("jp");
    const data = tab === "jp" ? jp : us;

    return (
        <section
            aria-labelledby="yield-curve-heading"
            className="rounded-lg border border-border bg-surface p-5"
        >
            <SectionHeading
                id="yield-curve-heading"
                eyebrow="Yield Curve"
                title="イールドカーブ"
                mock
                action={
                    <div
                        role="tablist"
                        aria-label="国債切り替え"
                        className="flex rounded-md border border-border bg-surface-2 p-0.5 text-xs"
                    >
                        {(
                            [
                                { key: "jp", label: "日本国債" },
                                { key: "us", label: "米国債" },
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

            <div className="mb-3 flex items-center gap-4 text-[11px]">
                <span className="flex items-center gap-1.5 text-foreground">
                    <span className="h-0.5 w-4 rounded bg-accent" aria-hidden />
                    当日
                </span>
                <span className="flex items-center gap-1.5 text-muted">
                    <span
                        className="h-0.5 w-4 rounded bg-muted"
                        style={{ backgroundImage: "none" }}
                        aria-hidden
                    />
                    前日（破線）
                </span>
            </div>

            <Chart data={data} />
        </section>
    );
}
