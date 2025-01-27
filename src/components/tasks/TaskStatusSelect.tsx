// src/components/tasks/TaskStatusSelect.tsx
'use client'

import { useState } from 'react'
import { updateTaskStatus } from '@/app/actions/tasks'
import { TaskStatus } from '@/types/task'

type TaskStatusSelectProps = {
  taskId: string
  currentStatus: TaskStatus
}

// export default function TaskStatusSelect({ taskId, currentStatus }: TaskStatusSelectProps) {
//   const [status, setStatus] = useState(currentStatus)
//   const [isUpdating, setIsUpdating] = useState(false)

//   const handleStatusChange = async (newStatus: typeof currentStatus) => {
//     setIsUpdating(true)
//     try {
//       const result = await updateTaskStatus(taskId, newStatus)
//       if (result.error) {
//         // Можно добавить toast уведомление об ошибке
//         console.error(result.error)
//         setStatus(currentStatus) // Возвращаем предыдущий статус
//       } else {
//         setStatus(newStatus)
//       }
//     } catch (error) {
//       console.error('Failed to update status:', error)
//       setStatus(currentStatus)
//     } finally {
//       setIsUpdating(false)
//     }
//   }

//   return (
//     <select
//       value={status}
//       onChange={(e) => handleStatusChange(e.target.value as typeof currentStatus)}
//       disabled={isUpdating}
//       className={`px-3 py-1 rounded-full text-sm border ${
//         status === 'TODO'
//           ? 'bg-gray-100 text-gray-700'
//           : status === 'IN_PROGRESS'
//           ? 'bg-blue-100 text-blue-700'
//           : 'bg-green-100 text-green-700'
//       }`}
//     >
//       <option value="TODO">To Do</option>
//       <option value="IN_PROGRESS">In Progress</option>
//       <option value="DONE">Done</option>
//     </select>
//   )
// }

export default function TaskStatusSelect({ taskId, currentStatus }: TaskStatusSelectProps) {
  const [status, setStatus] = useState<TaskStatus>(currentStatus)
  const [isUpdating, setIsUpdating] = useState(false)

  const handleStatusChange = async (newStatus: TaskStatus) => {
    setIsUpdating(true)
    try {
      const result = await updateTaskStatus(taskId, newStatus)
      if (result.error) {
        console.error(result.error)
        setStatus(currentStatus)
      } else {
        setStatus(newStatus)
      }
    } catch (error) {
      console.error('Failed to update status:', error)
      setStatus(currentStatus)
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <select
      value={status}
      onChange={(e) => handleStatusChange(e.target.value as TaskStatus)}
      disabled={isUpdating}
      className={`px-3 py-1 rounded-full text-sm border ${
        status === 'TODO'
          ? 'bg-gray-100 text-gray-700'
          : status === 'IN_PROGRESS'
          ? 'bg-blue-100 text-blue-700'
          : 'bg-green-100 text-green-700'
      }`}
    >
      <option value="TODO">To Do</option>
      <option value="IN_PROGRESS">In Progress</option>
      <option value="DONE">Done</option>
    </select>
  )
}