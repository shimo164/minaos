import { clsx } from "clsx";

export const background = clsx(
  "relative",
  "flex",
  "min-h-screen",
  "flex-col",
  "items-center",
  "justify-center",
  "bg-gradient-to-br",
  "from-blue-50",
  "to-green-200",
  // "to-indigo-100", // Uncomment when ready
  "p-0",
  "font-sans",
);

export const container = clsx(
  "flex",
  "min-h-screen",
  "w-full",
  "max-w-4xl",
  "justify-center",
  "rounded",
  "border",
  "border-gray-200",
  "bg-white", // Uncomment when ready
  "p-0",
  "shadow-2xl",
);

export const squareArea = clsx(
  "flex",
  "flex-col",
  "w-full",
  "max-w-4xl",
  "items-center",
  "p-4",
);

export const columnLayoutStyles = clsx(
  "relative",
  "mb-6",
  "flex",
  "w-full",
  "flex-col",
  "space-y-0",
);

export const inputArea = clsx(
  "w-full",
  "rounded-lg",
  "border",
  "border-gray-300",
  "px-4",
  "py-3",
  "text-gray-700",
  "placeholder-gray-400",
  "transition",
  "duration-200",
  "ease-in-out",
  "outline-none",
  "focus:border-transparent",
  "focus:ring-2",
  "focus:ring-blue-500",
);

export const textSpacing_wp = clsx(
  "mx-auto w-full max-w-2xl pt-4 pb-4 break-words",
);
export const textSpacing_w = clsx("mx-auto w-full max-w-2xl break-words");
