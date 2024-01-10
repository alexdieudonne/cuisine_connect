"use client";
import "./globals.css";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import Header from "@/components/Header";
import { Provider } from "react-redux";
import { store } from "./store";
import { CookiesProvider } from "react-cookie";
// import ChatBot from "react-simple-chatbot";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const steps = [
    {
      id: "0",
      message: "Welcome to react chatbot!",
      trigger: "1",
    },
    {
      id: "1",
      message: "Bye!",
      end: true,
    },
  ];
  return (
    <CookiesProvider defaultSetOptions={{ path: "/" }}>
      <Provider store={store}>
        <html lang="en">
          <body
            className={cn(
              "min-h-screen bg-background font-sans antialiased",
              fontSans.variable
            )}
          >
            {/* <ChatBot steps={steps} /> */}
            {children}
          </body>
        </html>
      </Provider>
    </CookiesProvider>
  );
}
