import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Clerk Private Metadata Demo",
  description: "Learn how to access private metadata on Client vs Server",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} min-h-screen bg-neutral-950 text-neutral-50 antialiased`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
