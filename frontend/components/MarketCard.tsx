import type { MarketSnapshot } from "@/types/market";
import { formatValue, formatChange, formatPercent } from "@/lib/format";
import Sparkline from "@/components/Sparkline";

type MarketCardProps = {
    item: MarketSnapshot;
    // 最重要指標を強調表示する
    highlight?: boolean;
};

export default function MarketCard({ item, highlight = false }: MarketCardProps) {
    const isPositive = item.change >= 0;
    const trendColor = isPositive ? "text-up" : "text-down";

    return (
        <article
            className={`rounded-lg border bg-surface p-4 transition-colors hover:border-accent/40 ${highlight ? "border-border" : "border-border/60"
                }`}
        >
            <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                    <h3 className="truncate text-sm font-semibold text-foreground">
                        {item.name}
                    </h3>
                    <p className="mt-0.5 text-[11px] uppercase tracking-wide text-muted">
                        {item.category}
                    </p>
                </div>
                <span
                    className={`shrink-0 rounded px-1.5 py-0.5 text-[11px] font-semibold tabular ${isPositive ? "bg-up/10 text-up" : "bg-down/10 text-down"
                        }`}
                >
                    {formatPercent(item.changePercent)}
                </span>
            </div>

            <div className="mt-3 flex items-end justify-between gap-2">
                <p className="tabular text-2xl font-bold text-foreground">
                    {formatValue(item.value, item.unit)}
                </p>
                <Sparkline data={item.sparkline} positive={isPositive} className="mb-1" />
            </div>

            <p className={`mt-1 tabular text-sm font-medium ${trendColor}`}>
                {formatChange(item.change, item.unit)}
            </p>

            <dl className="mt-3 grid grid-cols-2 gap-2 border-t border-border/60 pt-3 text-xs">
                <div>
                    <dt className="text-muted">当日高値</dt>
                    <dd className="tabular mt-0.5 font-medium text-foreground">
                        {formatValue(item.dayHigh, item.unit)}
                    </dd>
                </div>
                <div>
                    <dt className="text-muted">当日安値</dt>
                    <dd className="tabular mt-0.5 font-medium text-foreground">
                        {formatValue(item.dayLow, item.unit)}
                    </dd>
                </div>
            </dl>

            <p className="mt-3 text-[11px] text-muted">{item.updatedAt} 更新</p>
        </article>
    );
}
