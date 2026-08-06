// 為替の実データ型（既存・維持）
export type ExchangeRate = {
    pair: string;
    price: number;
    change: number;
    changePercent: number;
    dayHigh: number;
    dayLow: number;
    updatedAt: string;
};

// ---------------------------------------------------------------------------
// 以下はダッシュボードUI用の型。
// 現段階では data/mock.ts のモックデータで利用する。
// 将来的に実データAPIへ差し替える際も、UIはこの型に依存する。
// ---------------------------------------------------------------------------

// マーケットスナップショットの1指標
export type MarketSnapshot = {
    id: string;
    // 指標名（日本語）
    name: string;
    // 表示単位カテゴリ（指数 / 為替 / 利回り / 商品 など）
    category: "指数" | "為替" | "利回り" | "商品" | "ボラティリティ";
    // 現在値
    value: number;
    // 前日比（絶対値）
    change: number;
    // 騰落率（%）。利回り系は pt 差を入れる運用も可
    changePercent: number;
    // 当日高値・安値
    dayHigh: number;
    dayLow: number;
    // 更新時刻（表示用文字列）
    updatedAt: string;
    // スパークライン用の系列（直近の値）
    sparkline: number[];
    // 値のフォーマット種別
    unit: "index" | "currency" | "percent" | "commodity";
};

// セクターヒートマップのタイル
export type SectorTile = {
    id: string;
    // セクター名
    name: string;
    // 騰落率（%）
    changePercent: number;
    // 将来: タイルサイズを時価総額に対応させるための重み（現状は未使用/参考値）
    weight: number;
};

// イールドカーブの1点
export type YieldPoint = {
    // 年限ラベル（2年 / 5年 ...）
    tenorLabel: string;
    // 年限（年）— X軸ソート用
    tenorYears: number;
    // 当日利回り（%）
    current: number;
    // 前日利回り（%）
    previous: number;
};

// 経済イベント
export type EconomicEvent = {
    id: string;
    // 予定時刻（表示用）
    time: string;
    // 国・地域
    country: "日本" | "米国" | "欧州" | "その他";
    // イベント名
    title: string;
    // 重要度
    importance: "高" | "中" | "低";
};

// 重要ニュース（見出し・出典のみ。本文は転載しない）
export type NewsItem = {
    id: string;
    // 見出し
    headline: string;
    // 情報源
    source: string;
    // 公開時刻（表示用）
    publishedAt: string;
    // 関連資産
    relatedAssets: string[];
    // 出典リンク（任意）
    url?: string;
};

// モーニングブリーフ（将来 Amazon Bedrock のAI要約に差し替え可能）
export type MorningBriefData = {
    // 概況の見出し
    headline: string;
    // 重要ポイント（3〜5行）
    points: string[];
    // 生成方式（現状はルールベース、将来 "ai"）
    generatedBy: "rule-based" | "ai";
    // 生成時刻（表示用）
    generatedAt: string;
};
