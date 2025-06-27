"use client";

import AuthChecker from "@/app/components/AuthChecker";
import { auth } from "@/lib/firebase";
import {
  menubarContainer,
  menuButtonActiveClass,
  menuButtonClassEmphasized,
  menuButtonInactiveClass,
} from "@/styles/classNames/menubar";
import { clsx } from "clsx";
import { signOut } from "firebase/auth";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function MenuBar() {
  const [error, setError] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      if (typeof window !== "undefined") {
        sessionStorage.removeItem("adminMode");
      }
      await signOut(auth);
      // NOTE: full reload is needed to clear auth state but might be ok for push
      window.location.href = "/";
    } catch (err) {
      setError("Failed to log out.");
    }
  };

  const navButton = (label: string, path: string, disabled = false) => {
    const isActive = pathname === path;
    return (
      <button
        className={clsx(
          disabled ? menuButtonInactiveClass : menuButtonActiveClass,
          isActive && menuButtonClassEmphasized,
        )}
        disabled={disabled}
        onClick={() => router.push(path)}
      >
        {label}
      </button>
    );
  };

  return (
    <nav className={menubarContainer}>
      <AuthChecker onAuthChange={setIsLoggedIn} />
      {navButton("TOP", "/")}
      {navButton("ABOUT", "/about")}
      {navButton("ダッシュボード", "/dashboard", !isLoggedIn)}
      {navButton("利用規約", "/terms")}
      <button
        className={clsx(
          isLoggedIn ? menuButtonActiveClass : menuButtonInactiveClass,
        )}
        disabled={!isLoggedIn}
        onClick={() => {
          if (!isLoggedIn) return;
          if (window.confirm("ログアウトしますか？")) handleLogout();
        }}
      >
        ログアウト
      </button>
    </nav>
  );
}
