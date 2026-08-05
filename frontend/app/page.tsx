import MarketCard from "@/components/MarketCard";
import { marketItems } from "@/data/mock";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <header className="mb-12">
          <p className="text-sm font-semibold text-cyan-400">
            MARKET INTELLIGENCE
          </p>

          <h1 className="mt-2 text-4xl font-bold sm:text-5xl">
            Market Pulse
          </h1>

          <p className="mt-4 text-slate-400">
            毎朝5分でマーケット全体を把握するダッシュボード
          </p>
        </header>

        <section className="mb-12 rounded-2xl border border-slate-800 bg-slate-900 p-8">
          <p className="text-sm font-semibold text-cyan-400">
            TODAY&apos;S SUMMARY
          </p>

          <h2 className="mt-2 text-2xl font-semibold">
            本日のマーケット概況
          </h2>

          <p className="mt-4 leading-8 text-slate-300">
            ここにAIによるマーケット要約が表示されます。
          </p>
        </section>

        <section>
          <div className="mb-5">
            <p className="text-sm font-semibold text-cyan-400">
              MARKET OVERVIEW
            </p>

            <h2 className="mt-2 text-2xl font-semibold">
              主要マーケット
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {marketItems.map((item) => (
              <MarketCard
                key={item.name}
                name={item.name}
                value={item.value}
                change={item.change}
                description={item.description}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}