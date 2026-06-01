import Link from "next/link";

const logs = [
  {
    date: "2026-06-01",
    title: "Day 2 日志（2026-06-01）",
    href: "/logs/2026-06-01",
    summary: "Add /logs Page"
  },
  {
    date: "2026-05-31",
    title: "Day 1 日志（2026-05-31）",
    href: "/logs/2026-05-31",
    summary: "From Zero to Deployed"
  }
];

export default function LogsPage() {
  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-12 text-zinc-950">
      <section className="mx-auto w-full max-w-3xl">
        <Link
          className="text-sm font-medium text-zinc-600 transition hover:text-zinc-950"
          href="/"
        >
          返回首页
        </Link>

        <header className="mt-8">
          <h1 className="text-3xl font-semibold tracking-normal sm:text-4xl">
            日志列表
          </h1>
          <p className="mt-4 text-base leading-7 text-zinc-600">
            这里记录 VibeShip 每一天的公开构建复盘。
          </p>
        </header>

        <div className="mt-8 divide-y divide-zinc-200 rounded-md border border-zinc-200 bg-white">
          {logs.map((log) => (
            <Link
              className="block p-5 transition hover:bg-zinc-50"
              href={log.href}
              key={log.date}
            >
              <p className="text-sm font-medium text-zinc-500">{log.date}</p>
              <h2 className="mt-2 text-xl font-semibold tracking-normal text-zinc-950">
                {log.title}
              </h2>
              <p className="mt-2 text-sm leading-6 text-zinc-600">
                {log.summary}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
