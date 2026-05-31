import Link from "next/link";

const markdown = [
  "---",
  "",
  "## VibeShip Day 1: From Zero to Deployed",
  "",
  "### Today shipped",
  "",
  "- 跑通了 VibeShip 的本地开发环境：`npm install`、`npm run dev` 可正常启动并在 `localhost:3000` 看到页面。",
  "",
  "- 修复了多个“缺依赖/命令找不到”的问题：补齐 `next/react/react-dom` 以及 Tailwind/PostCSS 相关依赖，让构建不再报错。",
  "",
  "- 完成 **GitHub → Vercel** 的完整上线链路：",
  "",
  "- 代码成功 push 到 GitHub：`guminghui1996-gif/vibeship`",
  "",
  "- Vercel 成功部署并生成可访问的线上域名：`https://vibeship-rouge.vercel.app`",
  "",
  "### Key learnings (3)",
  "",
  "1) **“能跑起来”优先于“写功能”**：先把本地运行、依赖、构建、部署的流水线打通，后面每次迭代才不会反复卡在环境问题上。",
  "",
  "2) **报错要用“定位→验证→最小修复→重启”节奏**：例如 `next` 命令缺失、`@tailwindcss/postcss` 缺失，本质都是依赖链问题，按提示补齐即可。",
  "",
  "3) **浏览器能访问 ≠ Git 能访问**：`git push` 失败时，要区分是代码问题还是网络/代理问题；给 Git 单独配置代理后，push 才真正跑通。",
  "",
  "### Tomorrow plan (3)",
  "",
  "1) **把项目整理成“标准可持续迭代”的状态**：检查 `package.json` 依赖是否完整、README 写清楚启动/部署方式。",
  "",
  "2) **进入最小功能闭环**：Supabase 建库 + Email 登录 + 新建 Project + 新建 Log。",
  "",
  "3) **固定公开构建流程**：每天一条日志 + 复盘模板。"
].join("\n");

export default function DayOneLogPage() {
  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-12 text-zinc-950">
      <article className="mx-auto w-full max-w-3xl">
        <Link
          className="text-sm font-medium text-zinc-600 transition hover:text-zinc-950"
          href="/"
        >
          返回首页
        </Link>
        <h1 className="mt-8 text-3xl font-semibold tracking-normal sm:text-4xl">
          Day 1 日志（2026-05-31）
        </h1>
        <pre className="mt-8 whitespace-pre-wrap rounded-md border border-zinc-200 bg-white p-6 text-sm leading-7 text-zinc-700 shadow-sm">
          {markdown}
        </pre>
      </article>
    </main>
  );
}
