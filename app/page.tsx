import Image from "next/image"
import Link from "next/link"
import { Search } from "lucide-react"
import { getAllCelebrities } from "@/lib/celebrities"

export default async function Home() {
  const celebrities = await getAllCelebrities()

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded"></div>
            <div className="font-bold text-lg">
              <div>CELEBRITY</div>
              <div>RECOMMENDED MEDIA</div>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/celebrities" className="font-medium hover:text-purple-600 transition-colors">
              Celebrities
            </Link>
            <Link href="/categories" className="font-medium hover:text-purple-600 transition-colors">
              Categories
            </Link>
            <Link href="/shows" className="font-medium hover:text-purple-600 transition-colors">
              Shows
            </Link>
            <Link href="/movies" className="font-medium hover:text-purple-600 transition-colors">
              Movies
            </Link>
            <Link href="/music" className="font-medium hover:text-purple-600 transition-colors">
              Music
            </Link>
          </nav>
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search media or celebrities"
              className="pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>
      </header>

      <main>
        <section className="py-16 md:py-24 text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 max-w-4xl mx-auto">
              Discover shows, movies, and music recommended by the world&apos;s most influential people.
            </h1>
            <p className="text-xl text-gray-600 mb-8">100+ celebrities. Verified recommendations. Updated regularly.</p>
            <div className="relative mx-auto max-w-md md:hidden mb-8">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search media or celebrities"
                className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {celebrities.slice(0, 10).map((celebrity) => (
                <Link
                  href={`/celebrity/${celebrity.slug}`}
                  key={celebrity.id}
                  className="transition-transform hover:scale-105"
                >
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-white shadow-lg">
                    <Image
                      src={celebrity.image || "/placeholder.svg"}
                      alt={celebrity.name}
                      width={80}
                      height={80}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </Link>
              ))}
            </div>
            <div className="flex justify-center">
              <Link
                href="/celebrities"
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full font-medium hover:opacity-90 transition-opacity"
              >
                Browse All Celebrities
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Some of our most popular celebrities</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {celebrities.slice(0, 6).map((celebrity) => (
                <Link
                  href={`/celebrity/${celebrity.slug}`}
                  key={celebrity.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow"
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
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded"></div>
                <div className="font-bold">
                  <div>CELEBRITY</div>
                  <div>RECOMMENDED MEDIA</div>
                </div>
              </div>
              <p className="mt-2 text-gray-400 text-sm">
                Discover what your favorite celebrities are watching and listening to.
              </p>
            </div>
            <div className="flex gap-8">
              <Link href="/about" className="hover:text-purple-400 transition-colors">
                About
              </Link>
              <Link href="/contact" className="hover:text-purple-400 transition-colors">
                Contact
              </Link>
              <Link href="/privacy" className="hover:text-purple-400 transition-colors">
                Privacy
              </Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} Celebrity Recommended Media. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

