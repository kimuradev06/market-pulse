"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

type DashboardHeaderProps = {
    // API接続状態（サーバー側の実データ取得可否）
    apiConnected: boolean;
    // 最終更新時刻（サーバーでのデータ取得時刻）
    lastUpdated: string;
};

function formatClock(date: Date): string {
    return new Intl.DateTimeFormat("ja-JP", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        weekday: "short",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
    }).format(date);
}

export default function DashboardHeader({
    apiConnected,
    lastUpdated,
}: DashboardHeaderProps) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [now, setNow] = useState<string>("");

    useEffect(() => {
        const tick = () => setNow(formatClock(new Date()));
        tick();
        const id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, []);

    const handleRefresh = () => {
        // サーバーコンポーネントを再取得（実データを再フェッチ）
        startTransition(() => router.refresh());
    };

    return (
        <header className="sticky top-0 z-20 border-b border-border bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/70">
            <div className="mx-auto flex max-w-[1440px] flex-col gap-3 px-4 py-3 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-center gap-3">
                    <div
                        className="flex h-9 w-9 items-center justify-center rounded-md bg-accent/15 text-accent"
                        aria-hidden
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path
                                d="M3 17l5-6 4 4 6-8"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M18 7h3v3"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                    <div>
                        <h1 className="text-lg font-bold tracking-tight text-foreground">
                            Market Pulse
                        </h1>
                        <p className="text-[11px] text-muted">Morning Terminal</p>
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                    <div className="tabular text-sm font-medium text-foreground">
                        <span className="sr-only">現在日時: </span>
                        {now || "\u00a0"}
                    </div>

                    <div className="text-xs text-muted">
                        最終更新{" "}
                        <span className="tabular font-medium text-foreground">
                            {lastUpdated}
                        </span>
                    </div>

                    <div
                        className="flex items-center gap-1.5 text-xs"
                        role="status"
                        aria-live="polite"
                    >
                        <span
                            className={`h-2 w-2 rounded-full ${apiConnected ? "bg-up" : "bg-down"
                                }`}
                            aria-hidden
                        />
                        <span className={apiConnected ? "text-up" : "text-down"}>
                            {apiConnected ? "API接続中" : "API未接続"}
                        </span>
                    </div>

                    <button
                        type="button"
                        onClick={handleRefresh}
                        disabled={isPending}
                        className="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:border-accent/50 hover:text-accent disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            className={isPending ? "animate-spin" : ""}
                            aria-hidden
                        >
                            <path
                                d="M21 12a9 9 0 11-2.64-6.36M21 3v6h-6"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        {isPending ? "更新中…" : "データ更新"}
                    </button>
                </div>
            </div>
        </header>
    );
}
