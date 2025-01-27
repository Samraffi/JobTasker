// src/components/tasks/CreateTaskButton.tsx
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { PlusIcon } from '@heroicons/react/24/outline'
import { useToast } from '@/components/hooks/use-toast'
import { useRouter } from 'next/navigation'
import { TaskForm } from './TaskForm'
import { TaskPriority, TaskStatus } from '@/types/task'
import { createTask } from '@/app/actions/tasks'

interface CreateTaskButtonProps {
  projectId: string
}

export default function CreateTaskButton({ projectId }: CreateTaskButtonProps) {
  const [open, setOpen] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleCreateTask = async (formData: FormData) => {
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const priority = formData.get('priority') as TaskPriority
    const dueDate = formData.get('dueDate') as string

    const result = await createTask({
      title,
      description,
      priority,
      projectId,
      dueDate: dueDate ? new Date(dueDate) : undefined,
      status: 'TODO' as TaskStatus
    })

    if (result.success) {
      toast({
        title: 'Success',
        description: 'Task created successfully',
      })
      setOpen(false)
      router.refresh()
    } else {
      toast({
        title: 'Error',
        description: result.message || 'Failed to create task',
        variant: 'destructive',
      })
    }
  }

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2"
      >
        <PlusIcon className="h-5 w-5" />
        Add Task
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Task</DialogTitle>
          </DialogHeader>
          <TaskForm onSubmit={handleCreateTask} />
        </DialogContent>
      </Dialog>
    </>
  )
}