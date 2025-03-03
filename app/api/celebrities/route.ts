import { NextResponse } from "next/server"
import { getAllCelebrities } from "@/lib/celebrities"

export async function GET() {
  const celebrities = await getAllCelebrities()
  return NextResponse.json(celebrities)
}

