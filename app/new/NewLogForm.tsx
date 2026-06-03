"use client";

import Link from "next/link";
import { useActionState, useMemo, useState } from "react";
import Markdown from "@/app/components/Markdown";
import { saveLogAction, type SaveLogState } from "./actions";

const initialState: SaveLogState = {};

function getToday() {
  return new Date().toLocaleDateString("en-CA");
}

function listFromText(value: string) {
  return value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function buildPreview({
  keyLearnings,
  title,
  todayShipped,
  tomorrowPlan
}: {
  keyLearnings: string;
  title: string;
  todayShipped: string;
  tomorrowPlan: string;
}) {
  const shipped = listFromText(todayShipped);
  const learnings = listFromText(keyLearnings);
  const plan = listFromText(tomorrowPlan);

  return [
    "---",
    "",
    `## ${title || "VibeShip Daily Log"}`,
    "",
    "### Today shipped",
    "",
    ...(shipped.length ? shipped.map((item) => `- ${item}`) : ["- "]),
    "",
    "### Key learnings (3)",
    "",
    ...(learnings.length
      ? learnings.map((item, index) => `${index + 1}) ${item}`)
      : ["1) "]),
    "",
    "### Tomorrow plan (3)",
    "",
    ...(plan.length ? plan.map((item, index) => `${index + 1}) ${item}`) : ["1) "])
  ].join("\n");
}

export default function NewLogForm() {
  const [state, formAction, isPending] = useActionState(
    saveLogAction,
    initialState
  );
  const [date, setDate] = useState(getToday);
  const [title, setTitle] = useState("VibeShip Daily Log");
  const [todayShipped, setTodayShipped] = useState("");
  const [keyLearnings, setKeyLearnings] = useState("");
  const [tomorrowPlan, setTomorrowPlan] = useState("");

  const preview = useMemo(
    () =>
      buildPreview({
        keyLearnings,
        title,
        todayShipped,
        tomorrowPlan
      }),
    [keyLearnings, title, todayShipped, tomorrowPlan]
  );

  return (
    <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form action={formAction} className="space-y-5">
        <label className="block">
          <span className="text-sm font-medium text-zinc-700">日期</span>
          <input
            className="mt-2 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-zinc-950"
            name="date"
            onChange={(event) => setDate(event.target.value)}
            required
            type="date"
            value={date}
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-zinc-700">标题</span>
          <input
            className="mt-2 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-zinc-950"
            name="title"
            onChange={(event) => setTitle(event.target.value)}
            required
            type="text"
            value={title}
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-zinc-700">
            Today shipped
          </span>
          <textarea
            className="mt-2 min-h-32 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm leading-6 outline-none transition focus:border-zinc-950"
            name="todayShipped"
            onChange={(event) => setTodayShipped(event.target.value)}
            placeholder="每行一条，会自动生成 Markdown 列表"
            required
            value={todayShipped}
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-zinc-700">
            Key learnings
          </span>
          <textarea
            className="mt-2 min-h-32 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm leading-6 outline-none transition focus:border-zinc-950"
            name="keyLearnings"
            onChange={(event) => setKeyLearnings(event.target.value)}
            placeholder="每行一条，会自动生成编号列表"
            required
            value={keyLearnings}
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-zinc-700">
            Tomorrow plan
          </span>
          <textarea
            className="mt-2 min-h-32 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm leading-6 outline-none transition focus:border-zinc-950"
            name="tomorrowPlan"
            onChange={(event) => setTomorrowPlan(event.target.value)}
            placeholder="每行一条，会自动生成编号列表"
            required
            value={tomorrowPlan}
          />
        </label>

        <div className="flex flex-wrap items-center gap-3">
          <button
            className="inline-flex items-center rounded-md bg-zinc-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-400"
            disabled={isPending}
            type="submit"
          >
            {isPending ? "保存中..." : "保存日志"}
          </button>
          <Link
            className="text-sm font-medium text-zinc-600 transition hover:text-zinc-950"
            href="/logs"
          >
            返回日志列表
          </Link>
        </div>

        {state.message ? (
          <div className="rounded-md border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
            <p>{state.message}</p>
            <Link className="mt-2 inline-block font-medium underline" href="/logs">
              去日志列表查看
            </Link>
          </div>
        ) : null}

        {state.error ? (
          <p className="rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {state.error}
          </p>
        ) : null}
      </form>

      <section className="rounded-md border border-zinc-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold tracking-normal">Markdown 预览</h2>
        <div className="mt-6 border-t border-zinc-200 pt-6">
          <Markdown content={preview} />
        </div>
      </section>
    </div>
  );
}
