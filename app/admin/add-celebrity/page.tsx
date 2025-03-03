"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Plus, X } from "lucide-react"

export default function AddCelebrityPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [celebrity, setCelebrity] = useState({
    name: "",
    slug: "",
    title: "",
    bio: "",
    image: "",
    socialMedia: [{ platform: "", url: "" }],
    recommendations: [],
  })

  const handleSocialMediaChange = (index, field, value) => {
    const updatedSocialMedia = [...celebrity.socialMedia]
    updatedSocialMedia[index][field] = value
    setCelebrity({ ...celebrity, socialMedia: updatedSocialMedia })
  }

  const addSocialMedia = () => {
    setCelebrity({
      ...celebrity,
      socialMedia: [...celebrity.socialMedia, { platform: "", url: "" }],
    })
  }

  const removeSocialMedia = (index) => {
    const updatedSocialMedia = [...celebrity.socialMedia]
    updatedSocialMedia.splice(index, 1)
    setCelebrity({ ...celebrity, socialMedia: updatedSocialMedia })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // In a real app, this would be an API call to save the celebrity
      console.log("Celebrity data to save:", celebrity)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      alert("Celebrity added successfully!")
      router.push("/admin")
    } catch (error) {
      console.error("Error adding celebrity:", error)
      alert("Error adding celebrity. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleNameChange = (e) => {
    const name = e.target.value
    // Auto-generate slug from name
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
    setCelebrity({ ...celebrity, name, slug })
  }

  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Add New Celebrity</h1>

        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                value={celebrity.name}
                onChange={handleNameChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
              <input
                type="text"
                value={celebrity.slug}
                onChange={(e) => setCelebrity({ ...celebrity, slug: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
              <p className="text-xs text-gray-500 mt-1">URL-friendly name (auto-generated)</p>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              value={celebrity.title}
              onChange={(e) => setCelebrity({ ...celebrity, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="e.g. Actor & Producer"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
            <textarea
              value={celebrity.bio}
              onChange={(e) => setCelebrity({ ...celebrity, bio: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              rows={4}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
            <input
              type="url"
              value={celebrity.image}
              onChange={(e) => setCelebrity({ ...celebrity, image: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="https://example.com/image.jpg"
              required
            />
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">Social Media</label>
              <button
                type="button"
                onClick={addSocialMedia}
                className="text-sm bg-purple-100 text-purple-800 px-2 py-1 rounded-md hover:bg-purple-200 flex items-center gap-1"
              >
                <Plus className="w-3 h-3" /> Add
              </button>
            </div>

            {celebrity.socialMedia.map((social, index) => (
              <div key={index} className="flex gap-4 mb-2">
                <div className="flex-1">
                  <input
                    type="text"
                    value={social.platform}
                    onChange={(e) => handleSocialMediaChange(index, "platform", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Platform (e.g. Twitter)"
                  />
                </div>
                <div className="flex-1">
                  <input
                    type="url"
                    value={social.url}
                    onChange={(e) => handleSocialMediaChange(index, "url", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="URL"
                  />
                </div>
                {celebrity.socialMedia.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeSocialMedia(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-8">
            <button
              type="button"
              onClick={() => router.push("/admin")}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Celebrity"}
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}

