import { clsx } from "clsx";

export const menuButtonCommonClass = clsx(
  "p-2",
  "font-medium",
  "transition",
  "duration-200",
  "ease-in-out",
  "basis-1/5",
);

export const menuButtonActiveClass = clsx(
  menuButtonCommonClass,
  "text-gray-800",
  "bg-gray-100",
  "hover:bg-gray-200",
  "active:bg-gray-300",
);

export const menuButtonInactiveClass = clsx(
  menuButtonCommonClass,
  "text-white",
  "bg-gray-200",
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
