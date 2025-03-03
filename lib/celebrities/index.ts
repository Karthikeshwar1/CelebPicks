import fs from "fs"
import path from "path"
import type { Celebrity } from "@/types"

const celebritiesDirectory = path.join(process.cwd(), "data/celebrities")

export async function getAllCelebrities(): Promise<Celebrity[]> {
  // Get all celebrity JSON files
  const fileNames = fs.readdirSync(celebritiesDirectory)

  const allCelebritiesData = fileNames.map((fileName) => {
    // Remove ".json" from file name to get id
    const slug = fileName.replace(/\.json$/, "")

    // Read JSON file as string
    const fullPath = path.join(celebritiesDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, "utf8")

    // Parse JSON string into object
    const celebrityData = JSON.parse(fileContents)

    // Return data with slug
    return {
      slug,
      ...celebrityData,
    }
  })

  return allCelebritiesData
}

export async function getCelebrityBySlug(slug: string): Promise<Celebrity | null> {
  try {
    const fullPath = path.join(celebritiesDirectory, `${slug}.json`)
    const fileContents = fs.readFileSync(fullPath, "utf8")

    const celebrityData = JSON.parse(fileContents)
    return {
      slug,
      ...celebrityData,
    }
  } catch (error) {
    return null
  }
}

// Get recommendations by type (tv, movie, music)
export async function getRecommendationsByType(type: string): Promise<any[]> {
  const celebrities = await getAllCelebrities()
  const recommendations: any[] = []

  celebrities.forEach((celebrity) => {
    const filteredRecs = celebrity.recommendations.filter((rec) => rec.type === type)

    filteredRecs.forEach((rec) => {
      recommendations.push({
        ...rec,
        celebrity: {
          id: celebrity.id,
          name: celebrity.name,
          slug: celebrity.slug,
          image: celebrity.image,
        },
      })
    })
  })

  return recommendations
}

// Search celebrities and recommendations
export async function searchContent(query: string): Promise<{ celebrities: Celebrity[]; recommendations: any[] }> {
  const celebrities = await getAllCelebrities()
  const lowerQuery = query.toLowerCase()

  const matchedCelebrities = celebrities.filter(
    (celeb) => celeb.name.toLowerCase().includes(lowerQuery) || celeb.bio.toLowerCase().includes(lowerQuery),
  )

  const matchedRecommendations: any[] = []

  celebrities.forEach((celebrity) => {
    const filteredRecs = celebrity.recommendations.filter(
      (rec) => rec.title.toLowerCase().includes(lowerQuery) || rec.description.toLowerCase().includes(lowerQuery),
    )

    filteredRecs.forEach((rec) => {
      matchedRecommendations.push({
        ...rec,
        celebrity: {
          id: celebrity.id,
          name: celebrity.name,
          slug: celebrity.slug,
          image: celebrity.image,
        },
      })
    })
  })

  return {
    celebrities: matchedCelebrities,
    recommendations: matchedRecommendations,
  }
}

