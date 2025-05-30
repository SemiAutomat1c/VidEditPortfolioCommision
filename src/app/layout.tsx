import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import { ThemeProvider } from '@/context/ThemeContext'
import ErrorBoundary from '@/components/ErrorBoundary'
import BackToTop from '@/components/BackToTop'
import defaultMetadata from './metadata'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = defaultMetadata

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans bg-primary text-primary-light dark:text-white transition-colors duration-300`} suppressHydrationWarning>
        <ThemeProvider>
          <ErrorBoundary>
            <Navigation />
            {children}
            <BackToTop />
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  )
} 