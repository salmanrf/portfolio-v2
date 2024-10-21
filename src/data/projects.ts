import hevyassistantPreview from "../assets/img/hevy-assistant.gif"
import odinbookPreview from "../assets/img/odin.gif";
import steamclonePreview from "../assets/img/steamclone.gif";
import finedealPreview from "../assets/img/finedeal.gif";

export type ProjectData = {
  year: number
  projects: ProjectDetails[]
}[]

export type ProjectDetails = {
  title: string
  description: string
  previewImage: string
  liveLink?: string | null
  sourceLink: string,
  features: string[],
  technologies: string[]
}

export const projectData: ProjectData = [
  {
    year: 2024,
    projects: [
      {
        title: "Hevy Assistant",
        description: `An unoffical AI powered assistant for Hevy, Designed to help Weightlifters with program review,
exercise progressions, and general advice.
This project consists of two services: The chat interface, which is a chrome extension injected to the
Hevy website, and a Back- End service.`,
        previewImage: hevyassistantPreview,
        liveLink: null,
        sourceLink: "https://github.com/salmanrf/hevy-assistant",
        features: [
          "AI personal trainer chat",
          "Workout review",
          "Exercise progressions guidance",
          "General advices"
        ],
        technologies: [
          "Plasmo",
          "TypeScript",
          "React",
          "Python",
          "Socketio",
          "Langgraph",
          "Langchain",
          "Anthropic's claude-sonnet",
          "MongoDB",
        ],
      }
    ]
  },
  {
    year: 2021,
    projects: [
      {
        title: "Fin(d)e Deal",
        description: "An application leveraging web scraping to find game sales and comparing price between stores.",
        previewImage: finedealPreview,
        liveLink: "https://finedeal.netlify.app/",
        sourceLink: "https://github.com/salmanrf/fin-d-e_deal",
        features: [
          "Wishlist Highlights",
          "Highlight sales from steam, gog and humble-bundle",
          "Paginate sales list from steam, gog and humble-bundle",
          "Add/remove wishlist",
          "Authentication",
          "Compare game prices between stores",
          "Search games",
        ],
        technologies: [
          "MongoDB",
          "Express",
          "React",
          "Zustand",
          "Sass",
          "Redis",
          "NodeJS",
          "react-router-dom",
          "jsonwebtoken",
          "cheerio",
        ],
      },
      {
        title: "OdinBook",
        description: "Fullstack MERN Social Media application",
        previewImage: odinbookPreview,
        liveLink: "https://odin-book.netlify.app/",
        sourceLink: "https://github.com/salmanrf/odin-book",
        features: [
          "Authentication",
          "User Settings",
          "CRUD posts",
          "CRUD comments",
          "CRUD post reactions",
          "CRUD friends",
          "Search user and post",
        ],
        technologies: [
          "MongoDB",
          "Mongoose",
          "Express",
          "React",
          "react-router-dom",
          "jsonwebtoken",
          "NodeJS",
        ],
      },
      {
        title: "Steam Clone (CRUD)",
        description: "A simplified clone of steam.",
        previewImage: steamclonePreview,
        liveLink: "https://steam-crud.herokuapp.com/",
        sourceLink: "https://github.com/salmanrf/steam-clone",
        features: [
          "Authentication",
          "Dashboard (Admin)",
          "CRUD games (Admin)",
          "Browse games by genres/developers/publishers",
          "Create and read forum post",
        ],
        technologies: ["MongoDB", "Mongoose", "Express", "HTML", "CSS", "Pug", "PassportJS", "NodeJS"],
      },
    ]
  }
]
