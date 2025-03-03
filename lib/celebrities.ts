import { prisma } from "./prisma"

export async function getAllCelebrities() {
  return await prisma.celebrity.findMany({
    orderBy: {
      name: "asc",
    },
    include: {
      recommendations: true,
    },
  })
}

export async function getCelebrityBySlug(slug: string) {
  return await prisma.celebrity.findUnique({
    where: {
      slug,
    },
    include: {
      recommendations: true,
    },
  })
}

export async function getRecommendationsByType(type: string) {
  return await prisma.recommendation.findMany({
    where: {
      type,
    },
    include: {
      celebrity: true,
    },
  })
}

export async function searchContent(query: string) {
  const celebrities = await prisma.celebrity.findMany({
    where: {
      OR: [
        {
          name: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          bio: {
            contains: query,
            mode: "insensitive",
          },
        },
      ],
    },
    include: {
      recommendations: true,
    },
  })

  const recommendations = await prisma.recommendation.findMany({
    where: {
      OR: [
        {
          title: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: query,
            mode: "insensitive",
          },
        },
      ],
    },
    include: {
      celebrity: true,
    },
  })

  return { celebrities, recommendations }
}

