'use client'

// import { useState } from 'react'
import Modal from '@/components/ui/Modal'

interface DeleteProjectDialogProps {
  projectTitle: string;
  isOpen: boolean;
  isLoading: boolean;
  onConfirm: () => Promise<void>;
  onCancel: () => void;
}

export default function DeleteProjectDialog({
  projectTitle,
  isOpen,
  isLoading,
  onConfirm,
  onCancel
}: DeleteProjectDialogProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onCancel}
      title="Delete Project"
    >
      <div className="space-y-4">
        <p className="text-gray-700">
          Are you sure you want to delete project {projectTitle}? This action cannot be undone.
        </p>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
          >
            {isLoading ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </Modal>
  )
}