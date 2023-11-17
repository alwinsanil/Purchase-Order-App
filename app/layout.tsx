import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Layout from "@/components/Layout";
import Navbar from "@/components/Navbar";

const inter = Roboto({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PO Generator",
  description: "Program to Generate Purchase Order",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="m-2 flex min-h-sceen">
          <Navbar />
          <div className="bg-gray-200 rounded-lg mt-2 mb-2 mr-2 ml-0 flex-grow h-screen p-6">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
