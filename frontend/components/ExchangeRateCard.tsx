import type { ExchangeRate } from "@/types/market";

type ExchangeRateCardProps = {
    rate: ExchangeRate;
};

export default function ExchangeRateCard({
    rate,
}: ExchangeRateCardProps) {
    const isPositive = rate.change >= 0;

    const formattedPrice = rate.price.toFixed(3);
    const formattedChange = `${isPositive ? "+" : ""}${rate.change.toFixed(3)}`;
    const formattedChangePercent =
        `${isPositive ? "+" : ""}${rate.changePercent.toFixed(2)}%`;

    return (
        <article className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <p className="text-sm text-slate-400">為替</p>
                    <h3 className="mt-1 text-lg font-semibold">{rate.pair}</h3>
                </div>

                <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${isPositive
                            ? "bg-emerald-400/10 text-emerald-400"
                            : "bg-rose-400/10 text-rose-400"
                        }`}
                >
                    {formattedChangePercent}
                </span>
            </div>

            <p className="mt-6 text-3xl font-bold">{formattedPrice}</p>

            <p
                className={`mt-2 text-sm font-semibold ${isPositive ? "text-emerald-400" : "text-rose-400"
                    }`}
            >
                {formattedChange}
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-slate-950 p-3">
                    <p className="text-xs text-slate-500">本日高値</p>
                    <p className="mt-1 font-semibold">{rate.dayHigh.toFixed(3)}</p>
                </div>

                <div className="rounded-xl bg-slate-950 p-3">
                    <p className="text-xs text-slate-500">本日安値</p>
                    <p className="mt-1 font-semibold">{rate.dayLow.toFixed(3)}</p>
                </div>
            </div>

            <p className="mt-4 text-xs text-slate-500">
                {rate.updatedAt} 更新
            </p>
        </article>
    );
}