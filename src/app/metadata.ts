import { Metadata } from 'next'

const defaultMetadata: Metadata = {
  title: 'Jayrome Pillo',
  description: 'Professional video editing and post-production services. Specializing in commercial, documentary, and creative content.',
  keywords: 'video editing, post-production, commercial editing, documentary editing, motion graphics',
  authors: [{ name: 'Jayrome Pillo' }],
  creator: 'Jayrome Pillo',
  publisher: 'Jayrome Pillo',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://your-domain.com',
    siteName: 'Jayrome Pillo',
    title: 'Jayrome Pillo - Professional Video Editor',
    description: 'Professional video editing and post-production services',
    images: [
      {
        url: 'https://your-domain.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Jayrome Pillo Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@yourtwitterhandle',
    creator: '@yourtwitterhandle',
    title: 'Jayrome Pillo - Professional Video Editor',
    description: 'Professional video editing and post-production services',
    images: ['https://your-domain.com/twitter-image.jpg'],
  },
  other: {
    'google-site-verification': 'your-google-verification-code',
  },
}

export default defaultMetadata 