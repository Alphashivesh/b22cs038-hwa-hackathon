import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Pawtrol - AI Dog Supervision & Control System',
  description: 'The first distributed AI system that watches, guides, and cares for your dog 24/7. Seeker devices monitor. Action Taker devices respond. Your dog, always supervised, always safe.',
  keywords: ['dog monitoring', 'pet camera', 'smart pet devices', 'AI pet care', 'dog safety', 'automated pet care'],
  authors: [{ name: 'Pawtrol' }],
  openGraph: {
    title: 'Pawtrol - AI Dog Supervision & Control System',
    description: 'The first distributed AI system that watches, guides, and cares for your dog 24/7.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Pawtrol',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pawtrol - AI Dog Supervision & Control System',
    description: 'The first distributed AI system that watches, guides, and cares for your dog 24/7.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} font-sans`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-white text-dark-900 antialiased">
        {children}
      </body>
    </html>
  )
}