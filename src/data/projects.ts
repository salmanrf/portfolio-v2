import hevyassistantPreview from "../assets/img/hevy-assistant.gif"
// import odinbookPreview from "../assets/img/odin.gif";
// import steamclonePreview from "../assets/img/steamclone.gif";
// import finedealPreview from "../assets/img/finedeal.gif";
import capybaraPreview from "../assets/img/capy-system-design.png";

export type ProjectData = {
  year: number
  projects: ProjectDetails[]
}[]

export type ProjectDetails = {
  title: string
  description: string
  previewImage?: string
  liveLink?: string | null
  sourceLink?: string,
  features: string[],
  technologies: string[]
}

export const projectData: ProjectData = [
  {
    year: 2026,
    projects: [
      {
        title: "Slop Control",
        description: `Slop Control is an AI coding workspace for responsible software engineers: plan, review, test, release, and repeat in a single orchestrator dashboard.`,
        liveLink: null,
        sourceLink: "https://github.com/salmanrf/slop-control",
        features: [
          "Launches Claude Code sessions against built-in tickets or connected GitHub Issues",
          "Tracks session status and output live, with results and code diffs available for review",
          "Drafts pull requests, ticket comments, and status changes for explicit human approval",
        ],
        technologies: [
          "TypeScript",
          "React",
          "NestJS",
          "Claude Agent SDK",
          "PostgreSQL",
          "Supabase",
          "GitHub API",
          "Docker",
        ],
      },
      {
        title: "OSTEP Projects",
        description: `My solutions to the projects from Operating Systems: Three Easy Pieces. Unix utilities, a shell, concurrency, and file systems in C, plus kernel work inside xv6.`,
        liveLink: null,
        sourceLink: "https://github.com/salmanrf/ostep-projects",
        features: [
          "Unix utilities, a shell with redirection and parallel commands, and a reverse program",
          "A concurrent web server (thread pool and event loop), parallel zip, and MapReduce",
          "A file system checker",
        ],
        technologies: [
          "C",
          "Linux",
          "POSIX threads",
          "xv6",
        ],
      },
      {
        title: "xv6",
        description: `Kernel work on xv6, the teaching operating system from MIT. Currently implementing a lottery scheduler and a memory allocator.`,
        liveLink: null,
        features: [
          "Lottery scheduler: processes hold tickets, and each time slice a random draw picks who runs",
          "settickets and getpinfo system calls, with children inheriting their parent's ticket count",
          "A memory allocator for the kernel",
        ],
        technologies: [
          "C",
          "RISC-V",
          "xv6",
        ],
      }
    ]
  },
  {
    year: 2025,
    projects: [
      {
        title: "Masbro Cloud",
        description: `Masbro Cloud is an open-source Platform-as-a-Service (PaaS) engine for organizations and self-hosting enthusiasts who want full control of their infrastructure with the ease of a managed platform.`,
        previewImage: capybaraPreview,
        liveLink: null,
        sourceLink: "https://github.com/salmanrf/capybara_cloud",
        features: [
          "Organization, project, and application management",
          "Application deployment: upload source, then extract, build, push, and start a containerized app",
          "Built with test-driven development, distributed tracing, and a distributed architecture designed for high availability",
        ],
        technologies: [
          "Nx Monorepo",
          "Go",
          "chi",
          "PostgreSQL",
          "Supabase Auth",
          "Docker",
          "Caddy",
          "RabbitMQ",
        ],
      }
    ]
  },
  {
    year: 2024,
    projects: [
      {
        title: "Hevy Assistant",
        description: `An unoffical AI powered assistant for Hevy, Designed to help Weightlifters with program review,
exercise progressions, and general advice.
This project consists of two services: The chat interface, which is a chrome extension injected to the
Hevy website, and a Back-end service.`,
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
    projects: [],
    // projects: [
    //   {
    //     title: "Fin(d)e Deal",
    //     description: "An application leveraging web scraping to find game sales and comparing price between stores.",
    //     previewImage: finedealPreview,
    //     liveLink: "https://finedeal.netlify.app/",
    //     sourceLink: "https://github.com/salmanrf/fin-d-e_deal",
    //     features: [
    //       "Wishlist Highlights",
    //       "Highlight sales from steam, gog and humble-bundle",
    //       "Paginate sales list from steam, gog and humble-bundle",
    //       "Add/remove wishlist",
    //       "Authentication",
    //       "Compare game prices between stores",
    //       "Search games",
    //     ],
    //     technologies: [
    //       "MongoDB",
    //       "Express",
    //       "React",
    //       "Zustand",
    //       "Sass",
    //       "Redis",
    //       "NodeJS",
    //       "react-router-dom",
    //       "jsonwebtoken",
    //       "cheerio",
    //     ],
    //   },
    //   {
    //     title: "OdinBook",
    //     description: "Fullstack MERN Social Media application",
    //     previewImage: odinbookPreview,
    //     liveLink: "https://odin-book.netlify.app/",
    //     sourceLink: "https://github.com/salmanrf/odin-book",
    //     features: [
    //       "Authentication",
    //       "User Settings",
    //       "CRUD posts",
    //       "CRUD comments",
    //       "CRUD post reactions",
    //       "CRUD friends",
    //       "Search user and post",
    //     ],
    //     technologies: [
    //       "MongoDB",
    //       "Mongoose",
    //       "Express",
    //       "React",
    //       "react-router-dom",
    //       "jsonwebtoken",
    //       "NodeJS",
    //     ],
    //   },
    //   {
    //     title: "Steam Clone (CRUD)",
    //     description: "A simplified clone of steam.",
    //     previewImage: steamclonePreview,
    //     liveLink: "https://steam-crud.herokuapp.com/",
    //     sourceLink: "https://github.com/salmanrf/steam-clone",
    //     features: [
    //       "Authentication",
    //       "Dashboard (Admin)",
    //       "CRUD games (Admin)",
    //       "Browse games by genres/developers/publishers",
    //       "Create and read forum post",
    //     ],
    //     technologies: ["MongoDB", "Mongoose", "Express", "HTML", "CSS", "Pug", "PassportJS", "NodeJS"],
    //   },
    // ]
  }
]
