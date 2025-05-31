import { Project, ComparisonProject } from '@/types/project'

export const projects: Project[] = [
  {
    id: "1",
    title: "Dynamic Transitions",
    description: "Fast-paced edit with seamless flow and creative transitions. #editing #transitions #creative",
    videoUrl: "/videos/Edit 1.mp4",
    thumbnailUrl: "/videos/Edit 1.mp4",
    isPortrait: true,
    date: "2024-03-20",
    categories: ["Transitions", "Effects", "Creative"],
    technologies: ["After Effects", "Premiere Pro"],
    client: "Portfolio",
    stats: {
      likes: "128K",
      views: "1.2M",
      shares: "45K",
      comments: "3.2K"
    },
    gradient: "linear-gradient(to bottom right, #FF4D4D, #F9CB28)"
  },
  {
    id: "2",
    title: "Cinematic Flow",
    description: "Smooth cinematic sequences with professional color grading. #cinematic #storytelling #smooth",
    videoUrl: "/videos/Edit 2.mp4",
    thumbnailUrl: "/videos/Edit 2.mp4",
    isPortrait: true,
    date: "2024-03-18",
    categories: ["Cinematic", "Color Grading", "Storytelling"],
    technologies: ["DaVinci Resolve", "LUTs"],
    client: "Portfolio",
    stats: {
      likes: "95K",
      views: "890K",
      shares: "32K",
      comments: "2.8K"
    },
    gradient: "linear-gradient(to bottom right, #4158D0, #C850C0)"
  },
  {
    id: "3",
    title: "Visual Symphony",
    description: "Complex visual effects and synchronized motion. #visualeffects #editing #premium",
    videoUrl: "/videos/Edit 3.mp4",
    thumbnailUrl: "/videos/Edit 3.mp4",
    isPortrait: true,
    date: "2024-03-15",
    categories: ["VFX", "Motion", "Premium"],
    technologies: ["After Effects", "Cinema 4D"],
    client: "Portfolio",
    stats: {
      likes: "156K",
      views: "1.5M",
      shares: "48K",
      comments: "4.1K"
    },
    gradient: "linear-gradient(to bottom right, #0093E9, #80D0C7)"
  },
  {
    id: "4",
    title: "Perfect Rhythm",
    description: "Beat-matched cuts and musical synchronization. #musicvideo #sync #beats",
    videoUrl: "/videos/Edit 4.mp4",
    thumbnailUrl: "/videos/Edit 4.mp4",
    isPortrait: true,
    date: "2024-03-12",
    categories: ["Music", "Rhythm", "Sync"],
    technologies: ["Premiere Pro", "Audition"],
    client: "Portfolio",
    stats: {
      likes: "112K",
      views: "980K",
      shares: "38K",
      comments: "2.9K"
    },
    gradient: "linear-gradient(to bottom right, #8EC5FC, #E0C3FC)"
  },
  {
    id: "5",
    title: "Smooth Cuts",
    description: "Clean and precise editing with perfect timing. #editing #precision #flow",
    videoUrl: "/videos/Edit 5.mp4",
    thumbnailUrl: "/videos/Edit 5.mp4",
    isPortrait: true,
    date: "2024-03-10",
    categories: ["Editing", "Precision", "Flow"],
    technologies: ["Premiere Pro", "After Effects"],
    client: "Portfolio",
    stats: {
      likes: "89K",
      views: "820K",
      shares: "29K",
      comments: "2.4K"
    },
    gradient: "linear-gradient(to bottom right, #D9AFD9, #97D9E1)"
  },
  {
    id: "6",
    title: "Creative Vision",
    description: "Unique visual style with creative effects. #creative #unique #style",
    videoUrl: "/videos/Edit 6.mp4",
    thumbnailUrl: "/videos/Edit 6.mp4",
    isPortrait: true,
    date: "2024-03-08",
    categories: ["Creative", "Style", "Effects"],
    technologies: ["After Effects", "Photoshop"],
    client: "Portfolio",
    stats: {
      likes: "134K",
      views: "1.3M",
      shares: "42K",
      comments: "3.6K"
    },
    gradient: "linear-gradient(to bottom right, #85FFBD, #FFFB7D)"
  },
  {
    id: "7",
    title: "Motion Magic",
    description: "Smooth motion graphics and text animations. #motion #effects #smooth",
    videoUrl: "/videos/Edit 7.mp4",
    thumbnailUrl: "/videos/Edit 7.mp4",
    isPortrait: true,
    date: "2024-03-05",
    categories: ["Motion", "Graphics", "Animation"],
    technologies: ["After Effects", "Illustrator"],
    client: "Portfolio",
    stats: {
      likes: "102K",
      views: "950K",
      shares: "35K",
      comments: "2.7K"
    },
    gradient: "linear-gradient(to bottom right, #FBAB7E, #F7CE68)"
  },
  {
    id: "8",
    title: "Perfect Timing",
    description: "Precisely timed transitions and effects. #timing #transitions #pro",
    videoUrl: "/videos/Edit 8.mp4",
    thumbnailUrl: "/videos/Edit 8.mp4",
    isPortrait: true,
    date: "2024-03-01",
    categories: ["Timing", "Transitions", "Professional"],
    technologies: ["Premiere Pro", "After Effects"],
    client: "Portfolio",
    stats: {
      likes: "118K",
      views: "1.1M",
      shares: "39K",
      comments: "3.1K"
    },
    gradient: "linear-gradient(to bottom right, #FF9A8B, #FF6A88)"
  }
]

export const comparisonProjects: ComparisonProject[] = [
  {
    title: "Seamless Transitions",
    description: "See how raw clips transform into smooth, engaging content",
    beforeVideo: "/videos/before-1.mp4",
    afterVideo: "/videos/after-1.mp4",
    category: "Transitions",
    tags: ["Transitions", "Flow", "Editing"]
  },
  {
    title: "Color Grading Magic",
    description: "Watch flat footage become vibrant and cinematic",
    beforeVideo: "/videos/before-2.mp4",
    afterVideo: "/videos/after-2.mp4",
    category: "Color",
    tags: ["Color Grading", "Cinematic", "Look"]
  }
]