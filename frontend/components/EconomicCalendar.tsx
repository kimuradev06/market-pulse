import type { EconomicEvent } from "@/types/market";
import SectionHeading from "@/components/SectionHeading";

type EconomicCalendarProps = {
    events: EconomicEvent[];
};

const importanceStyle: Record<EconomicEvent["importance"], string> = {
    高: "bg-down/15 text-down",
    中: "bg-amber-400/15 text-amber-300",
    低: "bg-muted/15 text-muted",
};

const countryStyle: Record<EconomicEvent["country"], string> = {
    日本: "bg-accent/10 text-accent",
    米国: "bg-accent/10 text-accent",
    欧州: "bg-surface-2 text-muted",
    その他: "bg-surface-2 text-muted",
};

export default function EconomicCalendar({ events }: EconomicCalendarProps) {
    // 時刻順にソート
    const sorted = [...events].sort((a, b) => a.time.localeCompare(b.time));

    return (
        <section
            aria-labelledby="economic-calendar-heading"
            className="rounded-lg border border-border bg-surface p-5"
        >
            <SectionHeading
                id="economic-calendar-heading"
                eyebrow="Economic Calendar"
                title="本日の経済イベント"
                mock
            />

            <ol className="divide-y divide-border/60">
                {sorted.map((event) => (
                    <li key={event.id} className="flex items-center gap-3 py-2.5">
                        <span className="tabular w-12 shrink-0 text-sm font-semibold text-foreground">
                            {event.time}
                        </span>
                        <span
                            className={`shrink-0 rounded px-1.5 py-0.5 text-[10px] font-medium ${countryStyle[event.country]}`}
                        >
                            {event.country}
                        </span>
                        <span className="min-w-0 flex-1 truncate text-sm text-foreground/90">
                            {event.title}
                        </span>
                        <span
                            className={`shrink-0 rounded px-2 py-0.5 text-[10px] font-semibold ${importanceStyle[event.importance]}`}
                        >
                            重要度 {event.importance}
                        </span>
                    </li>
                ))}
            </ol>
        </section>
    );
}
