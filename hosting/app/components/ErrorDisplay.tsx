"use client";

import { errorClass } from "@/styles/classNames/dashboard";

interface ErrorDisplayProps {
  error: string | null;
}

export default function ErrorDisplay({ error }: ErrorDisplayProps) {
  if (!error) return null;

  return (
    <div className={errorClass} role="alert">
      <strong>Error!</strong>
      <span className="ml-2" style={{ whiteSpace: "pre-line" }}>
        {error}
      </span>
    </div>
  );
}
