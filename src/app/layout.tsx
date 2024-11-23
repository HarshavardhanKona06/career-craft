import React from "react";

import type { Metadata } from "next";
import "../styles/globals.css";
import { spaceGrotesk, workSans } from "@/lib/font";

export const metadata: Metadata = {
  title: "CareerCraft",
  description: "Streamline your job search and professional networking with an intelligent tracking system.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${workSans.variable} antialiased`}>
      <body>
        {children}
      </body>
    </html>
  );
}
