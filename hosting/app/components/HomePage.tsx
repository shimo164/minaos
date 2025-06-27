"use client";

import AdminLoginButton from "@/app/components/AdminLoginButton";
import AnonymousLogin from "@/app/components/AnonymousLogin";
import AuthChecker from "@/app/components/AuthChecker"; // Import the new component
import MenuBar from "@/app/components/MenuBar";
import {
  background,
  columnLayoutStyles,
  container,
} from "@/styles/classNames/layout";
import { h1, h1Text, normalText_c } from "@/styles/classNames/typography";

import { infoClass } from "@/styles/classNames";
import { clsx } from "clsx";
import Script from "next/script";
import { useState } from "react";

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <div className={background}>
        <MenuBar />
        <Script
          src="https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit"
          strategy="afterInteractive"
        />
        <div className={container}>
          <div className={columnLayoutStyles}>
            <h1 className={clsx(h1, h1Text)}>ブログ見直しくん</h1>
            <p className={clsx(normalText_c)}>AIを、技術ブログを校正します。</p>
            <AuthChecker onAuthChange={setIsLoggedIn} />
            {!isLoggedIn ? (
              <AnonymousLogin />
            ) : (
              <p className={infoClass}>ログイン済み</p>
            )}
            <AdminLoginButton />
          </div>
        </div>
      </div>
    </>
  );
}
