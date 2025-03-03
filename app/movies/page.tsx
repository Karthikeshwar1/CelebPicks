import Image from "next/image"
import Link from "next/link"
import { Film } from "lucide-react"
import { getRecommendationsByType } from "@/lib/celebrities"

export default async function MoviesPage() {
  const movies = await getRecommendationsByType("movie")

  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
          <Film className="w-10 h-10 text-red-500" />
          Movies
        </h1>
        <p className="text-xl text-gray-600 mb-8">Movies recommended by celebrities</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition-shadow overflow-hidden border"
            >
              <div className="aspect-video relative">
                <Image src={movie.image || "/placeholder.svg"} alt={movie.title} fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl mb-2">{movie.title}</h3>
                <p className="text-gray-700 mb-4 line-clamp-2">{movie.description}</p>

                <Link
                  href={`/celebrity/${movie.celebrity.slug}`}
                  className="flex items-center gap-2 text-sm text-purple-600 hover:text-purple-800"
                >
                  <div className="w-6 h-6 rounded-full overflow-hidden">
                    <Image
                      src={movie.celebrity.image || "/placeholder.svg"}
                      alt={movie.celebrity.name}
                      width={24}
                      height={24}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <span>Recommended by {movie.celebrity.name}</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

