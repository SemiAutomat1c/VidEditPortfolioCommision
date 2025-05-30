declare global {
  interface Window {
    gtag: (...args: any[]) => void
  }
}

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID

// Log page views
export const pageview = (url: string) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  })
}

// Log specific events
export const event = ({ action, category, label, value }: {
  action: string
  category: string
  label: string
  value?: number
}) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  })
}

// Log video interactions
export const logVideoInteraction = (action: 'play' | 'pause' | 'complete', videoTitle: string) => {
  event({
    action: `video_${action}`,
    category: 'Video',
    label: videoTitle,
  })
}

// Log project filter usage
export const logFilterUsage = (filterType: 'category' | 'technology', value: string) => {
  event({
    action: 'filter_applied',
    category: 'Project Filter',
    label: `${filterType}:${value}`,
  })
}

// Log contact form submissions
export const logFormSubmission = (formType: string) => {
  event({
    action: 'form_submit',
    category: 'Form',
    label: formType,
  })
}

// Log social media clicks
export const logSocialClick = (platform: string) => {
  event({
    action: 'social_click',
    category: 'Social',
    label: platform,
  })
} 