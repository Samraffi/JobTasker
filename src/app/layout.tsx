// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google"
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import AuthProvider from '@/components/providers/AuthProvider'
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="en" className={geistSans.variable}>
      <body className={inter.className + " min-h-screen flex flex-col"}>
        <AuthProvider session={session}>
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}