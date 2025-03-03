import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import { getAllCelebrities } from "@/lib/celebrities"

// This would be protected by authentication in a real app
export async function POST(request: Request) {
  try {
    const celebrity = await request.json()

    // Validate required fields
    if (!celebrity.name || !celebrity.slug || !celebrity.title || !celebrity.bio || !celebrity.image) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Check if slug already exists
    const celebrities = await getAllCelebrities()
    const slugExists = celebrities.some((c) => c.slug === celebrity.slug)

    if (slugExists) {
      return NextResponse.json({ error: "Slug already exists" }, { status: 400 })
    }

    // Create directory if it doesn't exist
    const celebritiesDirectory = path.join(process.cwd(), "data/celebrities")
    if (!fs.existsSync(celebritiesDirectory)) {
      fs.mkdirSync(celebritiesDirectory, { recursive: true })
    }

    // Write to file
    const filePath = path.join(celebritiesDirectory, `${celebrity.slug}.json`)
    fs.writeFileSync(filePath, JSON.stringify(celebrity, null, 2))

    return NextResponse.json({ success: true, celebrity })
  } catch (error) {
    console.error("Error creating celebrity:", error)
    return NextResponse.json({ error: "Failed to create celebrity" }, { status: 500 })
  }
}

