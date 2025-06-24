"use client";

import DiffDisplay from "@/app/components/DiffDisplay";
import { resultText, resultTime } from "@/styles/classNames/typography";
import { clsx } from "clsx";

interface ResultDisplayProps {
  // TODO: Define the type of appResult more specifically if possible
  appResult: any;
  elapsedTime: string | null;
}

export default function ResultDisplay({
  appResult,
  elapsedTime,
}: ResultDisplayProps) {
  return (
    <>
      <div className={clsx(resultTime)}>
        {appResult?.length > 0 && elapsedTime
          ? `実行時間: ${elapsedTime}秒`
          : ""}
      </div>
      <div className={clsx(resultText)}>
        {appResult?.length > 0 && <DiffDisplay pairs={appResult} />}
      </div>
    </>
  );
}
