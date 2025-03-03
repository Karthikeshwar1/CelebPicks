import { createClient } from "@supabase/supabase-js"
import type { Database } from "@/types/supabase"

// Create a single supabase client for interacting with your database
export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
)

export async function getAllCelebrities() {
  const { data, error } = await supabase.from("celebrities").select("*").order("name")

  if (error) {
    console.error("Error fetching celebrities:", error)
    return []
  }

  return data
}

export async function getCelebrityBySlug(slug: string) {
  const { data, error } = await supabase
    .from("celebrities")
    .select(`
      *,
      recommendations (*)
    `)
    .eq("slug", slug)
    .single()

  if (error) {
    console.error("Error fetching celebrity:", error)
    return null
  }

  return data
}

export async function getRecommendationsByType(type: string) {
  const { data, error } = await supabase
    .from("recommendations")
    .select(`
      *,
      celebrities (*)
    `)
    .eq("type", type)

  if (error) {
    console.error(`Error fetching ${type} recommendations:`, error)
    return []
  }

  return data
}

