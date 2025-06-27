"use client";

import { buttonBlue } from "@/styles/classNames/button";
import { squareArea } from "@/styles/classNames/layout";
import { errorText, normalText_c } from "@/styles/classNames/typography";
import { logging } from "@/utils/logging";
import clsx from "clsx";
import { getAuth, signInAnonymously } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!;

declare global {
  interface Window {
    grecaptcha: any;
    onloadCallback: () => void;
  }
}

export default function AnonymousLogin() {
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const recaptchaRef = useRef<HTMLDivElement | null>(null);
  const recaptchaWidgetIdRef = useRef<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    const renderRecaptcha = () => {
      if (
        window.grecaptcha &&
        recaptchaRef.current &&
        recaptchaWidgetIdRef.current === null
      ) {
        const widgetId = window.grecaptcha.render(recaptchaRef.current, {
          sitekey: siteKey,
          callback: (response: string) => {
            setToken(response);
            setError(null);
          },
          "expired-callback": () => {
            setToken(null);
            setError("reCAPTCHA の有効期限が切れました");
          },
        });
        recaptchaWidgetIdRef.current = widgetId;
      }
    };

    if (window.grecaptcha) {
      renderRecaptcha();
    } else {
      window.onloadCallback = renderRecaptcha;
    }
  }, []);

  const handleAnonymousSignIn = async () => {
    if (!token) {
      setError("reCAPTCHA の確認が必要です");
      return;
    }

    try {
      const res = await fetch("/api/verify-recaptcha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      logging("reCAPTCHA verification response:", res);

      const data = await res.json();
      if (!data.success) {
        setError("reCAPTCHA 検証に失敗しました");
        window.grecaptcha.reset();
        setToken(null);
        return;
      }
      logging("reCAPTCHA verification successful");

      const auth = getAuth();
      await signInAnonymously(auth);
      logging("Anonymous sign-in successful");
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className={squareArea}>
      <div
        ref={recaptchaRef}
        className="g-recaptcha"
        style={{ margin: "12px" }}
      />
      <p className={clsx(normalText_c)}>
        ログインすると、
        <a href="/terms" className="underline">
          利用規約とプライバシーポリシー
        </a>
        <br />
        に同意したものとみなされます。
      </p>
      <button className={buttonBlue} onClick={handleAnonymousSignIn}>
        匿名でログイン
      </button>
      {error && <p className={clsx(errorText)}>{error}</p>}
    </div>
  );
}
