"use client";

export function logging(...args: unknown[]): void {
  if (typeof window === "undefined") return;
  if (process.env.NODE_ENV === "production") return;
  // if (sessionStorage.getItem("adminMode") === "true") {
  //   console.log(...args);
  // }
  console.log(...args); // Always log to console for debugging
}
