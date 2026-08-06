import type {
    ExchangeRate,
    MarketSnapshot,
    SectorTile,
    YieldPoint,
    EconomicEvent,
    NewsItem,
    MorningBriefData,
} from "@/types/market";

// ===========================================================================
// 既存のモック（後方互換のため維持）
// ===========================================================================
export const marketItems = [
    {
        name: "日経平均",
        value: "42,180.40",
        change: "+1.24%",
        description: "国内株式は堅調",
    },
    {
        name: "S&P 500",
        value: "6,312.25",
        change: "+0.73%",
        description: "米国株は上昇",
    },
    {
        name: "USD / JPY",
        value: "147.32",
        change: "-0.42%",
        description: "円高方向に推移",
    },
    {
        name: "米国10年債利回り",
        value: "4.18%",
        change: "-0.05pt",
        description: "長期金利は低下",
    },
];

// 為替のフォールバック用モック（実データ取得失敗時にのみ利用）
export const usdJpy: ExchangeRate = {
    pair: "USD/JPY",
    price: 157.42,
    change: 0.38,
    changePercent: 0.24,
    dayHigh: 157.88,
    dayLow: 156.91,
    updatedAt: "2026-08-05 21:30 JST",
};

// ===========================================================================
// ⚠️ 以下はすべて UI 表示確認用のモックデータ（MOCK）。
//    実データではありません。将来的に各種データソースへ差し替えます。
//    USD/JPY のみ app/api/exchange-rate 経由の実データを使用します。
// ===========================================================================

// --- マーケットスナップショット（最重要 + 追加指標） ------------------------
export const MOCK_MARKET_SNAPSHOTS: MarketSnapshot[] = [
    {
        id: "n225",
        name: "日経平均",
        category: "指数",
        value: 42180.4,
        change: 516.2,
        changePercent: 1.24,
        dayHigh: 42310.1,
        dayLow: 41720.5,
        updatedAt: "15:00 JST",
        sparkline: [41720, 41880, 41950, 42010, 41980, 42120, 42180],
        unit: "index",
    },
    {
        id: "spx",
        name: "S&P 500",
        category: "指数",
        value: 6312.25,
        change: 45.7,
        changePercent: 0.73,
        dayHigh: 6320.4,
        dayLow: 6255.1,
        updatedAt: "16:00 EST",
        sparkline: [6266, 6278, 6290, 6285, 6301, 6308, 6312],
        unit: "index",
    },
    {
        id: "usdjpy",
        name: "USD/JPY",
        category: "為替",
        value: 157.42,
        change: 0.38,
        changePercent: 0.24,
        dayHigh: 157.88,
        dayLow: 156.91,
        updatedAt: "21:30 JST",
        sparkline: [156.9, 157.1, 157.05, 157.3, 157.2, 157.5, 157.42],
        unit: "currency",
    },
    {
        id: "jgb10",
        name: "日本国債10年",
        category: "利回り",
        value: 1.045,
        change: 0.015,
        changePercent: 1.46,
        dayHigh: 1.055,
        dayLow: 1.03,
        updatedAt: "15:00 JST",
        sparkline: [1.03, 1.032, 1.04, 1.038, 1.05, 1.048, 1.045],
        unit: "percent",
    },
    {
        id: "ust10",
        name: "米国10年国債",
        category: "利回り",
        value: 4.18,
        change: -0.05,
        changePercent: -1.18,
        dayHigh: 4.24,
        dayLow: 4.16,
        updatedAt: "16:00 EST",
        sparkline: [4.23, 4.22, 4.2, 4.19, 4.21, 4.19, 4.18],
        unit: "percent",
    },
    {
        id: "vix",
        name: "VIX",
        category: "ボラティリティ",
        value: 14.32,
        change: -0.86,
        changePercent: -5.67,
        dayHigh: 15.4,
        dayLow: 14.1,
        updatedAt: "16:00 EST",
        sparkline: [15.2, 15.0, 14.8, 14.9, 14.5, 14.4, 14.32],
        unit: "index",
    },
    // --- 追加指標 ---
    {
        id: "topix",
        name: "TOPIX",
        category: "指数",
        value: 2984.6,
        change: 28.4,
        changePercent: 0.96,
        dayHigh: 2991.2,
        dayLow: 2952.3,
        updatedAt: "15:00 JST",
        sparkline: [2952, 2960, 2971, 2968, 2980, 2988, 2984],
        unit: "index",
    },
    {
        id: "ndx",
        name: "NASDAQ",
        category: "指数",
        value: 20845.3,
        change: 182.6,
        changePercent: 0.88,
        dayHigh: 20890.1,
        dayLow: 20610.7,
        updatedAt: "16:00 EST",
        sparkline: [20660, 20710, 20780, 20760, 20820, 20860, 20845],
        unit: "index",
    },
    {
        id: "reit",
        name: "東証REIT指数",
        category: "指数",
        value: 1786.2,
        change: -6.4,
        changePercent: -0.36,
        dayHigh: 1795.8,
        dayLow: 1782.1,
        updatedAt: "15:00 JST",
        sparkline: [1794, 1792, 1790, 1788, 1789, 1785, 1786],
        unit: "index",
    },
    {
        id: "gold",
        name: "Gold",
        category: "商品",
        value: 2412.8,
        change: 12.3,
        changePercent: 0.51,
        dayHigh: 2418.5,
        dayLow: 2398.2,
        updatedAt: "16:00 EST",
        sparkline: [2399, 2403, 2408, 2405, 2410, 2414, 2412],
        unit: "commodity",
    },
    {
        id: "wti",
        name: "WTI原油",
        category: "商品",
        value: 78.44,
        change: -0.92,
        changePercent: -1.16,
        dayHigh: 79.6,
        dayLow: 78.1,
        updatedAt: "16:00 EST",
        sparkline: [79.4, 79.1, 78.8, 78.9, 78.6, 78.5, 78.44],
        unit: "commodity",
    },
];

// --- セクターヒートマップ --------------------------------------------------
// 日本株: TOPIX-17
export const MOCK_SECTORS_JP: SectorTile[] = [
    { id: "jp-food", name: "食品", changePercent: 0.42, weight: 6 },
    { id: "jp-energy", name: "エネルギー資源", changePercent: -1.12, weight: 4 },
    { id: "jp-construction", name: "建設・資材", changePercent: 0.88, weight: 7 },
    { id: "jp-materials", name: "素材・化学", changePercent: 1.34, weight: 9 },
    { id: "jp-pharma", name: "医薬品", changePercent: -0.56, weight: 8 },
    { id: "jp-autos", name: "自動車・輸送機", changePercent: 2.14, weight: 12 },
    { id: "jp-steel", name: "鉄鋼・非鉄", changePercent: 0.31, weight: 5 },
    { id: "jp-machinery", name: "機械", changePercent: 1.05, weight: 8 },
    { id: "jp-elec", name: "電機・精密", changePercent: 1.78, weight: 14 },
    { id: "jp-it", name: "情報通信・サービス他", changePercent: 0.94, weight: 11 },
    { id: "jp-power", name: "電力・ガス", changePercent: -0.22, weight: 3 },
    { id: "jp-transport", name: "運輸・物流", changePercent: 0.15, weight: 5 },
    { id: "jp-trading", name: "商社・卸売", changePercent: 1.42, weight: 9 },
    { id: "jp-retail", name: "小売", changePercent: -0.08, weight: 6 },
    { id: "jp-banks", name: "銀行", changePercent: 2.36, weight: 10 },
    { id: "jp-finance", name: "金融（除く銀行）", changePercent: 1.21, weight: 7 },
    { id: "jp-realestate", name: "不動産", changePercent: -0.74, weight: 5 },
];

// 米国株: GICS 11セクター
export const MOCK_SECTORS_US: SectorTile[] = [
    { id: "us-tech", name: "情報技術", changePercent: 1.62, weight: 28 },
    { id: "us-health", name: "ヘルスケア", changePercent: -0.34, weight: 13 },
    { id: "us-fin", name: "金融", changePercent: 0.85, weight: 12 },
    { id: "us-cons-disc", name: "一般消費財", changePercent: 1.18, weight: 10 },
    { id: "us-comm", name: "コミュニケーション", changePercent: 0.72, weight: 9 },
    { id: "us-industrials", name: "資本財", changePercent: 0.44, weight: 8 },
    { id: "us-cons-staples", name: "生活必需品", changePercent: -0.21, weight: 6 },
    { id: "us-energy", name: "エネルギー", changePercent: -1.45, weight: 4 },
    { id: "us-utilities", name: "公益事業", changePercent: 0.12, weight: 3 },
    { id: "us-realestate", name: "不動産", changePercent: -0.68, weight: 2 },
    { id: "us-materials", name: "素材", changePercent: 0.29, weight: 3 },
];

// --- イールドカーブ --------------------------------------------------------
export const MOCK_YIELD_CURVE_JP: YieldPoint[] = [
    { tenorLabel: "2年", tenorYears: 2, current: 0.42, previous: 0.4 },
    { tenorLabel: "5年", tenorYears: 5, current: 0.68, previous: 0.65 },
    { tenorLabel: "10年", tenorYears: 10, current: 1.045, previous: 1.03 },
    { tenorLabel: "20年", tenorYears: 20, current: 1.86, previous: 1.84 },
    { tenorLabel: "30年", tenorYears: 30, current: 2.12, previous: 2.1 },
];

export const MOCK_YIELD_CURVE_US: YieldPoint[] = [
    { tenorLabel: "2年", tenorYears: 2, current: 4.36, previous: 4.42 },
    { tenorLabel: "5年", tenorYears: 5, current: 4.18, previous: 4.24 },
    { tenorLabel: "10年", tenorYears: 10, current: 4.18, previous: 4.23 },
    { tenorLabel: "20年", tenorYears: 20, current: 4.52, previous: 4.55 },
    { tenorLabel: "30年", tenorYears: 30, current: 4.44, previous: 4.48 },
];

// --- 経済イベント ----------------------------------------------------------
export const MOCK_ECONOMIC_EVENTS: EconomicEvent[] = [
    { id: "ev1", time: "08:50", country: "日本", title: "日銀 金融政策決定会合（結果公表）", importance: "高" },
    { id: "ev2", time: "10:30", country: "その他", title: "豪 消費者物価指数（CPI）", importance: "中" },
    { id: "ev3", time: "15:30", country: "日本", title: "日銀総裁 記者会見", importance: "高" },
    { id: "ev4", time: "18:00", country: "欧州", title: "ユーロ圏 製造業PMI（確報）", importance: "低" },
    { id: "ev5", time: "21:30", country: "米国", title: "米 雇用統計（非農業部門雇用者数）", importance: "高" },
    { id: "ev6", time: "23:00", country: "米国", title: "米 ISM製造業景況指数", importance: "中" },
];

// --- 重要ニュース（見出し・出典のみ。本文は転載しない） --------------------
export const MOCK_TOP_NEWS: NewsItem[] = [
    {
        id: "news1",
        headline: "日銀、政策金利を据え置き 追加利上げには慎重姿勢",
        source: "MOCK通信",
        publishedAt: "08:52 JST",
        relatedAssets: ["USD/JPY", "日本国債10年", "日経平均"],
    },
    {
        id: "news2",
        headline: "米ハイテク株が続伸、半導体セクターが相場を牽引",
        source: "MOCK Markets",
        publishedAt: "16:10 EST",
        relatedAssets: ["NASDAQ", "S&P 500"],
    },
    {
        id: "news3",
        headline: "原油続落、需要見通しの下方修正を嫌気",
        source: "MOCKエナジー",
        publishedAt: "16:25 EST",
        relatedAssets: ["WTI原油", "エネルギー"],
    },
];

// --- モーニングブリーフ（現状はルールベース。将来 AI 要約へ） ----------------
export const MOCK_MORNING_BRIEF: MorningBriefData = {
    headline: "リスクオン継続、金利低下と円の小動きが下支え",
    points: [
        "米国株は主要3指数が揃って上昇。VIXは14台前半へ低下し、投資家心理は落ち着いている。",
        "米10年債利回りは4.18%へ低下。金利低下がグロース株を後押しする構図。",
        "USD/JPYは157円台で小動き。本日は日銀会合結果と総裁会見が最大の注目材料。",
        "日本株は自動車・銀行セクターが牽引し堅調。REITは金利観を睨み小幅安。",
        "21:30の米雇用統計を控え、欧米時間はポジション調整に留意。",
    ],
    generatedBy: "rule-based",
    generatedAt: "07:30 JST",
};
