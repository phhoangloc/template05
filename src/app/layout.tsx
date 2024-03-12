import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../style/style.css"
import Provider from "@/redux/component/provider";
const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "My App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
