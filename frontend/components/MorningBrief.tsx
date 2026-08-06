import type { MorningBriefData } from "@/types/market";

type MorningBriefProps = {
    brief: MorningBriefData;
};

// モーニングブリーフ。
// 現状はルールベースの文章領域。将来 Amazon Bedrock によるAI要約に差し替え可能なよう、
// 表示ロジックはデータ（MorningBriefData）にのみ依存させている。
export default function MorningBrief({ brief }: MorningBriefProps) {
    const isAi = brief.generatedBy === "ai";

    return (
        <section
            aria-labelledby="morning-brief-heading"
            className="rounded-lg border border-border bg-surface p-5 sm:p-6"
        >
            <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold uppercase tracking-widest text-accent">
                        Morning Brief
                    </span>
                    <span className="rounded bg-surface-2 px-1.5 py-0.5 text-[10px] font-medium text-muted">
                        {isAi ? "AI要約" : "ルールベース"}
                    </span>
                </div>
                <span className="text-[11px] text-muted">
                    {brief.generatedAt} 生成
                </span>
            </div>

            <h2
                id="morning-brief-heading"
                className="mt-3 text-balance text-xl font-bold text-foreground sm:text-2xl"
            >
                {brief.headline}
            </h2>

            <ul className="mt-4 space-y-2.5">
                {brief.points.map((point, index) => (
                    <li key={index} className="flex gap-3 text-sm leading-relaxed text-foreground/90">
                        <span
                            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                            aria-hidden
                        />
                        <span className="text-pretty">{point}</span>
                    </li>
                ))}
            </ul>

            {!isAi && (
                <p className="mt-4 border-t border-border/60 pt-3 text-[11px] text-muted">
                    ※ 現在はルールベースの概況を表示しています。将来的に Amazon Bedrock による
                    AI要約へ切り替え予定です。
                </p>
            )}
        </section>
    );
}
