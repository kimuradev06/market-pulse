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

import type { ExchangeRate } from "@/types/market";

export const usdJpy: ExchangeRate = {
    pair: "USD/JPY",
    price: 157.42,
    change: 0.38,
    changePercent: 0.24,
    dayHigh: 157.88,
    dayLow: 156.91,
    updatedAt: "2026-08-05 21:30 JST",
};