import { useNavigate } from "react-router-dom"
import { type Project } from "../data/projects"

type ProjectCardProps = {
  project: Project
  isActive: boolean
  mobileStacked?: boolean
}

function ProjectCard({ project, isActive, mobileStacked = false }: ProjectCardProps) {
  const navigate = useNavigate()

  return (
    <article
      onClick={() => navigate(`/project/${project.id}`)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault()
          navigate(`/project/${project.id}`)
        }
      }}
      role="link"
      tabIndex={0}
      className={`group relative flex w-full cursor-pointer flex-col justify-between overflow-hidden rounded-2xl border bg-gradient-to-br p-5 text-white shadow-lg shadow-black/20 transition-all duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.98] ${
        mobileStacked ? "h-[420px]" : "h-[320px]"
      } ${
        isActive
          ? "scale-105 border-white/90 opacity-100 shadow-2xl shadow-black/45"
          : "scale-95 border-neutral-800 opacity-60"
      } hover:scale-105 hover:shadow-xl hover:shadow-black/35 ${project.color}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.22),transparent_42%),radial-gradient(circle_at_bottom_right,rgba(12,12,12,0.28),transparent_50%)]" />

      <div className="relative z-10 flex items-start justify-between gap-3">
        <div className="flex flex-col gap-2">
          {project.featured && (
            <span className="w-fit rounded-full border border-amber-300/40 bg-amber-300/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-amber-100">
              Featured
            </span>
          )}
          <span className="w-fit rounded-full border border-white/20 bg-black/20 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.24em] text-white/90">
            Project {project.id}
          </span>
          <span className="w-fit rounded-full border border-white/20 bg-black/20 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/85">
            {project.category}
          </span>
        </div>

        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(event) => event.stopPropagation()}
          className="rounded-full border border-white/20 bg-black/20 p-2 text-white/90 opacity-70 transition duration-300 hover:scale-105 hover:bg-black/35 hover:text-white hover:opacity-100"
          aria-label={`${project.title} GitHub repository`}
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
            <path d="M12 .5C5.649.5.5 5.736.5 12.194c0 5.168 3.292 9.552 7.86 11.099.575.11.786-.253.786-.566 0-.279-.01-1.019-.015-2-3.197.71-3.872-1.577-3.872-1.577-.523-1.355-1.277-1.716-1.277-1.716-1.044-.731.079-.717.079-.717 1.154.083 1.761 1.205 1.761 1.205 1.026 1.794 2.692 1.276 3.348.976.103-.764.401-1.277.729-1.57-2.552-.297-5.236-1.302-5.236-5.8 0-1.282.447-2.331 1.179-3.153-.118-.298-.511-1.498.112-3.122 0 0 .961-.313 3.149 1.204A10.76 10.76 0 0 1 12 6.919a10.76 10.76 0 0 1 2.867.397c2.187-1.517 3.146-1.204 3.146-1.204.625 1.624.232 2.824.114 3.122.734.822 1.177 1.871 1.177 3.153 0 4.509-2.688 5.5-5.249 5.792.412.364.78 1.082.78 2.181 0 1.574-.014 2.844-.014 3.231 0 .316.207.682.792.565 4.564-1.549 7.854-5.931 7.854-11.097C23.5 5.736 18.351.5 12 .5Z" />
          </svg>
        </a>
      </div>

      <div className="relative z-10 space-y-4">
        <div className="space-y-3">
          <h3 className="max-w-[11ch] text-3xl font-black uppercase leading-[0.95] tracking-tight">
            {project.title}
          </h3>
          <ul className="space-y-2 text-sm leading-6 text-white/88">
            {project.impactBullets.slice(0, 3).map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white/80" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/80">
          {project.tech.join(" · ")}
        </p>
      </div>

      <div className="relative z-10 flex items-end justify-between">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(event) => event.stopPropagation()}
          className="text-sm font-semibold text-white"
        >
          View Code →
        </a>
        <span className="text-xs font-medium uppercase tracking-[0.22em] text-white/75">
          Open case study
        </span>
      </div>
    </article>
  )
}

export default ProjectCard
