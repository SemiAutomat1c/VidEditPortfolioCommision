import { Metadata } from 'next'

const defaultMetadata: Metadata = {
  title: 'Video Editor Portfolio',
  description: 'Professional video editing and post-production services. Specializing in commercial, documentary, and creative content.',
  keywords: 'video editing, post-production, commercial editing, documentary editing, motion graphics',
  authors: [{ name: 'Your Name' }],
  creator: 'Your Name',
  publisher: 'Your Name',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://your-domain.com',
    siteName: 'Video Editor Portfolio',
    title: 'Professional Video Editor',
    description: 'Professional video editing and post-production services',
    images: [
      {
        url: 'https://your-domain.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Video Editor Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@yourtwitterhandle',
    creator: '@yourtwitterhandle',
    title: 'Professional Video Editor',
    description: 'Professional video editing and post-production services',
    images: ['https://your-domain.com/twitter-image.jpg'],
  },
  other: {
    'google-site-verification': 'your-google-verification-code',
  },
}

export default defaultMetadata 