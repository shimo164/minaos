"use client";

import MenuBar from "@/app/components/MenuBar";
import { registerUser } from "@/lib/auth";
import { auth } from "@/lib/firebase";
import { buttonBlue } from "@/styles/classNames/button";
import { errorClass } from "@/styles/classNames/dashboard";
import { background, container } from "@/styles/classNames/layout";
import { logging } from "@/utils/logging";
import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EmailSignInPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [needsEmailInput, setNeedsEmailInput] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      const storedEmail = window.localStorage.getItem("emailForSignIn");
      logging("Stored email:", storedEmail);
      if (storedEmail) {
        setEmail(storedEmail);
        handleSignInWithEmailLink(storedEmail);
      } else {
        // Access from different device or browser
        setNeedsEmailInput(true);
      }
    } else {
      setError(
        "ログインリンクが無効か期限切れです。再度リンクを取得してください。",
      );
    }
  }, []);

  const handleSignInWithEmailLink = async (email: string) => {
    try {
      await signInWithEmailLink(auth, email, window.location.href);
      window.localStorage.removeItem("emailForSignIn");

      try {
        await registerUser(email, "dummyPassword");
      } catch (err: any) {
        setError("ユーザー登録に失敗しました。もう一度お試しください。");
      }

      router.push("/dashboard");
    } catch (err: any) {
      console.error("Sign-in error:", err);
      setError("もう一度はじめからお試しください。");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSignInWithEmailLink(email);
  };

  return (
    <div className={background}>
      <MenuBar />
      <div className={container}>
        <div className="p-4 font-sans">
          <h1 className="mb-4 text-2xl font-bold">Email Sign-In</h1>

          {error && <p className={errorClass}>{error}</p>}

          {needsEmailInput ? (
            <>
              <p className="mb-2">同じメールアドレスを入力してください。</p>
              <form onSubmit={handleSubmit} className="mb-4">
                <label className="mb-2 block">
                  <span className="mb-1 block">Email:</span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full max-w-sm rounded border border-gray-300 px-4 py-2"
                  />
                </label>
                <button type="submit" className={buttonBlue}>
                  Sign In
                </button>
              </form>
            </>
          ) : (
            <p className="text-gray-700">Signing in with email: {email}</p>
          )}
        </div>
      </div>
    </div>
  );
}
