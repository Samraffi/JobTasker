// src/app/projects/[id]/page.tsx
import { getProject } from '@/app/actions/projects'
import { Metadata } from 'next'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { console } from 'inspector'
// import CreateTaskButton from '@/components/tasks/CreateTaskButton'

type Props = {
  params: Promise<{
    id: string
  }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await getProject((await params).id);

  return {
    title: project ? `${project.title} | JobTasker` : 'Project Not Found',
  };
}

export default async function ProjectPage({ params }: Props) {
  const project = await getProject((await params).id)

  if (!project) {
    return (
      <div className="container mx-auto p-4">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold text-gray-900">Project not found</h1>
          <p className="text-gray-600 mt-2">
            The project you&apos;re looking for doesn&apos;t exist.
          </p>
        </div>
      </div>
    )
  }

  if (!project.title) {
    console.error('Project title is null or undefined')
    return (
      <div className="container mx-auto p-4">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold text-gray-900">Error</h1>
          <p className="text-gray-600 mt-2">
            Unable to display project title.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <Link
          href="/projects"
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to Projects
        </Link>
      </div>
      <h1 className="text-2xl font-bold text-gray-900">{project.title}</h1>
    </div>
  )
}
