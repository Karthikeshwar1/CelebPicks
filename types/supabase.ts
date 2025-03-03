export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      celebrities: {
        Row: {
          id: number
          name: string
          slug: string
          title: string
          bio: string
          image: string
          created_at: string
        }
        Insert: {
          id?: number
          name: string
          slug: string
          title: string
          bio: string
          image: string
          created_at?: string
        }
        Update: {
          id?: number
          name?: string
          slug?: string
          title?: string
          bio?: string
          image?: string
          created_at?: string
        }
      }
      recommendations: {
        Row: {
          id: number
          celebrity_id: number
          type: "tv" | "movie" | "music"
          title: string
          description: string
          image: string
          links: Json
          created_at: string
        }
        Insert: {
          id?: number
          celebrity_id: number
          type: "tv" | "movie" | "music"
          title: string
          description: string
          image: string
          links: Json
          created_at?: string
        }
        Update: {
          id?: number
          celebrity_id?: number
          type?: "tv" | "movie" | "music"
          title?: string
          description?: string
          image?: string
          links?: Json
          created_at?: string
        }
      }
    }
  }
}

