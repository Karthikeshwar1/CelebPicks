import Image from "next/image"
import Link from "next/link"
import { getAllCelebrities } from "@/lib/celebrities"

export default async function CelebritiesPage() {
  const celebrities = await getAllCelebrities()

  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">All Celebrities</h1>
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
      </main>
    </div>
  )
}

