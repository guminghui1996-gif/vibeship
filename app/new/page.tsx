import Link from "next/link";
import NewLogForm from "./NewLogForm";

export default function NewLogPage() {
  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-12 text-zinc-950">
      <section className="mx-auto w-full max-w-6xl">
        <Link
          className="text-sm font-medium text-zinc-600 transition hover:text-zinc-950"
          href="/"
        >
          返回首页
        </Link>

        <header className="mt-8 max-w-3xl">
          <h1 className="text-3xl font-semibold tracking-normal sm:text-4xl">
            写日志
          </h1>
          <p className="mt-4 text-base leading-7 text-zinc-600">
            填写今天的构建记录，右侧会实时生成 Markdown 预览。保存后会写入
            Supabase，并在日志列表的 DB Logs 区块出现。
          </p>
        </header>

        <NewLogForm />
      </section>
    </main>
  );
}
