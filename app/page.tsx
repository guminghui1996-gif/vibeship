import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-50 px-6 text-zinc-950">
      <section className="w-full max-w-2xl">
        <h1 className="text-4xl font-semibold tracking-normal sm:text-5xl">
          VibeShip
        </h1>
        <p className="mt-5 text-lg leading-8 text-zinc-600">
          记录从零开始公开构建 VibeShip 的每一天。
        </p>
        <Link
          className="mt-8 inline-flex items-center rounded-md bg-zinc-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800"
          href="/logs/2026-05-31"
        >
          Day 1 日志（2026-05-31）
        </Link>
      </section>
    </main>
  );
}
