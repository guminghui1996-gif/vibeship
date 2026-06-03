"use server";

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { revalidatePath } from "next/cache";

export type SaveLogState = {
  error?: string;
  href?: string;
  message?: string;
};

const datePattern = /^\d{4}-\d{2}-\d{2}$/;

function getLines(formData: FormData, name: string) {
  const value = formData.get(name);

  if (typeof value !== "string") {
    return [];
  }

  return value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function buildMarkdown(formData: FormData) {
  const date = String(formData.get("date") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const todayShipped = getLines(formData, "todayShipped");
  const keyLearnings = getLines(formData, "keyLearnings");
  const tomorrowPlan = getLines(formData, "tomorrowPlan");

  if (!datePattern.test(date)) {
    throw new Error("请输入 YYYY-MM-DD 格式的日期。");
  }

  if (!title) {
    throw new Error("请输入日志标题。");
  }

  if (!todayShipped.length || !keyLearnings.length || !tomorrowPlan.length) {
    throw new Error("请至少填写 Today shipped、Key learnings、Tomorrow plan 各一条。");
  }

  const markdown = [
    "---",
    "",
    `## ${title}`,
    "",
    "### Today shipped",
    "",
    ...todayShipped.map((item) => `- ${item}`),
    "",
    "### Key learnings (3)",
    "",
    ...keyLearnings.map((item, index) => `${index + 1}) ${item}`),
    "",
    "### Tomorrow plan (3)",
    "",
    ...tomorrowPlan.map((item, index) => `${index + 1}) ${item}`),
    ""
  ].join("\n");

  return { date, markdown };
}

export async function saveLogAction(
  _previousState: SaveLogState,
  formData: FormData
): Promise<SaveLogState> {
  try {
    const { date, markdown } = buildMarkdown(formData);
    const logsDir = path.join(process.cwd(), "logs");
    const filePath = path.join(logsDir, `${date}.md`);

    await mkdir(logsDir, { recursive: true });
    await writeFile(filePath, markdown, { encoding: "utf8", flag: "wx" });

    revalidatePath("/logs");
    revalidatePath(`/logs/${date}`);

    return {
      href: `/logs/${date}`,
      message: `已保存 logs/${date}.md`
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "保存失败，请稍后重试。";

    if ((error as NodeJS.ErrnoException).code === "EEXIST") {
      return {
        error: "这个日期的日志已经存在，请换一个日期或手动编辑已有文件。"
      };
    }

    return { error: message };
  }
}
