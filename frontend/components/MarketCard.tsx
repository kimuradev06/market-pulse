type MarketCardProps = {
    name: string;
    value: string;
    change: string;
    description: string;
};

export default function MarketCard({
    name,
    value,
    change,
    description,
}: MarketCardProps) {
    const isPositive = change.startsWith("+");

    return (
        <article className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">{name}</p>

            <p className="mt-3 text-2xl font-bold">{value}</p>

            <p
                className={`mt-2 text-sm font-semibold ${isPositive ? "text-emerald-400" : "text-rose-400"
                    }`}
            >
                {change}
            </p>

            <p className="mt-4 text-sm text-slate-400">{description}</p>
        </article>
    );
}