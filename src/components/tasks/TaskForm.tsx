// src/components/tasks/TaskForm.tsx
'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useRef } from 'react'
// import { TaskPriority } from '@/types/task'

interface TaskFormProps {
  onSubmit: (formData: FormData) => Promise<void>
}

export function TaskForm({ onSubmit }: TaskFormProps) {
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    await onSubmit(formData)
    formRef.current?.reset()
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Input
          name="title"
          placeholder="Task title"
          required
          className="w-full"
        />
      </div>

      <div>
        <Textarea
          name="description"
          placeholder="Task description"
          className="w-full"
          rows={3}
        />
      </div>

      <div>
        <Select name="priority" defaultValue="MEDIUM">
          <SelectTrigger>
            <SelectValue placeholder="Select priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="LOW">Low</SelectItem>
            <SelectItem value="MEDIUM">Medium</SelectItem>
            <SelectItem value="HIGH">High</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Input
          type="date"
          name="dueDate"
          className="w-full"
        />
      </div>

      <div className="flex justify-end gap-2">
        <Button type="submit">Create Task</Button>
      </div>
    </form>
  )
}