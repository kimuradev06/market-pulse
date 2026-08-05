export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-6xl px-8 py-12">
        <header className="mb-12">
          <p className="text-sm font-semibold text-cyan-400">
            MARKET INTELLIGENCE
          </p>

          <h1 className="mt-2 text-5xl font-bold">
            Market Pulse
          </h1>

          <p className="mt-4 text-slate-400">
            毎朝5分でマーケット全体を把握するダッシュボード
          </p>
        </header>

        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
          <h2 className="text-2xl font-semibold">
            Today's Summary
          </h2>

          <p className="mt-4 leading-8 text-slate-300">
            ここにAIによるマーケット要約が表示されます。
          </p>
        </section>
      </div>
    </main>
  );
}