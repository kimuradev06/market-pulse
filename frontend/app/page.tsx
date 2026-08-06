import type { ExchangeRate } from "@/types/market";
import {
  MOCK_MARKET_SNAPSHOTS,
  MOCK_SECTORS_JP,
  MOCK_SECTORS_US,
  MOCK_YIELD_CURVE_JP,
  MOCK_YIELD_CURVE_US,
  MOCK_ECONOMIC_EVENTS,
  MOCK_TOP_NEWS,
  MOCK_MORNING_BRIEF,
  usdJpy,
} from "@/data/mock";
import DashboardHeader from "@/components/DashboardHeader";
import MorningBrief from "@/components/MorningBrief";
import MarketSnapshot from "@/components/MarketSnapshot";
import SectorHeatmap from "@/components/SectorHeatmap";
import YieldCurveChart from "@/components/YieldCurveChart";
import EconomicCalendar from "@/components/EconomicCalendar";
import TopNews from "@/components/TopNews";

// USD/JPY の実データを取得する。取得可否は接続状態として扱う。
// 取得処理・API Route・環境変数は既存のまま維持している。
async function getExchangeRate(): Promise<{
  rate: ExchangeRate;
  isLive: boolean;
}> {
  try {
    const response = await fetch("http://localhost:3000/api/exchange-rate", {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("為替データの取得に失敗しました。");
    }

    const exchangeRate = (await response.json()) as ExchangeRate;
    return { rate: exchangeRate, isLive: true };
  } catch (error) {
    console.error("[v0] exchange-rate fetch failed:", error);
    // 取得失敗時は参考値（モック）にフォールバックし、UIは維持する。
    return { rate: usdJpy, isLive: false };
  }
}

export default async function Home() {
  const { rate, isLive } = await getExchangeRate();

  // 最重要指標（USD/JPY は実データカードで別途表示するため除外）
  const primaryIds = ["n225", "spx", "jgb10", "ust10", "vix"];
  const secondaryIds = ["topix", "ndx", "reit", "gold", "wti"];
  const primary = MOCK_MARKET_SNAPSHOTS.filter((m) => primaryIds.includes(m.id));
  const secondary = MOCK_MARKET_SNAPSHOTS.filter((m) =>
    secondaryIds.includes(m.id),
  );

  const lastUpdated = new Intl.DateTimeFormat("ja-JP", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(new Date());

  return (
    <div className="min-h-screen bg-background text-foreground">
      <DashboardHeader apiConnected={isLive} lastUpdated={lastUpdated} />

      <main className="mx-auto max-w-[1440px] space-y-6 px-4 py-6 sm:px-6">
        {/* モーニングブリーフ（横幅いっぱい） */}
        <MorningBrief brief={MOCK_MORNING_BRIEF} />

        {/* マーケットスナップショット */}
        <MarketSnapshot
          primary={primary}
          secondary={secondary}
          exchangeRate={rate}
          isLive={isLive}
        />

        {/* ヒートマップ + イールドカーブ（2カラム） */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <SectorHeatmap jp={MOCK_SECTORS_JP} us={MOCK_SECTORS_US} />
          <YieldCurveChart jp={MOCK_YIELD_CURVE_JP} us={MOCK_YIELD_CURVE_US} />
        </div>

        {/* 経済イベント + 重要ニュース（2カラム） */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <EconomicCalendar events={MOCK_ECONOMIC_EVENTS} />
          </div>
          <TopNews news={MOCK_TOP_NEWS} />
        </div>

        <footer className="border-t border-border/60 pt-4 text-center text-[11px] text-muted">
          Market Pulse — Morning Terminal ／ USD/JPY のみ実データ、その他は UI
          確認用のモックデータです。
        </footer>
      </main>
    </div>
  );
}
