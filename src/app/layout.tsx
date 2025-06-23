import "@/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";

import { TRPCReactProvider } from "@/trpc/react";
import { ClientLogic } from "@/features/settings/components/ClientLogic";
export const metadata: Metadata = {
  title: "IMDB Chat",
  description: "Chat to ask about IMDB",
  icons: [
    {
      rel: "icon",
      url: "/favicon.ico",
    },
  ],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable}`} suppressHydrationWarning>
      <head>
        {/* Avoid FOUC */}
        <script
          id="get-initial-color-scheme"
          dangerouslySetInnerHTML={{
            __html: `window.DID_FETCH_INITIAL_COLOR||(window.DID_FETCH_INITIAL_COLOR=!0,document.documentElement.dataset.theme=(()=>{const e=localStorage.getItem("theme");if(e&&["dark","light"].includes(e))return e;return window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"})());`,
          }}
        />
      </head>
      <body>
        <ClientLogic />
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
