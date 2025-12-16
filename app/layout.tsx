import Navbar from "@/components/navbar";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./providers/AuthProvider";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JnU-ITS Member Registration",
  description:
    "Join JNU ITS as a new member by filling out the registration form.",

  icons: {
    icon: "/MainLogo.8e23e303.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${figtree.variable} antialiased`}>
        <AuthProvider>
          <Navbar />
          {children}
          <Toaster richColors position="top-center" />
        </AuthProvider>
      </body>
    </html>
  );
}
