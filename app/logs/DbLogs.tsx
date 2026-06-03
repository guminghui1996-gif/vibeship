"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type DbLog = {
  id: string;
  log_date: string;
  title: string;
};

export default function DbLogs() {
  const [logs, setLogs] = useState<DbLog[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadLogs() {
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
        setIsSignedIn(false);
        setLogs([]);
        setIsLoading(false);
        return;
      }

      setIsSignedIn(true);

      const { data, error: logsError } = await supabase
        .from("logs")
        .select("id, log_date, title")
        .order("log_date", { ascending: false });

      if (!isMounted) {
        return;
      }

      if (logsError) {
        setError(logsError.message);
        setLogs([]);
      } else {
        setLogs(data ?? []);
      }

      setIsLoading(false);
    }

    loadLogs();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="mt-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <header>
          <h2 className="text-2xl font-semibold tracking-normal">
            My logs (Supabase)
          </h2>
          <p className="mt-2 text-sm leading-6 text-zinc-600">
            这个区块展示当前登录用户保存在 Supabase 的私人日志，用来验证登录态、写入、读取和 RLS。
          </p>
        </header>
        <div className="flex flex-wrap gap-3">
          <Link
            className="text-sm font-medium text-zinc-600 transition hover:text-zinc-950"
            href="/login"
          >
            登录
          </Link>
          <Link
            className="text-sm font-medium text-zinc-600 transition hover:text-zinc-950"
            href="/new"
          >
            写日志
          </Link>
        </div>
      </div>

      <div className="mt-6 divide-y divide-zinc-200 rounded-md border border-zinc-200 bg-white">
        {isLoading ? (
          <p className="p-5 text-sm text-zinc-600">正在读取 Supabase 日志...</p>
        ) : null}

        {!isLoading && !isSignedIn ? (
          <div className="p-5 text-sm text-zinc-600">
            <p>你还没有登录。登录后，这里会优先显示你保存在 Supabase 的日志。</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                className="inline-flex items-center rounded-md bg-zinc-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800"
                href="/login"
              >
                登录
              </Link>
              <Link
                className="inline-flex items-center rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-950 transition hover:bg-zinc-50"
                href="/new"
              >
                写日志
              </Link>
            </div>
          </div>
        ) : null}

        {!isLoading && error ? (
          <p className="p-5 text-sm text-red-700">{error}</p>
        ) : null}

        {!isLoading && isSignedIn && !error && logs.length === 0 ? (
          <div className="p-5 text-sm text-zinc-600">
            <p>还没有 Supabase 日志。先写一篇，保存后会出现在这里。</p>
            <Link className="mt-2 inline-block font-medium underline" href="/new">
              写第一篇
            </Link>
          </div>
        ) : null}

        {logs.map((log) => (
          <Link
            className="block p-5 transition hover:bg-zinc-50"
            href={`/logs/db/${log.id}`}
            key={log.id}
          >
            <p className="text-sm font-medium text-zinc-500">{log.log_date}</p>
            <h3 className="mt-2 text-xl font-semibold tracking-normal text-zinc-950">
              {log.title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-zinc-600">
              查看 Supabase 日志详情
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
