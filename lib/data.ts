export interface Celebrity {
  id: number
  name: string
  slug: string
  title: string
  bio: string
  image: string
  recommendations: Recommendation[]
}

export interface Recommendation {
  id: number
  type: "tv" | "movie" | "music"
  title: string
  description: string
  image: string
  links: {
    platform: string
    url: string
  }[]
}

export const celebrities: Celebrity[] = [
  {
    id: 1,
    name: "Elon Musk",
    slug: "elon-musk",
    title: "Entrepreneur & CEO",
    bio: "Elon Musk is the CEO of SpaceX, Tesla, and several other companies. Known for his ambitious goals to reduce global warming and establish a human colony on Mars.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/USAFA_Hosts_Elon_Musk_%28Image_1_of_17%29_%28cropped%29.jpg/180px-USAFA_Hosts_Elon_Musk_%28Image_1_of_17%29_%28cropped%29.jpg?height=200&width=200",
    recommendations: [
      {
        id: 101,
        type: "tv",
        title: "Rick and Morty",
        description:
          "Elon has mentioned being a fan of this animated sci-fi sitcom that follows the misadventures of cynical mad scientist Rick Sanchez and his good-hearted but fretful grandson Morty Smith.",
        image: "/placeholder.svg?height=400&width=600",
        links: [
          {
            platform: "Netflix",
            url: "https://www.netflix.com/title/80014749",
          },
          {
            platform: "Hulu",
            url: "https://www.hulu.com/series/rick-and-morty-d76d6361-3fbf-4842-8dd7-e05520557280",
          },
        ],
      },
      {
        id: 102,
        type: "movie",
        title: "Spaceballs",
        description:
          "Musk has referenced this Mel Brooks sci-fi parody as one of his favorite movies, which satirizes the original Star Wars trilogy.",
        image: "/placeholder.svg?height=400&width=600",
        links: [
          {
            platform: "Amazon Prime",
            url: "https://www.amazon.com/Spaceballs-Mel-Brooks/dp/B000I9YLMQ",
          },
        ],
      },
      {
        id: 103,
        type: "music",
        title: "Daft Punk - Around the World",
        description: "Elon has expressed appreciation for electronic music, including Daft Punk's iconic tracks.",
        image: "/placeholder.svg?height=400&width=600",
        links: [
          {
            platform: "Spotify",
            url: "https://open.spotify.com/track/1pKYYY0dkg23sQQXi0Q5zN",
          },
          {
            platform: "YouTube",
            url: "https://www.youtube.com/watch?v=dwDns8x3Jb4",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Taylor Swift",
    slug: "taylor-swift",
    title: "Singer-Songwriter",
    bio: "Taylor Swift is one of the most successful singer-songwriters of all time, known for her narrative songs about her personal life and evolution of musical styles.",
    image: "/placeholder.svg?height=200&width=200",
    recommendations: [
      {
        id: 201,
        type: "tv",
        title: "Friends",
        description:
          "Taylor has mentioned being a big fan of the classic sitcom Friends, even naming one of her cats after Jennifer Aniston's character, Rachel.",
        image: "/placeholder.svg?height=400&width=600",
        links: [
          {
            platform: "HBO Max",
            url: "https://www.hbomax.com/series/urn:hbo:series:GXdbR_gOXWJuAuwEAACVH",
          },
          {
            platform: "Netflix",
            url: "https://www.netflix.com/title/70153404",
          },
        ],
      },
      {
        id: 202,
        type: "movie",
        title: "Love Actually",
        description:
          "Taylor has expressed her love for this romantic comedy ensemble film, especially during the holiday season.",
        image: "/placeholder.svg?height=400&width=600",
        links: [
          {
            platform: "Amazon Prime",
            url: "https://www.amazon.com/Love-Actually-Hugh-Grant/dp/B009CG9CXO",
          },
        ],
      },
      {
        id: 203,
        type: "music",
        title: "Patsy Cline - Crazy",
        description:
          "Taylor has cited Patsy Cline as one of her influences and has mentioned loving this classic song.",
        image: "/placeholder.svg?height=400&width=600",
        links: [
          {
            platform: "Spotify",
            url: "https://open.spotify.com/track/4Ub8UsjWuewQrPhuepSVFL",
          },
          {
            platform: "YouTube",
            url: "https://www.youtube.com/watch?v=MbnrdCS57d0",
          },
        ],
      },
    ],
  },
  {
    id: 3,
    name: "Dwayne Johnson",
    slug: "dwayne-johnson",
    title: "Actor & Producer",
    bio: "Dwayne 'The Rock' Johnson is an actor, producer, and former professional wrestler. He is known for his charismatic personality and roles in action films.",
    image: "/placeholder.svg?height=200&width=200",
    recommendations: [
      {
        id: 301,
        type: "tv",
        title: "The Office",
        description:
          "Dwayne has mentioned being a fan of this mockumentary sitcom about the everyday lives of office employees.",
        image: "/placeholder.svg?height=400&width=600",
        links: [
          {
            platform: "Peacock",
            url: "https://www.peacocktv.com/stream-tv/the-office",
          },
          {
            platform: "Amazon Prime",
            url: "https://www.amazon.com/The-Office-Season-1/dp/B000U9OJLK",
          },
        ],
      },
      {
        id: 302,
        type: "movie",
        title: "It's a Wonderful Life",
        description:
          "Johnson has shared that this classic film is one of his favorite holiday movies that he watches with his family.",
        image: "/placeholder.svg?height=400&width=600",
        links: [
          {
            platform: "Amazon Prime",
            url: "https://www.amazon.com/Its-Wonderful-Life-James-Stewart/dp/B000HEWEJO",
          },
        ],
      },
      {
        id: 303,
        type: "music",
        title: "Metallica - Enter Sandman",
        description:
          "The Rock has shared that he listens to Metallica during his intense workout sessions, with this being one of his favorite tracks.",
        image: "/placeholder.svg?height=400&width=600",
        links: [
          {
            platform: "Spotify",
            url: "https://open.spotify.com/track/5sICkBXVmaCQk5aISGR3x1",
          },
          {
            platform: "YouTube",
            url: "https://www.youtube.com/watch?v=CD-E-LDc384",
          },
        ],
      },
    ],
  },
]

