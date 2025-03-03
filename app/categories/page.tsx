import Link from "next/link"
import { Film, Music, Tv } from "lucide-react"

export default function CategoriesPage() {
  const categories = [
    {
      name: "TV Shows",
      slug: "tv",
      icon: <Tv className="w-8 h-8 text-blue-500" />,
      description: "Discover TV shows recommended by celebrities",
      color: "bg-blue-100 border-blue-200",
    },
    {
      name: "Movies",
      slug: "movies",
      icon: <Film className="w-8 h-8 text-red-500" />,
      description: "Explore movies that celebrities love to watch",
      color: "bg-red-100 border-red-200",
    },
    {
      name: "Music",
      slug: "music",
      icon: <Music className="w-8 h-8 text-green-500" />,
      description: "Find out what music your favorite celebrities listen to",
      color: "bg-green-100 border-green-200",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Categories</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              href={`/${category.slug}`}
              key={category.slug}
              className={`${category.color} rounded-xl shadow hover:shadow-lg transition-shadow overflow-hidden border p-6 flex flex-col items-center text-center`}
            >
              <div className="mb-4">{category.icon}</div>
              <h2 className="text-2xl font-bold mb-2">{category.name}</h2>
              <p className="text-gray-700">{category.description}</p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}

