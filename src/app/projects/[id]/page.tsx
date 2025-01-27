// src/app/projects/[id]/page.tsx
import { getProject } from '@/app/actions/projects'
import CreateTaskButton from '@/components/tasks/CreateTaskButton'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { Metadata } from 'next'

type PageProps = {
  params: { id: string }
  searchParams?: { [key: string]: string | string[] | undefined }
}

// @ts-ignore - Временное решение до фикса в Next.js 15+
export async function generateMetadata(params: PageProps['params']): Promise<Metadata> {
  const { id } = params
  const project = await getProject(id)
  return {
    title: project ? `Project: ${project.title}` : 'Project Not Found',
  }
}

export default async function ProjectPage({ params }: { params: PageProps['params'] }) {
  const { id } = params
  const project = await getProject(id)

  if (!project) {
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
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold text-gray-900">Project not found</h1>
          <p className="text-gray-600 mt-2">The project you&apos;re looking for doesn&apos;t exist.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4">
      {/* Навигационная панель */}
      <div className="mb-6">
        <Link
          href="/projects"
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to Projects
        </Link>
      </div>

      {/* Заголовок проекта и кнопка создания задачи */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">{project.title}</h1>
          {project.description && (
            <p className="text-gray-600 mt-1">{project.description}</p>
          )}
        </div>
        <CreateTaskButton projectId={project.id} />
      </div>

      {/* Информация о проекте */}
      <div className="mb-6 text-sm text-gray-500">
        <p>Created: {new Date(project.createdAt).toLocaleDateString()}</p>
        <p>Last updated: {new Date(project.updatedAt).toLocaleDateString()}</p>
      </div>

      {/* Список задач */}
      <div id="tasks" className="mt-6 scroll-mt-6">
        <h2 className="text-xl font-semibold mb-4">Tasks</h2>
        {project.tasks.length === 0 ? (
          <div className="text-center p-8 bg-gray-50 rounded-lg border border-dashed">
            <p className="text-gray-500">No tasks yet</p>
            <p className="text-sm text-gray-400 mt-1">
              Create your first task to get started
            </p>
          </div>
        ) : (
          project.tasks.map((task) => (
            <Link
              href={`/projects/${project.id}/tasks/${task.id}`}
              key={task.id}
              className="block p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow mb-4"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{task.title}</h3>
                  {task.description && (
                    <p className="text-gray-600 mt-1 text-sm">
                      {task.description}
                    </p>
                  )}
                </div>
                <span
                  className={`px-2 py-1 rounded text-sm ${
                    task.status === 'TODO'
                      ? 'bg-gray-100 text-gray-700'
                      : task.status === 'IN_PROGRESS'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-green-100 text-green-700'
                  }`}
                >
                  {task.status}
                </span>
              </div>
              <div className="mt-2 flex gap-2 text-sm text-gray-500">
                <span
                  className={`${
                    task.priority === 'HIGH'
                      ? 'text-red-600'
                      : task.priority === 'MEDIUM'
                      ? 'text-yellow-600'
                      : 'text-green-600'
                  }`}
                >
                  Priority: {task.priority}
                </span>
                {task.dueDate && (
                  <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                )}
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}