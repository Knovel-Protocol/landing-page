
// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";

import { headers } from "next/headers"; // added
import ContextProvider from '@/context'

export const metadata: Metadata = {
  title: "Knovel Protocol",
  description: "Powered by WalletConnect"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookies = headers().get('cookie')

  return (
    <html lang="en">
      <body>
        <ContextProvider cookies={cookies}>{children}</ContextProvider>
      </body>
    </html>
  )
}