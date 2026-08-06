type SparklineProps = {
    data: number[];
    // 上昇/下落で線色を切り替える
    positive: boolean;
    width?: number;
    height?: number;
    className?: string;
};

// 依存追加を避けるための軽量な自作スパークライン（数値系列の折れ線）
export default function Sparkline({
    data,
    positive,
    width = 96,
    height = 32,
    className,
}: SparklineProps) {
    if (data.length < 2) {
        return <div style={{ width, height }} className={className} aria-hidden />;
    }

    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    const stepX = width / (data.length - 1);
    const pad = 2;
    const usableH = height - pad * 2;

    const points = data.map((value, index) => {
        const x = index * stepX;
        const y = pad + usableH - ((value - min) / range) * usableH;
        return `${x.toFixed(2)},${y.toFixed(2)}`;
    });

    const stroke = positive ? "var(--color-up)" : "var(--color-down)";
    const line = points.join(" ");
    const area = `0,${height} ${line} ${width},${height}`;
    const gradientId = `spark-${positive ? "up" : "down"}`;

    return (
        <svg
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            className={className}
            role="img"
            aria-label={positive ? "上昇トレンド" : "下落トレンド"}
            preserveAspectRatio="none"
        >
            <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={stroke} stopOpacity="0.28" />
                    <stop offset="100%" stopColor={stroke} stopOpacity="0" />
                </linearGradient>
            </defs>
            <polygon points={area} fill={`url(#${gradientId})`} />
            <polyline
                points={line}
                fill="none"
                stroke={stroke}
                strokeWidth={1.5}
                strokeLinejoin="round"
                strokeLinecap="round"
            />
        </svg>
    );
}
