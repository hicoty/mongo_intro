"use client";

import { useState } from "react";

// 實務上夠用的格式檢查：帳號@網域.頂級網域，不含空白
const EMAIL_PATTERN = /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)*\.[^\s@.]{2,}$/;
const MAX_LENGTH = 254;

const validate = (value: string) => {
  const email = value.trim();
  if (!email) return "請輸入 Email";
  if (email.length > MAX_LENGTH || !EMAIL_PATTERN.test(email))
    return "Email 格式不正確，例如：name@example.com";
  return "";
};

/** 預購 Email 欄位：目前只驗證格式，不會送出。 */
export default function PreorderEmail() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [valid, setValid] = useState(false);
  const [touched, setTouched] = useState(false);

  const check = (value: string) => {
    const message = validate(value);
    setError(message);
    setValid(!message);
  };

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        setTouched(true);
        check(email);
      }}
      className="mx-auto mt-10 max-w-md"
    >
      <label
        htmlFor="preorder-email"
        className="block text-center text-sm tracking-widest text-ink-soft"
      >
        或留下 Email 預購
      </label>
      <div className="mt-3 flex gap-2">
        <input
          id="preorder-email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="name@example.com"
          value={email}
          maxLength={MAX_LENGTH}
          aria-invalid={!!error}
          aria-describedby="preorder-email-msg"
          onChange={(e) => {
            setEmail(e.target.value);
            // 送出過一次後，邊打邊更新提示
            if (touched) check(e.target.value);
            else setValid(false);
          }}
          className={`min-w-0 flex-1 rounded-full border bg-white/60 px-5 py-3 tracking-wide outline-none transition placeholder:text-ink-soft/60 focus:ring-2 ${
            error
              ? "border-lychee focus:ring-lychee/25"
              : "border-ink/15 focus:border-mango focus:ring-mango/30"
          }`}
        />
        <button
          type="submit"
          className="shrink-0 rounded-full bg-ink px-6 py-3 text-sm tracking-widest text-paper transition hover:bg-leaf"
        >
          確認
        </button>
      </div>
      <p
        id="preorder-email-msg"
        aria-live="polite"
        className={`mt-2 min-h-6 px-5 text-sm ${error ? "text-lychee" : "text-leaf"}`}
      >
        {error || (valid && "✓ Email 格式正確")}
      </p>
    </form>
  );
}
