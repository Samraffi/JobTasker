// src/app/projects/[id]/tasks/[taskId]/page.tsx
import { getTask } from '@/app/actions/tasks'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { ReactNode } from 'react' // добавляем импорт ReactNode
import TaskStatusSelect from '@/components/tasks/TaskStatusSelect'
import { TaskStatus } from '@/types/task'

// Правильно определяем типы
type PageProps = {
  params: {
    id: string
    taskId: string
  }
}

// Явно указываем тип возвращаемого значения Promise<ReactNode>
export default async function TaskPage({ params }: PageProps): Promise<ReactNode> {
  const task = await getTask(params.taskId)

  if (!task) {
    return <div>Task not found</div>
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <Link
          href={`/projects/${params.id}`}
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to Project
        </Link>
      </div>

      <div className="flex justify-between items-start mb-4">
        <h1 className="text-2xl font-bold">{task.title}</h1>
        <TaskStatusSelect
          taskId={task.id}
          currentStatus={task.status as TaskStatus}
          />
      </div>

      <div className="bg-white rounded-lg border p-6">
        <div className="flex justify-between items-start mb-4">
          <h1 className="text-2xl font-bold">{task.title}</h1>
          <span
            className={`px-3 py-1 rounded-full text-sm ${task.status === 'TODO'
                ? 'bg-gray-100 text-gray-700'
                : task.status === 'IN_PROGRESS'
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-green-100 text-green-700'
              }`}
          >
            {task.status}
          </span>
        </div>

        {task.description && (
          <div className="mt-4">
            <h2 className="text-sm font-semibold text-gray-700 mb-2">Description</h2>
            <p className="text-gray-600">{task.description}</p>
          </div>
        )}

        <div className="mt-6 grid grid-cols-2 gap-4">
          <div>
            <h2 className="text-sm font-semibold text-gray-700 mb-2">Priority</h2>
            <span
              className={`inline-block px-3 py-1 rounded-full text-sm ${task.priority === 'HIGH'
                  ? 'bg-red-100 text-red-700'
                  : task.priority === 'MEDIUM'
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-green-100 text-green-700'
                }`}
            >
              {task.priority}
            </span>
          </div>

          {task.dueDate && (
            <div>
              <h2 className="text-sm font-semibold text-gray-700 mb-2">Due Date</h2>
              <span className="text-gray-600">
                {new Date(task.dueDate).toLocaleDateString()}
              </span>
            </div>
          )}
        </div>

        <div className="mt-6 pt-6 border-t">
          <div className="flex justify-between text-sm text-gray-500">
            <span>Created: {new Date(task.createdAt).toLocaleString()}</span>
            <span>Updated: {new Date(task.updatedAt).toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  )
}