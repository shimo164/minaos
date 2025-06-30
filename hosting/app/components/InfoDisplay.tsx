"use client";

import { infoClass } from "@/styles/classNames/dashboard";

interface InfoDisplayProps {
  info: string | null;
}

export default function InfoDisplay({ info }: InfoDisplayProps) {
  if (!info) return null;

  return (
    <div className={infoClass} role="alert">
      <strong>Info:</strong>
      <span className="ml-2" style={{ whiteSpace: "pre-line" }}>
        {info}
      </span>
    </div>
  );
}
