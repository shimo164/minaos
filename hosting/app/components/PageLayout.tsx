"use client";

import { background, container } from "@/styles/classNames/layout";

interface PageLayoutProps {
  children: React.ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className={background}>
      <div className={container}>{children}</div>
    </div>
  );
}
