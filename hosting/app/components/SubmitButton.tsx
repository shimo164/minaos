"use client";

import { buttonBlue, buttonRunClass } from "@/styles/classNames/button";
import { squareArea } from "@/styles/classNames/layout";
import clsx from "clsx";
interface SubmitButtonProps {
  handleSubmit: () => void;
  fetchLoading: boolean;
}

export default function SubmitButton({
  handleSubmit,
  fetchLoading,
}: SubmitButtonProps) {
  return (
    <div className={squareArea}>
      <button
        onClick={handleSubmit}
        disabled={fetchLoading}
        className={clsx(buttonBlue, buttonRunClass(fetchLoading))}
      >
        {fetchLoading ? "実行中..." : "実行する"}
      </button>
    </div>
  );
}
