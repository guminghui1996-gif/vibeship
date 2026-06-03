"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Markdown from "@/app/components/Markdown";
import { supabase } from "@/lib/supabaseClient";

type DbLog = {
  content_md: string;
  log_date: string;
  title: string;
};

export default function DbLogDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const [log, setLog] = useState<DbLog | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadLog() {
      setIsLoading(true);
      setError("");

      const {
        data: { user },
        error: userError
      } = await supabase.auth.getUser();

      if (!isMounted) {
        return;
      }

      if (userError || !user) {
        setError("请先登录，再查看 Supabase 日志。");
        setIsLoading(false);
        return;
      }

      const { data, error: logError } = await supabase
        .from("logs")
        .select("content_md, log_date, title")
        .eq("id", id)
        .single();

      if (!isMounted) {
        return;
      }

      if (logError) {
        setError(logError.message);
        setLog(null);
      } else {
        setLog(data);
      }

      setIsLoading(false);
    }

    loadLog();

    return () => {
      isMounted = false;
    };
  }, [id]);

  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-12 text-zinc-950">
      <article className="mx-auto w-full max-w-3xl">
        <nav className="flex flex-wrap gap-4">
          <Link
            className="text-sm font-medium text-zinc-600 transition hover:text-zinc-950"
            href="/logs"
          >
            返回日志列表
          </Link>
          <Link
            className="text-sm font-medium text-zinc-600 transition hover:text-zinc-950"
            href="/new"
          >
            写日志
          </Link>
        </nav>

        {isLoading ? (
          <p className="mt-8 rounded-md border border-zinc-200 bg-white p-6 text-sm text-zinc-600">
            正在读取 Supabase 日志...
          </p>
        ) : null}

        {!isLoading && error ? (
          <div className="mt-8 rounded-md border border-red-200 bg-red-50 p-6 text-sm text-red-700">
            <p>{error}</p>
            <Link className="mt-2 inline-block font-medium underline" href="/login">
              去登录
            </Link>
          </div>
        ) : null}

        {!isLoading && log ? (
          <>
            <p className="mt-8 text-sm font-medium text-zinc-500">
              {log.log_date}
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-normal sm:text-4xl">
              {log.title}
            </h1>
            <div className="mt-8 rounded-md border border-zinc-200 bg-white p-6 shadow-sm">
              <Markdown content={log.content_md} />
            </div>
          </>
        ) : null}
      </article>
    </main>
  );
}
