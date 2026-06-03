"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isPending, setIsPending] = useState(false);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");
    setIsPending(true);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    setIsPending(false);

    if (signInError) {
      setError(signInError.message);
      return;
    }

    router.push("/new");
  }

  async function handleSignUp() {
    setError("");
    setMessage("");
    setIsPending(true);

    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password
    });

    setIsPending(false);

    if (signUpError) {
      setError(signUpError.message);
      return;
    }

    setMessage("注册成功。现在可以用这个邮箱和密码登录。");
  }

  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-12 text-zinc-950">
      <section className="mx-auto w-full max-w-xl">
        <Link
          className="text-sm font-medium text-zinc-600 transition hover:text-zinc-950"
          href="/"
        >
          返回首页
        </Link>

        <header className="mt-8">
          <h1 className="text-3xl font-semibold tracking-normal sm:text-4xl">
            登录 VibeShip
          </h1>
          <p className="mt-4 text-base leading-7 text-zinc-600">
            开发期临时使用邮箱和密码登录，绕过 magic link 邮件限流，先跑通写入、读取和 RLS。
          </p>
        </header>

        <form
          className="mt-8 rounded-md border border-zinc-200 bg-white p-6 shadow-sm"
          onSubmit={handleLogin}
        >
          <label className="block">
            <span className="text-sm font-medium text-zinc-700">邮箱</span>
            <input
              className="mt-2 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-zinc-950"
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              required
              type="email"
              value={email}
            />
          </label>

          <label className="mt-5 block">
            <span className="text-sm font-medium text-zinc-700">密码</span>
            <input
              className="mt-2 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-zinc-950"
              minLength={6}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="至少 6 位"
              required
              type="password"
              value={password}
            />
          </label>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              className="inline-flex items-center rounded-md bg-zinc-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-400"
              disabled={isPending}
              type="submit"
            >
              {isPending ? "处理中..." : "登录"}
            </button>
            <button
              className="inline-flex items-center rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-950 transition hover:bg-zinc-50 disabled:cursor-not-allowed disabled:text-zinc-400"
              disabled={isPending || !email || password.length < 6}
              onClick={handleSignUp}
              type="button"
            >
              注册（开发用）
            </button>
          </div>

          {message ? (
            <p className="mt-4 rounded-md border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
              {message}
            </p>
          ) : null}

          {error ? (
            <p className="mt-4 rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {error}
            </p>
          ) : null}
        </form>
      </section>
    </main>
  );
}
