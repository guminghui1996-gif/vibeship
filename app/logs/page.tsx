import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import Link from "next/link";

type LogItem = {
  date: string;
  href: string;
  title: string;
};

const logFilePattern = /^(\d{4}-\d{2}-\d{2})\.md$/;

async function getLogs(): Promise<LogItem[]> {
  const logsDir = path.join(process.cwd(), "logs");
  const entries = await readdir(logsDir, { withFileTypes: true });
  const files = entries
    .filter((entry) => entry.isFile() && logFilePattern.test(entry.name))
    .map((entry) => {
      const match = entry.name.match(logFilePattern);
      return {
        date: match?.[1] ?? "",
        fileName: entry.name
      };
    })
    .filter((entry) => entry.date);

  const logs = await Promise.all(
    files.map(async (file) => {
      const markdown = await readFile(path.join(logsDir, file.fileName), "utf8");
      const title = markdown.match(/^##\s+(.+)$/m)?.[1] ?? `日志 ${file.date}`;

      return {
        date: file.date,
        href: `/logs/${file.date}`,
        title
      };
    })
  );

  return logs.sort((a, b) => b.date.localeCompare(a.date));
}

export default async function LogsPage() {
  const logs = await getLogs();

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
                查看 {log.date} 的公开构建复盘
              </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
