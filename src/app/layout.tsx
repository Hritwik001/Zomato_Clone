import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "bootstrap/dist/css/bootstrap.min.css"
import "@/app/globals.css"
import { CartProvider } from "@/context/CartContext"
import { BuyNowProvider } from "@/context/BuyNowContext"
import Navbar from "@/components/Navbar"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "Zomato Clone",
  description: "Modern food ordering UI"
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <CartProvider>
          <BuyNowProvider>
            <Navbar />
            {children}
          </BuyNowProvider>
        </CartProvider>
      </body>
    </html>
  )
}
