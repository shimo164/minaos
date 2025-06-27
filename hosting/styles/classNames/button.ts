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

export const buttonBlue = clsx(
  buttonCommon,
  `bg-blue-600`,
  `hover:bg-blue-700`,
  `focus:ring-blue-500`,
);

export const buttonGreen = clsx(
  buttonCommon,
  `bg-green-600`,
  `hover:bg-green-700`,
  `focus:ring-green-500`,
);

export const buttonRed = clsx(
  buttonCommon,
  `bg-red-600`,
  `hover:bg-red-700`,
  `focus:ring-red-500`,
);

export const buttonRunClass = (fetchLoading: boolean) =>
  clsx(
    fetchLoading
      ? "cursor-not-allowed bg-gray-400 text-gray-100"
      : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800",
  );
