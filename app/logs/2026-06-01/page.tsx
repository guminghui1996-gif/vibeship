import { readFile } from "node:fs/promises";
import path from "node:path";
import Link from "next/link";
import Markdown from "@/app/components/Markdown";

async function getLogContent() {
  return readFile(path.join(process.cwd(), "logs", "2026-06-01.md"), "utf8");
}

export default async function DayTwoLogPage() {
  const markdown = await getLogContent();

  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-12 text-zinc-950">
      <article className="mx-auto w-full max-w-3xl">
        <h1 className="text-3xl font-semibold tracking-normal sm:text-4xl">
          Day 2 日志（2026-06-01）
        </h1>
        <div className="mt-8 rounded-md border border-zinc-200 bg-white p-6 shadow-sm">
          <Markdown content={markdown} />
        </div>
        <nav className="mt-8 flex flex-wrap gap-4">
          <Link
            className="text-sm font-medium text-zinc-600 transition hover:text-zinc-950"
            href="/"
          >
            返回首页
          </Link>
          <Link
            className="text-sm font-medium text-zinc-600 transition hover:text-zinc-950"
            href="/logs"
          >
            返回日志列表
          </Link>
        </nav>
      </article>
    </main>
  );
}
