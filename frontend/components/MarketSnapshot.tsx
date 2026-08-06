import type { ExchangeRate, MarketSnapshot as MarketSnapshotType } from "@/types/market";
import MarketCard from "@/components/MarketCard";
import ExchangeRateCard from "@/components/ExchangeRateCard";
import SectionHeading from "@/components/SectionHeading";

type MarketSnapshotProps = {
    // 最重要指標（USD/JPY を除く。USD/JPY は実データカードで表示）
    primary: MarketSnapshotType[];
    // 追加指標
    secondary: MarketSnapshotType[];
    // USD/JPY 実データ
    exchangeRate: ExchangeRate;
    // 実データ取得の成否
    isLive: boolean;
};

export default function MarketSnapshot({
    primary,
    secondary,
    exchangeRate,
    isLive,
}: MarketSnapshotProps) {
    return (
        <section aria-labelledby="market-snapshot-heading">
            <SectionHeading
                id="market-snapshot-heading"
                eyebrow="Market Snapshot"
                title="マーケットスナップショット"
            />

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {/* USD/JPY は実データを最優先で表示 */}
                <ExchangeRateCard rate={exchangeRate} isLive={isLive} />
                {primary.map((item) => (
                    <MarketCard key={item.id} item={item} highlight />
                ))}
            </div>

            <h3 className="mt-6 mb-3 text-xs font-semibold uppercase tracking-widest text-muted">
                追加指標
            </h3>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                {secondary.map((item) => (
                    <MarketCard key={item.id} item={item} />
                ))}
            </div>
        </section>
    );
}
