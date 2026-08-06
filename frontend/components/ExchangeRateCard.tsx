import type { ExchangeRate } from "@/types/market";

type ExchangeRateCardProps = {
    rate: ExchangeRate;
    // 実データかフォールバック（モック）かを表示するためのフラグ
    isLive: boolean;
};

// USD/JPY は app/api/exchange-rate 経由の実データを表示する。
export default function ExchangeRateCard({ rate, isLive }: ExchangeRateCardProps) {
    const isPositive = rate.change >= 0;
    const trendColor = isPositive ? "text-up" : "text-down";

    const formattedPrice = rate.price.toFixed(3);
    const formattedChange = `${isPositive ? "+" : ""}${rate.change.toFixed(3)}`;
    const formattedChangePercent = `${isPositive ? "+" : ""}${rate.changePercent.toFixed(2)}%`;

    return (
        <article className="rounded-lg border border-accent/40 bg-surface p-4 ring-1 ring-accent/10">
            <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                    <h3 className="text-sm font-semibold text-foreground">{rate.pair}</h3>
                    <p className="mt-0.5 flex items-center gap-1.5 text-[11px] uppercase tracking-wide text-muted">
                        為替
                        <span
                            className={`inline-flex items-center gap-1 rounded px-1 py-0.5 text-[10px] font-semibold normal-case tracking-normal ${isLive
                                    ? "bg-accent/10 text-accent"
                                    : "bg-muted/10 text-muted"
                                }`}
                        >
                            <span
                                className={`h-1.5 w-1.5 rounded-full ${isLive ? "bg-accent" : "bg-muted"
                                    }`}
                                aria-hidden
                            />
                            {isLive ? "実データ" : "参考値"}
                        </span>
                    </p>
                </div>
                <span
                    className={`shrink-0 rounded px-1.5 py-0.5 text-[11px] font-semibold tabular ${isPositive ? "bg-up/10 text-up" : "bg-down/10 text-down"
                        }`}
                >
                    {formattedChangePercent}
                </span>
            </div>

            <p className="tabular mt-3 text-2xl font-bold text-foreground">
                {formattedPrice}
            </p>

            <p className={`tabular mt-1 text-sm font-medium ${trendColor}`}>
                {formattedChange}
            </p>

            <dl className="mt-3 grid grid-cols-2 gap-2 border-t border-border/60 pt-3 text-xs">
                <div>
                    <dt className="text-muted">当日高値</dt>
                    <dd className="tabular mt-0.5 font-medium text-foreground">
                        {rate.dayHigh.toFixed(3)}
                    </dd>
                </div>
                <div>
                    <dt className="text-muted">当日安値</dt>
                    <dd className="tabular mt-0.5 font-medium text-foreground">
                        {rate.dayLow.toFixed(3)}
                    </dd>
                </div>
            </dl>

            <p className="mt-3 text-[11px] text-muted">{rate.updatedAt} 更新</p>
        </article>
    );
}
