type SectionHeadingProps = {
    eyebrow: string;
    title: string;
    id?: string;
    // モックデータであることを示すバッジを表示
    mock?: boolean;
    // 見出し右側の追加要素（タブなど）
    action?: React.ReactNode;
};

export default function SectionHeading({
    eyebrow,
    title,
    id,
    mock = false,
    action,
}: SectionHeadingProps) {
    return (
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
            <div>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-accent">
                    {eyebrow}
                </p>
                <h2
                    id={id}
                    className="mt-1 flex items-center gap-2 text-lg font-bold text-foreground"
                >
                    {title}
                    {mock && (
                        <span className="rounded bg-surface-2 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted">
                            Mock
                        </span>
                    )}
                </h2>
            </div>
            {action}
        </div>
    );
}
