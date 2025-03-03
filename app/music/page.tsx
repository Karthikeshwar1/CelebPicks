import Image from "next/image"
import Link from "next/link"
import { Music } from "lucide-react"
import { getRecommendationsByType } from "@/lib/celebrities"

export default async function MusicPage() {
  const music = await getRecommendationsByType("music")

  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
          <Music className="w-10 h-10 text-green-500" />
          Music
        </h1>
        <p className="text-xl text-gray-600 mb-8">Music recommended by celebrities</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {music.map((song) => (
            <div
              key={song.id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition-shadow overflow-hidden border"
            >
              <div className="aspect-video relative">
                <Image src={song.image || "/placeholder.svg"} alt={song.title} fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl mb-2">{song.title}</h3>
                <p className="text-gray-700 mb-4 line-clamp-2">{song.description}</p>

                <Link
                  href={`/celebrity/${song.celebrity.slug}`}
                  className="flex items-center gap-2 text-sm text-purple-600 hover:text-purple-800"
                >
                  <div className="w-6 h-6 rounded-full overflow-hidden">
                    <Image
                      src={song.celebrity.image || "/placeholder.svg"}
                      alt={song.celebrity.name}
                      width={24}
                      height={24}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <span>Recommended by {song.celebrity.name}</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

