"use client"
import "./globals.css";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import Header from "@/components/Header";
import { Provider } from "react-redux";
import { store } from "./store";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <html lang="en">
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          {children}
        </body>
      </html>
    </Provider>
  );
}
