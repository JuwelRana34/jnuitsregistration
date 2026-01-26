import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./providers/AuthProvider";
import Navbar from "@/components/navbar";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://join.jnuits.org.bd"),
  title: "JnU-ITS Registration",
  description:
    "Join JNU ITS as a new member by filling out the official registration form.",

  keywords: [
    "JnU ITS",
    "JNU IT Society",
    "JnU ITS member registration",
    "Jagannath University IT Society",
    "ITS membership",
    "JNU student organization",
    "IT society Bangladesh",
  ],

  icons: {
    icon: "/MainLogo.svg",
  },

  openGraph: {
    title: "JnU-ITS Member Registration",
    description:
      "Become a member of Jagannath University IT Society (JnU ITS). Register now to join the community.",
    url: "https://join.jnuits.org.bd/",
    siteName: "JnU ITS",
    images: [
      {
        url: "https://res.cloudinary.com/dbwbwwteo/image/upload/v1746006142/jnu%20its/487071954_963461729311150_213539538489395892_n_nihhkj.jpg",
        width: 1200,
        height: 630,
        alt: "JnU ITS Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "JnU-ITS Member Registration",
    description:
      "Register now to become a member of Jagannath University IT Society (JnU ITS).",
    images: [
      "https://res.cloudinary.com/dbwbwwteo/image/upload/v1746006142/jnu%20its/487071954_963461729311150_213539538489395892_n_nihhkj.jpg",
    ],
  },
  robots: {
    index: true,
    follow: true,
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
