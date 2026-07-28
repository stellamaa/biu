type ProjectLink = {
  _id: string
  slug?: {current?: string | null} | null
}

export function getProjectPath(project: ProjectLink): string {
  const segment = project.slug?.current?.trim() || project._id
  return `/projects/${encodeURIComponent(segment)}`
}
