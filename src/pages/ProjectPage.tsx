import { Link, useParams } from "react-router-dom"
import { projects } from "../data/projects"

function ProjectPage() {
  const { id } = useParams()
  const project = projects.find((item) => item.id === Number(id))

  if (!project) {
    return (
      <div className="min-h-screen bg-neutral-950 px-4 py-10 text-zinc-100 sm:px-6 md:px-10 lg:px-20 lg:py-14">
        <div className="mx-auto max-w-6xl rounded-2xl border border-neutral-800 bg-neutral-900 p-6 md:p-8">
          <p className="text-sm uppercase tracking-[0.28em] text-zinc-500">Project</p>
          <h1 className="mt-4 text-3xl font-bold text-white md:text-5xl">Project not found</h1>
          <p className="mt-3 text-sm text-zinc-400 md:text-base">
            The requested project page does not exist in the current data source.
          </p>
          <Link
            to="/"
            className="mt-6 inline-flex rounded-full border border-neutral-700 px-5 py-3 text-sm font-semibold text-zinc-200 transition hover:border-neutral-500 hover:bg-neutral-800"
          >
            Back to home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-950 px-4 py-10 text-zinc-100 sm:px-6 md:px-10 lg:px-20 lg:py-14">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 md:gap-10">
        <Link
          to="/"
          className="w-fit rounded-full border border-neutral-700 px-4 py-2 text-sm font-semibold text-zinc-300 transition hover:border-neutral-500 hover:bg-neutral-800"
        >
          Back
        </Link>

        <header className="relative overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900 p-6 md:p-8">
          <div className={`absolute inset-0 bg-gradient-to-br opacity-20 ${project.color}`} />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.12),transparent_35%)]" />
          <div className="relative z-10">
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-sm uppercase tracking-[0.28em] text-zinc-400">Project {project.id}</p>
              {project.featured && (
                <span className="rounded-full border border-amber-300/40 bg-amber-300/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-amber-100">
                  Featured
                </span>
              )}
              <span className="rounded-full border border-neutral-700 bg-neutral-950/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-zinc-200">
                {project.category}
              </span>
            </div>
            <h1 className="mt-4 text-3xl font-black tracking-tight text-white md:text-5xl">
              {project.title}
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-zinc-300 md:text-base">
              {project.tagline}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              {project.tech.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-neutral-700 bg-neutral-950/70 px-3 py-1.5 text-sm text-zinc-200"
                >
                  {item}
                </span>
              ))}
            </div>

            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-200"
            >
              View Code →
            </a>
          </div>
        </header>

        <section className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6 md:p-8">
          <h2 className="text-2xl font-bold text-white md:text-3xl">What I Built</h2>
          <p className="mt-4 text-sm leading-7 text-zinc-300 md:text-base">{project.whatIBuilt}</p>
        </section>

        <section className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6 md:p-8">
          <h2 className="text-2xl font-bold text-white md:text-3xl">Key Challenges</h2>
          <ul className="mt-5 space-y-3">
            {project.challenges.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-7 text-zinc-300 md:text-base">
                <span className="mt-3 h-2 w-2 shrink-0 rounded-full bg-zinc-200" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6 md:p-8">
          <h2 className="text-2xl font-bold text-white md:text-3xl">How I Solved It</h2>
          <ul className="mt-5 space-y-3">
            {project.solutions.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-7 text-zinc-300 md:text-base">
                <span className="mt-3 h-2 w-2 shrink-0 rounded-full bg-zinc-200" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6 md:p-8">
          <h2 className="text-2xl font-bold text-white md:text-3xl">System Flow</h2>
          <ol className="mt-5 space-y-4">
            {project.flow.map((step, index) => (
              <li key={step} className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-sm font-bold text-zinc-950">
                  {index + 1}
                </span>
                <p className="pt-1 text-sm leading-7 text-zinc-300 md:text-base">{step}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6 md:p-8">
          <h2 className="text-2xl font-bold text-white md:text-3xl">Architecture</h2>
          <ul className="mt-5 space-y-3">
            {project.architecture.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-7 text-zinc-300 md:text-base">
                <span className="mt-3 h-2 w-2 shrink-0 rounded-full bg-zinc-200" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6 md:p-8">
          <h2 className="text-2xl font-bold text-white md:text-3xl">Metrics / Performance</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {project.metrics.map((item) => (
              <div key={item} className="rounded-2xl border border-neutral-800 bg-neutral-950 p-5">
                <p className="text-sm leading-7 text-zinc-300 md:text-base">{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6 md:p-8">
          <h2 className="text-2xl font-bold text-white md:text-3xl">Architecture Image</h2>
          <p className="mt-3 text-sm leading-7 text-zinc-400 md:text-base">
            Drop an image at <code className="rounded bg-black/30 px-2 py-1 text-zinc-200">/public/architecture.png</code> to replace this placeholder.
          </p>
          <div className="mt-6 overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950">
            <div className="flex h-[260px] items-center justify-center px-6 text-center text-sm text-zinc-500">
              Add an architecture diagram to make the system layout visual.
            </div>
            <img
              src="/architecture.png"
              alt="Architecture placeholder"
              className="hidden max-h-[420px] w-full object-cover"
              onLoad={(event) => {
                event.currentTarget.classList.remove("hidden")
                const previousElement = event.currentTarget.previousElementSibling
                previousElement?.classList.add("hidden")
              }}
            />
          </div>
        </section>
      </div>
    </div>
  )
}

export default ProjectPage
