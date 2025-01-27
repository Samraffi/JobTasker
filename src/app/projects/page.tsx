// src/app/projects/page.tsx
import ProjectCard from '@/components/projects/ProjectCard'
import { getProjects } from '@/app/actions/projects'
import CreateProjectButton from '@/components/projects/CreateProjectButton'

export const dynamic = 'force-dynamic'

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Projects</h1>
          <p className="text-sm text-gray-500">Welcome back, Samraffi</p>
        </div>
        <CreateProjectButton />
      </div>
     
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            id={project.id}
            title={project.title}
            description={project.description}
            createdAt={project.createdAt}
          />
        ))}
      </div>
    </div>
  )
}