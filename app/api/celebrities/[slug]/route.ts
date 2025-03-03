import { NextResponse } from "next/server"
import { getCelebrityBySlug } from "@/lib/celebrities"

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  const celebrity = await getCelebrityBySlug(params.slug)

  if (!celebrity) {
    return new NextResponse(null, { status: 404 })
  }

  return NextResponse.json(celebrity)
}

