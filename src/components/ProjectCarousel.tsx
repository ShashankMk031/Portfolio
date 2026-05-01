import { useEffect, useRef, useState } from "react"
import { type Project } from "../data/projects"
import ProjectCard from "./ProjectCard"

type ProjectCarouselProps = {
  projects: Project[]
}

function ProjectCarousel({ projects }: ProjectCarouselProps) {
  const [index, setIndex] = useState(0)
  const [dragOffset, setDragOffset] = useState(0)
  const [hintOffset, setHintOffset] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const touchStartXRef = useRef<number | null>(null)
  const hasProjects = projects.length > 0

  const goToNext = () => {
    setIndex((previous) => (previous + 1) % projects.length)
  }

  const goToPrevious = () => {
    setIndex((previous) => (previous - 1 + projects.length) % projects.length)
  }

  const getWrappedProject = (offset: number) =>
    projects[(index + offset + projects.length) % projects.length]

  const mobileProjects = hasProjects
    ? [
        { key: "prev", project: getWrappedProject(-1), position: "prev" as const },
        { key: "current", project: getWrappedProject(0), position: "current" as const },
        { key: "next", project: getWrappedProject(1), position: "next" as const },
      ]
    : []

  const desktopProjects = hasProjects
    ? [getWrappedProject(-1), getWrappedProject(0), getWrappedProject(1)]
    : []

  const visualOffset = dragOffset + hintOffset

  useEffect(() => {
    if (!hasProjects) {
      return
    }

    let returnTimer: number | undefined
    const startTimer = window.setTimeout(() => {
      setHintOffset(18)

      returnTimer = window.setTimeout(() => {
        setHintOffset(0)
      }, 260)
    }, 1000)

    return () => {
      window.clearTimeout(startTimer)
      if (returnTimer !== undefined) {
        window.clearTimeout(returnTimer)
      }
    }
  }, [hasProjects])

  const handleTouchStart = (clientX: number) => {
    touchStartXRef.current = clientX
    setIsDragging(true)
  }

  const handleTouchMove = (clientX: number) => {
    const startX = touchStartXRef.current

    if (startX === null) {
      return
    }

    const deltaX = clientX - startX
    const limitedOffset = Math.max(-36, Math.min(36, deltaX * 0.35))
    setDragOffset(limitedOffset)
  }

  const handleTouchEnd = (clientX: number | null) => {
    const startX = touchStartXRef.current

    setIsDragging(false)
    setDragOffset(0)
    touchStartXRef.current = null

    if (startX === null || clientX === null) {
      return
    }

    const deltaX = startX - clientX

    if (Math.abs(deltaX) < 50) {
      return
    }

    if (deltaX > 0) {
      goToNext()
    } else {
      goToPrevious()
    }
  }

  if (!hasProjects) {
    return (
      <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6 text-sm leading-7 text-zinc-400 md:p-8">
        No projects match the selected filter.
      </div>
    )
  }

  return (
    <div
      className={`mx-auto w-full max-w-5xl ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault()
          goToPrevious()
        }

        if (event.key === "ArrowRight") {
          event.preventDefault()
          goToNext()
        }
      }}
    >
      <div className="relative md:hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-30 w-14 bg-gradient-to-r from-black via-black/60 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-30 w-14 bg-gradient-to-l from-black via-black/60 to-transparent" />

        <button
          type="button"
          onClick={goToPrevious}
          className="absolute left-2 top-1/2 z-40 flex -translate-y-1/2 rounded-full bg-neutral-800/80 p-2 text-white transition duration-300 hover:scale-110 active:scale-95"
          aria-label="Show previous project"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18 9 12l6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <button
          type="button"
          onClick={goToNext}
          className="absolute right-2 top-1/2 z-40 flex -translate-y-1/2 rounded-full bg-neutral-800/80 p-2 text-white transition duration-300 hover:scale-110 active:scale-95"
          aria-label="Show next project"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m9 18 6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div
          className="flex w-full justify-center overflow-hidden"
          onTouchStart={(event) => {
            handleTouchStart(event.touches[0]?.clientX ?? 0)
          }}
          onTouchMove={(event) => {
            handleTouchMove(event.touches[0]?.clientX ?? 0)
          }}
          onTouchEnd={(event) => {
            handleTouchEnd(event.changedTouches[0]?.clientX ?? null)
          }}
        >
          <div className="relative flex h-[450px] w-full items-center justify-center">
            {mobileProjects.map(({ key, project, position }) => (
              <div
                key={`${project.id}-${key}`}
                className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ease-in-out ${
                  position === "current" ? "z-20 opacity-100" : "z-10 opacity-60"
                }`}
              >
                <div
                  className={`w-[85%] max-w-[320px] transition-all duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    position === "current"
                      ? "z-20 scale-100"
                      : position === "prev"
                        ? "z-10 opacity-60 blur-[1px] scale-90"
                        : "z-10 opacity-60 blur-[1px] scale-90"
                  }`}
                  style={{
                    transform:
                      position === "current"
                        ? `translateX(${visualOffset}px) scale(1)`
                        : position === "prev"
                          ? `translateX(calc(-90% + ${visualOffset * 0.45}px)) scale(0.9)`
                          : `translateX(calc(90% + ${visualOffset * 0.45}px)) scale(0.9)`,
                  }}
                >
                  <ProjectCard
                    project={project}
                    isActive={position === "current"}
                    mobileStacked
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative hidden md:block">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-black via-black/60 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-black via-black/60 to-transparent" />

        <button
          type="button"
          onClick={goToPrevious}
          className="absolute left-2 top-1/2 z-20 flex -translate-y-1/2 rounded-full bg-neutral-800/80 p-2 text-white transition duration-300 hover:scale-110 active:scale-95"
          aria-label="Show previous project"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18 9 12l6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <button
          type="button"
          onClick={goToNext}
          className="absolute right-2 top-1/2 z-20 flex -translate-y-1/2 rounded-full bg-neutral-800/80 p-2 text-white transition duration-300 hover:scale-110 active:scale-95"
          aria-label="Show next project"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m9 18 6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className="grid grid-cols-3 gap-6">
          {desktopProjects.map((project, projectIndex) => (
            <ProjectCard
              key={`${project.id}-${projectIndex}`}
              project={project}
              isActive={projectIndex === 1}
            />
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center gap-2">
        {projects.map((project, dotIndex) => (
          <button
            key={project.id}
            type="button"
            onClick={() => setIndex(dotIndex)}
            className={`h-2 w-2 rounded-full transition duration-300 ${
              dotIndex === index ? "bg-white" : "bg-neutral-600"
            }`}
            aria-label={`Go to ${project.title}`}
          />
        ))}
      </div>
    </div>
  )
}

export default ProjectCarousel
