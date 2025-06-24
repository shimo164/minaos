"use client";

import { inputArea, squareArea } from "@/styles/classNames/layout";
import { midText } from "@/styles/classNames/typography";
import clsx from "clsx";

interface UrlInputFieldProps {
  url: string;
  setUrl: (url: string) => void;
}

export default function UrlInputField({ url, setUrl }: UrlInputFieldProps) {
  return (
    <div className={squareArea}>
      <label htmlFor="url-input" className={clsx(midText)}>
        URLを入力
      </label>
      <input
        type="text"
        id="url-input"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="ex. https://zenn.dev/xxx/articles/xxx"
        className={inputArea}
      />
    </div>
  );
}
