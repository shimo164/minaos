"use client";

import { squareArea } from "@/styles/classNames/layout";
import { linkText } from "@/styles/classNames/typography";
import { clsx } from "clsx";
import { useRouter } from "next/navigation";

export default function AdminLoginButton() {
  const router = useRouter();

  return (
    <div className={squareArea}>
      <button
        onClick={() => router.push("/admin-login")}
        className={clsx(linkText)}
      >
        (Adminログイン用)
      </button>
    </div>
  );
}
