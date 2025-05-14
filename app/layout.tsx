import type { Metadata } from 'next'
import './globals.css'
import Navbar from "@/components/Navbar"

export const metadata: Metadata = {
  title: 'Gawk-Gawk',
  description: 'Created with gawk',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="google-adsense-account" content="ca-pub-9349683492224058" />
        <script 
          async 
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9349683492224058"
          crossorigin="anonymous" 
        ></script>
      </head>
      <body>
         <Navbar />
        {children}
      </body>
    </html>
  )
}
