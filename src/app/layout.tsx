import type { Metadata } from 'next'
import { Roboto, Open_Sans } from 'next/font/google'
import '../styles/globals.css'

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
})

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open-sans',
})

export const metadata: Metadata = {
  title: 'SPE Mumbai Section',
  description: 'Society of Petroleum Engineers Mumbai Section - Advancing the oil and gas industry in India through knowledge sharing and professional development.',
  keywords: 'SPE, Society of Petroleum Engineers, Mumbai Section, Oil and Gas, Energy Industry, Professional Development',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${roboto.variable} ${openSans.variable}`}>
      <body className="min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  )
} 