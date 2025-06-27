import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { AuthProvider } from "./providers/auth-context";

// NOTE: metadata: viewportを含めない
export const metadata: Metadata = {
  title: "Minaos",
  description: "技術ブログの校正をAIで行うサービスです。",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
        <Script
          src="https://www.google.com/recaptcha/api.js?render=6LcI5FArAAAAAJj59VIUw_OStystg2QlCNdhShCg"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
