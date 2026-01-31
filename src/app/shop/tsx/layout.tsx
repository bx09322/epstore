import type { Metadata } from "next";
import "./globals.css";
import { ClientBody } from "../ClientBody";

export const metadata: Metadata = {
  title: "Safe Market - Shop",
  description: "Safe Market Shop Page - Premium software solutions for gaming lovers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <ClientBody>{children}</ClientBody>
    </html>
  );
}
