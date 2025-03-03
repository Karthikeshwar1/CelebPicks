import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ArrowLeft,
  Film,
  Music,
  Tv,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Twitter,
  Instagram,
  Youtube,
  Globe,
} from "lucide-react"
import { getCelebrityBySlug, getAllCelebrities } from "@/lib/celebrities"
import type { Celebrity, Recommendation } from "@/types"

export default async function CelebrityPage({ params }: { params: { slug: string } }) {
  const celebrity = await getCelebrityBySlug(params.slug)
  const allCelebrities = await getAllCelebrities()

  if (!celebrity) {
    notFound()
  }

  // Separate recommendations by type
  const videoRecommendations = celebrity.recommendations.filter((rec) => rec.type === "tv" || rec.type === "movie")

  const musicRecommendations = celebrity.recommendations.filter((rec) => rec.type === "music")

  // Find other celebrities who recommended the same content
  const findOtherCelebrities = (recommendation: Recommendation) => {
    const otherCelebs: Celebrity[] = []

    allCelebrities.forEach((celeb) => {
      if (celeb.id !== celebrity.id) {
        const hasRecommended = celeb.recommendations.some((rec) => rec.title === recommendation.title)

        if (hasRecommended) {
          otherCelebs.push(celeb)
        }
      }
    })

    return otherCelebs
  }

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

  const getMediaTypeName = (type: string) => {
    switch (type) {
      case "tv":
        return "TV Show"
      case "movie":
        return "Movie"
      case "music":
        return "Song"
      default:
        return "Media"
    }
  }

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "twitter":
        return <Twitter className="w-5 h-5" />
      case "instagram":
        return <Instagram className="w-5 h-5" />
      case "youtube":
        return <Youtube className="w-5 h-5" />
      default:
        return <Globe className="w-5 h-5" />
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto px-4 py-12">
        <Link href="/celebrities" className="inline-flex items-center text-purple-600 hover:text-purple-800 mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to all celebrities
        </Link>

        <div className="flex flex-col md:flex-row gap-8 mb-12">
          <div className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden flex-shrink-0 mx-auto md:mx-0">
            <Image
              src={celebrity.image || "/placeholder.svg"}
              alt={celebrity.name}
              width={192}
              height={192}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-2 text-center md:text-left">{celebrity.name}</h1>
            <p className="text-xl text-gray-600 mb-4 text-center md:text-left">{celebrity.title}</p>
            <p className="text-gray-700 mb-6">{celebrity.bio}</p>

            {/* Social Media Links */}
            {celebrity.socialMedia && celebrity.socialMedia.length > 0 && (
              <div className="flex flex-wrap gap-3 mb-4">
                {celebrity.socialMedia.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-800 transition-colors"
                  >
                    {getSocialIcon(social.platform)}
                    <span>{social.platform}</span>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Quick Navigation */}
        <div className="flex flex-wrap gap-4 mb-8 sticky top-0 bg-white py-4 z-10 border-b">
          <a
            href="#video"
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-800 transition-colors inline-flex items-center gap-2"
          >
            <Film className="w-4 h-4" />
            <span>Movies & TV Shows ({videoRecommendations.length})</span>
          </a>
          <a
            href="#music"
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-800 transition-colors inline-flex items-center gap-2"
          >
            <Music className="w-4 h-4" />
            <span>Music ({musicRecommendations.length})</span>
          </a>
        </div>

        {/* Movies & TV Shows Section */}
        {videoRecommendations.length > 0 && (
          <section id="video" className="mb-16">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Film className="w-6 h-6" />
              Movies & TV Shows
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videoRecommendations.map((item) => (
                <RecommendationCard
                  key={item.id}
                  item={item}
                  getMediaIcon={getMediaIcon}
                  getMediaTypeName={getMediaTypeName}
                  otherCelebrities={findOtherCelebrities(item)}
                />
              ))}
            </div>
          </section>
        )}

        {/* Music Section */}
        {musicRecommendations.length > 0 && (
          <section id="music" className="mb-16">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Music className="w-6 h-6" />
              Music
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {musicRecommendations.map((item) => (
                <RecommendationCard
                  key={item.id}
                  item={item}
                  getMediaIcon={getMediaIcon}
                  getMediaTypeName={getMediaTypeName}
                  otherCelebrities={findOtherCelebrities(item)}
                />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  )
}

function RecommendationCard({
  item,
  getMediaIcon,
  getMediaTypeName,
  otherCelebrities,
}: {
  item: Recommendation
  getMediaIcon: (type: string) => React.ReactNode
  getMediaTypeName: (type: string) => string
  otherCelebrities: Celebrity[]
}) {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition-shadow overflow-hidden border">
      <div className="aspect-video relative">
        <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 mb-2">
          {getMediaIcon(item.type)}
          <span className="text-sm font-medium text-gray-600">{getMediaTypeName(item.type)}</span>
        </div>
        <h3 className="font-bold text-xl mb-2">{item.title}</h3>
        <p className="text-gray-700 mb-4">{item.description}</p>

        {/* Source */}
        {item.source && (
          <div className="mb-4 text-sm">
            <a
              href={item.source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-600 hover:text-purple-800 inline-flex items-center gap-1"
            >
              Source: {item.source.name} <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        )}

        {/* Streaming Links */}
        <div className="flex flex-wrap gap-2 mb-4">
          {item.links.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full text-gray-800 transition-colors"
            >
              {link.platform}
            </a>
          ))}
        </div>

        {/* Other celebrities who recommended this */}
        {otherCelebrities.length > 0 && (
          <details className="text-sm text-gray-600 mt-3">
            <summary className="cursor-pointer hover:text-gray-800 inline-flex items-center gap-1">
              <span>
                Also recommended by {otherCelebrities.length}{" "}
                {otherCelebrities.length === 1 ? "celebrity" : "celebrities"}
              </span>
              <ChevronDown className="w-4 h-4 inline-block group-open:hidden" />
              <ChevronUp className="w-4 h-4 hidden group-open:inline-block" />
            </summary>
            <div className="mt-2 pl-2 border-l-2 border-gray-200">
              {otherCelebrities.map((celeb) => (
                <Link key={celeb.id} href={`/celebrity/${celeb.slug}`} className="block py-1 hover:text-purple-600">
                  {celeb.name}
                </Link>
              ))}
            </div>
          </details>
        )}
      </div>
    </div>
  )
}

