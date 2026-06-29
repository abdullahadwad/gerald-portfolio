import { client } from './sanity'
import type { Project } from './types'

const PROJECT_FIELDS = `
  "slug": slug.current,
  title,
  year,
  format,
  duration,
  status,
  logline,
  stills[]{
  _key,
  "url": asset->url,
  hotspot
},
  credits[]{
    role,
    name
  },
  production{
    company,
    country,
    language
  },
  festivals,
  order
`

export async function getAllProjects(): Promise<Project[]> {
  return client.fetch(
    `*[_type == "project"] | order(order asc, year desc) { ${PROJECT_FIELDS} }`,
    {},
    { cache: 'no-store' }
  )
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  return client.fetch(
    `*[_type == "project" && slug.current == $slug][0] { ${PROJECT_FIELDS} }`,
    { slug },
    { cache: 'no-store' }
  )
}