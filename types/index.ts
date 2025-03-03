export interface Celebrity {
  id: number
  name: string
  slug: string
  title: string
  bio: string
  image: string
  socialMedia?: {
    platform: string
    url: string
  }[]
  recommendations: Recommendation[]
}

export interface Recommendation {
  id: number
  type: "tv" | "movie" | "music"
  title: string
  description: string
  image: string
  source?: {
    name: string
    url: string
  }
  links: {
    platform: string
    url: string
  }[]
}

