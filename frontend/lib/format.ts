import type { MarketSnapshot } from "@/types/market";

// 値のフォーマット（種別ごとに桁数と単位を切り替え）
export function formatValue(value: number, unit: MarketSnapshot["unit"]): string {
    switch (unit) {
        case "percent":
            return `${value.toFixed(3)}%`;
        case "currency":
            return value.toFixed(2);
        case "commodity":
            return value.toLocaleString("ja-JP", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            });
        case "index":
        default:
            return value.toLocaleString("ja-JP", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            });
    }
}

// 前日比の符号付きフォーマット
export function formatChange(change: number, unit: MarketSnapshot["unit"]): string {
    const sign = change > 0 ? "+" : "";
    if (unit === "percent") {
        // 利回りは pt 表記
        return `${sign}${change.toFixed(3)}pt`;
    }
    return `${sign}${change.toLocaleString("ja-JP", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })}`;
}

// 騰落率（%）の符号付きフォーマット
export function formatPercent(percent: number): string {
    const sign = percent > 0 ? "+" : "";
    return `${sign}${percent.toFixed(2)}%`;
}
