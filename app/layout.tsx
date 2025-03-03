import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Link from "next/link"
import { Search } from "lucide-react"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Celebrity Recommended Media",
  description: "Discover shows, movies, and music recommended by the world's most influential people",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="border-b sticky top-0 bg-white z-10">
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
              <form action="/search" method="get">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  name="q"
                  placeholder="Search media or celebrities"
                  className="pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </form>
            </div>
          </div>
        </header>
        {children}
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
      </body>
    </html>
  )
}



import './globals.css'