import { clsx } from "clsx";

export const h1 = clsx("text-4xl", "font-bold");
export const h2 = clsx("text-3xl", "font-bold");
export const h3 = clsx("text-2xl", "font-semibold");
export const h4 = clsx("text-xl", "font-semibold");
export const h5 = clsx("text-lg", "font-medium");
export const h1Text = clsx("py-6", "text-center", "text-gray-800");
export const text_l = clsx("py-6", "text-gray-800");
export const normalText_c = clsx(
  "mb-2",
  "text-center",
  "text-sm",
  "text-gray-900",
);
export const normalText_l = clsx("mb-2", "text-sm", "text-gray-900");

export const midText = clsx("mb-2", "block", "font-medium", "text-gray-900");
export const resultTime = clsx(
  "flex",
  "justify-between",
  "px-6",
  "py-4",
  "text-gray-800",
);
export const resultText = clsx("w-full", "p-6", "text-gray-800");

export const xl4_c = clsx("text-center", "text-4xl", "font-bold");
export const xl3_c = clsx("text-center", "text-3xl", "font-bold");
export const xl2_c = clsx("text-center", "text-2xl", "font-semibold");
export const xl_c = clsx("text-center", "text-xl", "font-semibold");
export const lg_c = clsx("text-center", "text-lg", "font-medium");

export const xl_l = clsx("mt-2", "mb-1", "text-xl", "font-bold");
export const sm_r_gray = clsx("mt-4", "text-sm", "text-gray-500");

export const tableCell = clsx("border", "border-gray-400", "px-4", "py-2");
export const linkText = clsx("text-blue-600 hover:underline");
export const errorText = clsx("text-red-600", "font-bold");
export const successText = clsx("text-green-600", "font-bold");

export const paragraphSpacing = clsx("my-4");
