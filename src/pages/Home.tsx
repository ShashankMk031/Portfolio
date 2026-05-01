import { useEffect, useState } from "react"
import ProjectCarousel from "../components/ProjectCarousel"
import RevealSection from "../components/RevealSection"
import { projects } from "../data/projects"

type ProjectFilter = "All" | "AI Systems" | "ML" | "Accessibility"

const filters: ProjectFilter[] = ["All", "AI Systems", "ML", "Accessibility"]

const heroImpactBullets = [
  "90% task extraction accuracy in LLM pipelines",
  "Built multi-provider LLM gateway with fallback",
  "Designed systems with retries, logging, and metrics",
]

const experienceBullets = [
  "Built LLM pipeline converting transcripts into structured tasks",
  "Achieved ~90% extraction accuracy",
  "Designed retry + timeout reliability system",
  "Reduced debugging time by ~40% using logging",
  "Integrated with Notion + Email",
]

const strengths = [
  {
    title: "Reliability",
    description:
      "I design for failures upfront with retries, fallback paths, and defensive interfaces.",
  },
  {
    title: "Observability",
    description:
      "Logs, metrics, and traceable flows are part of the architecture, not cleanup after launch.",
  },
  {
    title: "Performance",
    description:
      "I care about latency budgets, predictable bottlenecks, and practical optimizations that improve user-facing behavior.",
  },
  {
    title: "Real-world Systems",
    description:
      "I build for constraints that matter in production: failure recovery, visibility, latency, and maintainable architecture.",
  },
]

const systemsThinking = [
  "Failure handling first with retries, timeouts, and fallbacks.",
  "Observability built in through logs, metrics, and traceable flows.",
  "Performance awareness across latency, cost, and system bottlenecks.",
  "Clear modular design so features can scale without breaking the core.",
]

function Home() {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>("All")
  const [heroVisible, setHeroVisible] = useState(false)

  const filteredProjects = projects.filter((project) => {
    if (activeFilter === "All") {
      return true
    }

    if (activeFilter === "AI Systems") {
      return project.category === "AI" || project.category === "Systems"
    }

    return project.category === activeFilter
  })

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setHeroVisible(true)
    })

    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <div className="min-h-screen bg-neutral-950 text-zinc-100">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 md:px-10 lg:px-20 lg:py-14">
        <section
          className={`mb-16 grid grid-cols-1 gap-8 rounded-2xl border border-neutral-800 bg-neutral-900 p-6 transition-all duration-700 ease-out md:mb-24 md:grid-cols-2 md:p-8 ${
            heroVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="max-w-3xl text-3xl font-black tracking-tight text-white md:text-5xl">
                Shashank M K
              </h1>
              <p className="text-base text-zinc-300 md:text-xl">
                AI Engineer — LLM Systems &amp; Backend Reliability
              </p>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-zinc-400 md:text-base">
              Building production-ready LLM pipelines with reliability, observability, and performance focus.
            </p>
            <ul className="space-y-3">
              {heroImpactBullets.map((item) => (
                <li key={item} className="flex gap-3 text-sm font-medium text-white md:text-base">
                  <span className="text-emerald-300">✔</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="max-w-2xl text-sm leading-7 text-zinc-400 md:text-base">
              I focus on shipping AI systems that stay understandable under failure, measurable in production, and practical to scale.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white bg-white px-5 py-3 text-sm font-semibold text-zinc-950 transition duration-300 hover:bg-neutral-950 hover:text-white"
              >
                Resume
              </a>
              <a
                href="mailto:shashankmk031@gmail.com"
                className="rounded-full border border-neutral-700 px-5 py-3 text-sm font-semibold text-zinc-200 transition duration-300 hover:border-white hover:bg-white hover:text-neutral-950"
              >
                Contact
              </a>
            </div>
          </div>

          <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-5 md:p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-zinc-500">
              Recruiter Snapshot
            </p>
            <div className="mt-4 space-y-4 text-sm leading-7 text-zinc-300 md:text-base">
              <p>LLM infrastructure, backend reliability, and production-focused AI workflows.</p>
              <p>Best signal: systems that recover from failures, expose metrics, and stay operational under real traffic conditions.</p>
            </div>
          </div>
        </section>

        <RevealSection className="mb-16 space-y-6 md:mb-24">
          <div className="space-y-3">
            <p className="text-sm font-medium uppercase tracking-[0.28em] text-zinc-500">
              Projects
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <h2 className="text-2xl font-bold text-white md:text-3xl">System-focused work</h2>
              <p className="max-w-2xl text-sm leading-7 text-zinc-400 md:text-base">
                Fast scan first, deep dive second. Each card shows the engineering outcome, and each page expands into system details.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            {filters.map((filter) => {
              const isActive = filter === activeFilter

              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                    isActive
                      ? "border-white bg-white text-zinc-950"
                      : "border-neutral-800 bg-neutral-900 text-zinc-300 hover:border-neutral-600 hover:bg-neutral-800"
                  }`}
                >
                  {filter}
                </button>
              )
            })}
          </div>
          <ProjectCarousel projects={filteredProjects} />
        </RevealSection>

        <RevealSection className="mb-16 md:mb-24">
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6 md:p-8">
            <p className="text-sm font-medium uppercase tracking-[0.28em] text-zinc-500">
              Experience
            </p>
            <h2 className="mt-3 text-2xl font-bold text-white md:text-3xl">AI Engineering Intern — Auras AI</h2>
            <ul className="mt-6 space-y-3 text-sm leading-7 text-zinc-300 md:text-base">
              {experienceBullets.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </RevealSection>

        <RevealSection className="mb-16 md:mb-24">
          <div className="space-y-3">
            <p className="text-sm font-medium uppercase tracking-[0.28em] text-zinc-500">
              Why Me
            </p>
            <h2 className="text-2xl font-bold text-white md:text-3xl">Built for real-world systems</h2>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            {strengths.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-neutral-800 bg-neutral-900 p-5 transition hover:border-neutral-600"
              >
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-zinc-400 md:text-base">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </RevealSection>

        <RevealSection className="mb-16 md:mb-24">
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6 md:p-8">
            <p className="text-sm font-medium uppercase tracking-[0.28em] text-zinc-500">
              How I Think About Systems
            </p>
            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              {systemsThinking.map((item) => (
                <div key={item} className="rounded-xl border border-neutral-800 bg-neutral-950 p-5">
                  <p className="text-sm leading-7 text-zinc-300 md:text-base">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </RevealSection>

        <RevealSection className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6 md:p-8">
          <p className="text-sm font-medium uppercase tracking-[0.28em] text-zinc-500">Contact</p>
          <div className="mt-4 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h2 className="text-2xl font-bold text-white md:text-3xl">Let’s build dependable AI systems.</h2>
              <p className="mt-3 text-sm leading-7 text-zinc-400 md:text-base">
                Available for backend AI engineering, LLM infrastructure, and architecture-focused product work.
              </p>
            </div>
            <a
              href="mailto:shashankmk031@gmail.com"
              className="rounded-full border border-neutral-700 px-5 py-3 text-sm font-semibold text-zinc-200 transition hover:border-neutral-500 hover:bg-neutral-800"
            >
              shashankmk031@gmail.com
            </a>
          </div>
        </RevealSection>
      </div>
    </div>
  )
}

export default Home
