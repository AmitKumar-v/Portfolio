// Shows ONE project. The data comes from the database through the Projects component.
export default function ProjectCard({ project }) {
  return (
    <article className="rounded-lg border border-border bg-card p-6">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <h3 className="text-xl font-semibold">{project.title}</h3>
        <span className="rounded-md border border-border px-2 py-0.5 text-xs text-muted-foreground">
          {project.status}
        </span>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">{project.tagline}</p>

      <p className="mt-4 leading-relaxed">{project.description}</p>

      {project.features.length > 0 && (
        <>
          <h4 className="mt-6 text-sm font-medium">What it does</h4>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
            {project.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </>
      )}

      {project.techStack.length > 0 && (
        <ul className="mt-6 flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <li key={tech} className="tag">
              {tech}
            </li>
          ))}
        </ul>
      )}

      {(project.githubUrl || project.liveUrl) && (
        <div className="mt-6 flex gap-4 text-sm font-medium text-link">
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noreferrer" className="underline underline-offset-4">
              Source code
            </a>
          )}
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noreferrer" className="underline underline-offset-4">
              Live site
            </a>
          )}
        </div>
      )}
    </article>
  );
}
