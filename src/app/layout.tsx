import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";

const font = Josefin_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GitInvite",
  description: "Github Collab invite link generator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
