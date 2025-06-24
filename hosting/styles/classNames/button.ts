import { clsx } from "clsx";

const buttonCommon = clsx(
  "mb-2",
  "w-full",
  "rounded",
  "font-semibold",
  "max-w-78",
  "px-4",
  "py-2",
  "text-white",
  "shadow-md",
  "transition",
  "duration-300",
  "ease-in-out",
  "focus:outline-none",
  "focus:ring-2",
  "focus:ring-opacity-75",
);

export const buttonClass = (color: string) =>
  clsx(
    buttonCommon,
    `bg-${color}-600`,
    `hover:bg-${color}-700`,
    `focus:ring-${color}-500`,
  );

export const buttonRunClass = (fetchLoading: boolean) =>
  clsx(
    fetchLoading
      ? "cursor-not-allowed bg-gray-400 text-gray-100"
      : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800",
  );
