'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Clock } from 'lucide-react'
import DeleteProjectDialog from './DeleteProjectDialog'
import { deleteProject } from '@/app/actions/projects'

interface ProjectCardProps {
  id: string
  title: string
  description: string
  createdAt: Date
}

export default function ProjectCard({
  id,
  title,
  description,
  createdAt
}: ProjectCardProps) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(createdAt))

  const handleDelete = async () => {
    try {
      setIsLoading(true)
      setError(null)

      const response = await deleteProject(id)

      if (response.success) {
        setIsDeleteModalOpen(false)
      } else {
        setError(response.message || 'Failed to delete project')
      }
    } catch (err) {
      console.error('Delete error:', err)
      setError('An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start p-4">
        <div className="flex-1">
          <h2 className="font-semibold mb-2">{title}</h2>
          {description && (
            <p className="text-gray-600 text-sm mb-4">{description}</p>
          )}

          <div className="flex items-center text-sm text-gray-500">
            <Clock className="w-4 h-4 mr-1" />
            <span>Created: {formattedDate}</span>
          </div>
        </div>
        <button
          onClick={() => setIsDeleteModalOpen(true)}
          className="text-gray-400 hover:text-red-600 transition-colors duration-200 p-2"
          aria-label={`Delete project ${title}`}
          aria-haspopup="dialog"
          disabled={isLoading}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>

      <div className="border-t p-3 bg-gray-50 flex gap-2">
        <Link
          href={`/projects/${id}`}
          className="flex-1 text-center py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium transition-colors"
          aria-label={`View details for project ${title}`}
        >
          View Details
        </Link>
        <Link
          href={`/projects/${id}/tasks`}
          className="flex-1 text-center py-2 px-4 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 text-sm font-medium transition-colors"
          aria-label={`View tasks for project ${title}`}
        >
          View Tasks
        </Link>
      </div>

      {error && (
        <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      {isDeleteModalOpen && (
        <DeleteProjectDialog
          projectTitle={title}
          isOpen={true}
          isLoading={isLoading}
          onConfirm={handleDelete}
          onCancel={() => !isLoading && setIsDeleteModalOpen(false)}
        />
      )}
    </div>
  )
}