import type { NewsItem } from "@/types/market";
import SectionHeading from "@/components/SectionHeading";

type TopNewsProps = {
    news: NewsItem[];
};

// 重要ニュースは見出し・出典・関連資産のみ表示する。
// ニュース本文の無断転載は行わない設計。
export default function TopNews({ news }: TopNewsProps) {
    const items = news.slice(0, 3);

    return (
        <section
            aria-labelledby="top-news-heading"
            className="rounded-lg border border-border bg-surface p-5"
        >
            <SectionHeading
                id="top-news-heading"
                eyebrow="Top News"
                title="重要ニュース"
                mock
            />

            <ul className="space-y-3">
                {items.map((item) => (
                    <li
                        key={item.id}
                        className="rounded-md border border-border/60 bg-surface-2 p-3"
                    >
                        <div className="flex items-center justify-between gap-2 text-[11px] text-muted">
                            <span className="font-medium text-foreground/80">
                                {item.source}
                            </span>
                            <span className="tabular">{item.publishedAt}</span>
                        </div>
                        <h3 className="mt-1.5 text-sm font-semibold leading-snug text-foreground text-pretty">
                            {item.url ? (
                                <a
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="transition-colors hover:text-accent"
                                >
                                    {item.headline}
                                </a>
                            ) : (
                                item.headline
                            )}
                        </h3>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                            {item.relatedAssets.map((asset) => (
                                <span
                                    key={asset}
                                    className="rounded bg-surface px-1.5 py-0.5 text-[10px] text-muted"
                                >
                                    {asset}
                                </span>
                            ))}
                        </div>
                    </li>
                ))}
            </ul>

            <p className="mt-3 text-[11px] text-muted">
                ※ 見出しと出典のみを表示しています。本文は各情報源をご確認ください。
            </p>
        </section>
    );
}
