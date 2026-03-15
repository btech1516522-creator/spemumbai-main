import type { Metadata } from 'next'
import { Inter, Outfit } from 'next/font/google'
import '../styles/globals.css'
import Chatbot from '@/components/Chatbot'

// Modern, geometric font for headings
const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
})

// Highly legible, tech-forward font for body text
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://spemumbai.org'),
  title: {
    default: 'SPE Mumbai Section | Society of Petroleum Engineers',
    template: '%s | SPE Mumbai Section',
  },
  description: 'Advancing the energy industry in India through knowledge sharing, innovation, and professional development. Join the leading network of energy professionals.',
  keywords: ['SPE', 'Society of Petroleum Engineers', 'Mumbai', 'Oil and Gas', 'Energy Industry', 'Professional Development', 'Engineering'],
  authors: [{ name: 'SPE Mumbai Section' }],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://spemumbai.org', // Replace with your actual domain
    title: 'SPE Mumbai Section | Society of Petroleum Engineers',
    description: 'Advancing the energy industry in India through knowledge sharing, innovation, and professional development.',
    siteName: 'SPE Mumbai',
    // images: [{ url: '/images/og-image.jpg', width: 1200, height: 630 }], // Uncomment when you have an OG image
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SPE Mumbai Section',
    description: 'Advancing the energy industry in India.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html 
      lang="en" 
      className={`${outfit.variable} ${inter.variable} scroll-smooth`}
    >
      <body className="
        relative min-h-screen flex flex-col 
        bg-[#081428] text-slate-50 
        font-sans antialiased 
        selection:bg-sky-500/30 selection:text-sky-100
      ">
        
        {/* --- GLOBAL AMBIENT BACKGROUND --- */}
        {/* This stays fixed across all page navigations, improving performance and visuals */}
        <div className="fixed inset-0 z-[-1] pointer-events-none">
          {/* Deep base gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a1d3a] via-[#14335a] to-[#0a1d3a]" />
          
          {/* Subtle noise texture for premium glassmorphism feel (using standard base64 SVG noise) */}
          <div 
            className="absolute inset-0 opacity-[0.03]"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
          />
        </div>

        {/* --- MAIN CONTENT --- */}
        <div className="flex-grow flex flex-col relative z-0">
          {children}
        </div>

        {/* --- GLOBAL COMPONENTS --- */}
        <div className="relative z-50">
          <Chatbot />
        </div>

      </body>
    </html>
  )
}