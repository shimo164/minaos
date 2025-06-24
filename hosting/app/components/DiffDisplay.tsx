"use client";

import { highlightAfter, highlightBefore } from "@/styles/classNames/dashboard";
import clsx from "clsx";

interface DiffDisplayProps {
  pairs: [string, string][];
}

export default function DiffDisplay({ pairs }: DiffDisplayProps) {
  if (!Array.isArray(pairs)) {
    console.error("Invalid prop 'pairs': Expected an array. Received:", pairs);
  }
  return (
    <div className="font-mono text-sm">
      {pairs.map(([oldStr, newStr], idx) => (
        <div key={idx} className="mb-2">
          <div className="text-gray-800">指摘 {idx + 1}:</div>
          <div className="flex flex-col gap-0">
            <div className="rounded bg-red-50 p-1">
              {highlightDiff(oldStr, newStr, "old")}
            </div>
            <div className="rounded bg-green-50 p-1">
              {highlightDiff(oldStr, newStr, "new")}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function highlightDiff(oldStr: string, newStr: string, mode: "old" | "new") {
  const maxLength = Math.max(oldStr.length, newStr.length);
  const elements: React.ReactNode[] = [];

  for (let i = 0; i < maxLength; i++) {
    const oldChar = oldStr[i];
    const newChar = newStr[i];

    if (oldChar !== newChar) {
      if (mode === "old" && oldChar !== undefined) {
        elements.push(
          <span key={i} className={clsx(highlightBefore)}>
            {oldChar}
          </span>,
        );
      } else if (mode === "new" && newChar !== undefined) {
        elements.push(
          <span key={i} className={clsx(highlightAfter)}>
            {newChar}
          </span>,
        );
      }
    } else {
      const char = mode === "old" ? oldChar : newChar;
      elements.push(<span key={i}>{char}</span>);
    }
  }

  return elements;
}
