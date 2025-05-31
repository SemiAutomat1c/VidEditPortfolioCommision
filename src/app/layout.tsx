import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import ErrorBoundary from '@/components/ErrorBoundary'
import BackToTop from '@/components/BackToTop'
import defaultMetadata from './metadata'
import { Analytics } from '@vercel/analytics/react'
import { GA_TRACKING_ID } from '@/utils/analytics'
import { ThemeProvider } from './providers'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = defaultMetadata

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_TRACKING_ID}');
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans bg-primary text-primary-light dark:text-white transition-colors duration-300`} suppressHydrationWarning>
        <ErrorBoundary>
          <ThemeProvider>
            <Navigation />
            {children}
            <BackToTop />
          </ThemeProvider>
        </ErrorBoundary>
        <Analytics />
      </body>
    </html>
  )
} 