import { clsx } from "clsx";

export const errorClass = clsx(
  "relative",
  "mb-6",
  "rounded-lg",
  "border",
  "border-red-400",
  "bg-red-100",
  "px-4",
  "py-3",
  "text-red-700",
);

export const infoClass = clsx(
  "relative",
  "mb-6",
  "rounded-lg",
  "border",
  "border-blue-400",
  "bg-blue-100",
  "px-4",
  "py-3",
  "text-blue-700",
  "text-center",
);

export const resultClass = clsx(
  "max-h-96",
  "overflow-auto",
  "rounded-md",
  "bg-gray-100",
  "p-4",
  "text-sm",
  "break-words",
  "whitespace-pre-wrap",
  "text-gray-700",
);

export const resultArea = clsx(
  "rounded-lg",
  "border",
  "border-gray-200",
  "bg-gray-50",
  "p-6",
);

export const highlightBefore = clsx("bg-red-200 px-0.5 text-red-800");
export const highlightAfter = clsx("bg-green-200 px-0.5 text-green-800");
