import Image from "next/image"
import Link from "next/link"
import { Film, Music, Tv } from "lucide-react"
import { searchContent } from "@/lib/celebrities"

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q: string }
}) {
  const query = searchParams.q || ""
  const { celebrities, recommendations } = await searchContent(query)

  const getMediaIcon = (type: string) => {
    switch (type) {
      case "tv":
        return <Tv className="w-5 h-5 text-blue-500" />
      case "movie":
        return <Film className="w-5 h-5 text-red-500" />
      case "music":
        return <Music className="w-5 h-5 text-green-500" />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-2">Search Results</h1>
        <p className="text-gray-600 mb-8">
          Found {celebrities.length} celebrities and {recommendations.length} recommendations for "{query}"
        </p>

        {celebrities.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Celebrities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {celebrities.map((celebrity) => (
                <Link
                  href={`/celebrity/${celebrity.slug}`}
                  key={celebrity.id}
                  className="bg-white rounded-xl shadow hover:shadow-lg transition-shadow overflow-hidden border"
                >
                  <div className="p-6 flex items-center gap-4">
                    <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src={celebrity.image || "/placeholder.svg"}
                        alt={celebrity.name}
                        width={80}
                        height={80}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl">{celebrity.name}</h3>
                      <p className="text-gray-600">{celebrity.title}</p>
                      <p className="text-sm text-gray-500 mt-1">{celebrity.recommendations.length} recommendations</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {recommendations.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Recommendations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendations.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl shadow hover:shadow-lg transition-shadow overflow-hidden border"
                >
                  <div className="aspect-video relative">
                    <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      {getMediaIcon(item.type)}
                      <span className="text-sm font-medium text-gray-600">
                        {item.type === "tv" ? "TV Show" : item.type === "movie" ? "Movie" : "Song"}
                      </span>
                    </div>
                    <h3 className="font-bold text-xl mb-2">{item.title}</h3>
                    <p className="text-gray-700 mb-4 line-clamp-2">{item.description}</p>

                    <Link
                      href={`/celebrity/${item.celebrity.slug}`}
                      className="flex items-center gap-2 text-sm text-purple-600 hover:text-purple-800"
                    >
                      <div className="w-6 h-6 rounded-full overflow-hidden">
                        <Image
                          src={item.celebrity.image || "/placeholder.svg"}
                          alt={item.celebrity.name}
                          width={24}
                          height={24}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <span>Recommended by {item.celebrity.name}</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {celebrities.length === 0 && recommendations.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No results found for "{query}"</p>
            <Link
              href="/"
              className="mt-4 inline-block bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}

