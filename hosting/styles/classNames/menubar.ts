import { clsx } from "clsx";

export const menuButtonActiveClass = clsx(
  "text-gray-800",
  "bg-gray-100",
  "hover:bg-gray-200",
  "active:bg-gray-300",
  "p-2",
  "font-medium",
  "focus:outline-none",
  "focus:ring-2",
  "focus:ring-blue-500",
  "focus:ring-opacity-75",
  "transition",
  "duration-200",
  "ease-in-out",
  "basis-1/4",
);

export const menuButtonInactiveClass = clsx(
  "text-white",
  "bg-gray-200",
  "p-2",
  "font-medium",
  "focus:outline-none",
  "focus:ring-2",
  "focus:ring-blue-500",
  "focus:ring-opacity-75",
  "transition",
  "duration-200",
  "ease-in-out",
  "basis-1/4",
);

export const menubarContainer = clsx(
  "flex",
  "w-full",
  "max-w-4xl",
  "flex-row",
  "overflow-x-auto",
  "whitespace-nowrap",
);

export const menuButtonClassEmphasized = clsx(
  "border-b-4",
  "border-orange-500",
  "!font-bold",
);
