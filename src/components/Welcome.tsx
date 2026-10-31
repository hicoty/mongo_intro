"use client";

import { useEffect, useRef, useState } from "react";

const STORAGE_KEY = "mango-visitor-name";
const MAX_LENGTH = 20;

const loadName = () => {
  try {
    return localStorage.getItem(STORAGE_KEY) ?? "";
  } catch {
    return "";
  }
};

const storeName = (name: string) => {
  try {
    localStorage.setItem(STORAGE_KEY, name);
  } catch {
    // 無痕模式等情況存不了，下次就不會預填
  }
};

/** 每次進入首頁都詢問稱呼（預填上次輸入的），並在首屏顯示歡迎詞。 */
export default function Welcome() {
  // null：還沒回答；""：使用者選擇略過
  const [name, setName] = useState<string | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (input.current) input.current.value = loadName();
    dialog.current?.showModal();
  }, []);

  const edit = () => {
    if (input.current) input.current.value = name ?? "";
    dialog.current?.showModal();
  };

  const save = (value: string) => {
    const next = value.trim().slice(0, MAX_LENGTH);
    // 略過時不覆蓋已存的稱呼
    if (next) storeName(next);
    setName(next);
    dialog.current?.close();
  };

  return (
    <>
      {name && (
        <p className="glass mb-8 inline-flex items-center gap-3 rounded-full py-2 pl-4 pr-2 text-sm tracking-widest">
          <span aria-hidden>👋</span>
          <span>
            <strong className="font-semibold text-leaf">{name}</strong>
            ，歡迎來到夏芒果園
          </span>
          <button
            type="button"
            onClick={edit}
            className="rounded-full px-3 py-1 text-xs text-ink-soft transition hover:bg-white/50 hover:text-ink"
          >
            修改
          </button>
        </p>
      )}

      <dialog
        ref={dialog}
        aria-labelledby="welcome-title"
        // Esc 關閉視同略過
        onCancel={() => name == null && setName("")}
        className="m-auto w-[calc(100%-2rem)] max-w-sm rounded-3xl bg-paper p-0 text-ink shadow-[0_40px_80px_-30px_rgb(120_50_10/0.55)] backdrop:bg-ink/45 backdrop:backdrop-blur-sm"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            save(input.current?.value ?? "");
          }}
          className="px-7 pb-8 pt-10 text-center"
        >
          <p className="text-[11px] uppercase tracking-[0.35em] text-ink-soft">
            Welcome
          </p>
          <h2
            id="welcome-title"
            className="mt-2 font-serif text-2xl font-bold tracking-widest"
          >
            歡迎光臨夏芒果園
          </h2>
          <p className="mt-3 text-sm leading-7 text-ink-soft">
            該怎麼稱呼你呢？
          </p>

          <label htmlFor="visitor-name" className="sr-only">
            你的稱呼
          </label>
          <input
            ref={input}
            id="visitor-name"
            name="name"
            required
            autoFocus
            autoComplete="nickname"
            maxLength={MAX_LENGTH}
            placeholder="例如：小芒、王小姐"
            className="mt-6 w-full rounded-full border border-ink/15 bg-white/60 px-5 py-3 text-center tracking-widest outline-none transition placeholder:text-ink-soft/60 focus:border-mango focus:ring-2 focus:ring-mango/30"
          />

          <button
            type="submit"
            className="mt-4 w-full rounded-full bg-ink py-3.5 text-sm tracking-widest text-paper transition hover:bg-leaf"
          >
            進入果園
          </button>
          <button
            type="button"
            onClick={() => save(name ?? "")}
            className="mt-3 text-xs tracking-widest text-ink-soft transition hover:text-ink"
          >
            {name ? "取消" : "略過"}
          </button>
        </form>
      </dialog>
    </>
  );
}
