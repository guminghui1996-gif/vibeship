import Link from "next/link";

const markdown = [
  "---",
  "",
  "## VibeShip Day 2: Add /logs Page",
  "",
  "### Today shipped",
  "",
  "- 新增 `/logs` 页面：创建 `app/logs/page.tsx`，标题为“日志列表”。",
  "",
  "- 列表里包含 `2026-05-31`，点击可进入 `/logs/2026-05-31`。",
  "",
  "- 用 Tailwind 做了一个简洁的列表卡片样式。",
  "",
  "- 本地验证通过：`npm run dev` 访问 `/logs` 返回 200；`npm run build` 通过并包含 `/logs` 路由。",
  "",
  "### Key learnings (3)",
  "",
  "1) 路由的映射更清晰：`app/logs/page.tsx` 就对应 `/logs`，文件夹结构就是网址结构。",
  "",
  "2) 先做“最小可用页面”更稳：先把列表跑通，再考虑动态路由/数据库接入。",
  "",
  "3) 版本化习惯继续强化：每完成一个小功能就 `git add/commit/push`，让线上自动更新。",
  "",
  "### Tomorrow plan (3)",
  "",
  "1) 继续补齐日志展示：让站内可以稳定展示每一天的日志。",
  "",
  "2) 开始 Supabase：建 `projects/logs` 表 + Email 登录（只做最小闭环）。",
  "",
  "3) 优化首页入口：从“只有 Day1”变成“最新日志 + 跳转日志列表”。"
].join("\n");

export default function DayTwoLogPage() {
  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-12 text-zinc-950">
      <article className="mx-auto w-full max-w-3xl">
        <h1 className="text-3xl font-semibold tracking-normal sm:text-4xl">
          Day 2 日志（2026-06-01）
        </h1>
        <pre className="mt-8 whitespace-pre-wrap rounded-md border border-zinc-200 bg-white p-6 text-sm leading-7 text-zinc-700 shadow-sm">
          {markdown}
        </pre>
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
