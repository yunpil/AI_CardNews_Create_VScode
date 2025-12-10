import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI 카드뉴스 생성기",
  description: "AI를 활용한 카드뉴스 생성 플랫폼",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
