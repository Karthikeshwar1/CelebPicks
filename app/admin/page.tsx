"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Film, Music, Tv, Plus, Edit, Trash } from "lucide-react"

export default function AdminPage() {
  const [celebrities, setCelebrities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchCelebrities() {
      try {
        const response = await fetch("/api/celebrities")
        if (!response.ok) {
          throw new Error("Failed to fetch celebrities")
        }
        const data = await response.json()
        setCelebrities(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchCelebrities()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading celebrities...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">Error: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Admin Dashboard</h1>
          <Link
            href="/admin/add-celebrity"
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Celebrity
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Celebrity
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Title
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Recommendations
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {celebrities.map((celebrity) => (
                  <tr key={celebrity.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 relative">
                          <Image
                            className="h-10 w-10 rounded-full object-cover"
                            src={celebrity.image || "/placeholder.svg"}
                            alt={celebrity.name}
                            fill
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{celebrity.name}</div>
                          <div className="text-sm text-gray-500">{celebrity.slug}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{celebrity.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-2">
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          <Tv className="w-3 h-3 mr-1" />
                          {celebrity.recommendations.filter((r) => r.type === "tv").length}
                        </span>
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                          <Film className="w-3 h-3 mr-1" />
                          {celebrity.recommendations.filter((r) => r.type === "movie").length}
                        </span>
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          <Music className="w-3 h-3 mr-1" />
                          {celebrity.recommendations.filter((r) => r.type === "music").length}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-3">
                        <Link
                          href={`/admin/edit-celebrity/${celebrity.slug}`}
                          className="text-indigo-600 hover:text-indigo-900 flex items-center gap-1"
                        >
                          <Edit className="w-4 h-4" /> Edit
                        </Link>
                        <button
                          className="text-red-600 hover:text-red-900 flex items-center gap-1"
                          onClick={() => {
                            if (window.confirm(`Are you sure you want to delete ${celebrity.name}?`)) {
                              // Delete functionality would go here
                              alert("Delete functionality would be implemented here")
                            }
                          }}
                        >
                          <Trash className="w-4 h-4" /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}

