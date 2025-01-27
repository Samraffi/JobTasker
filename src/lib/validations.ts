import { z } from 'zod'

export const projectSchema = z.object({
  title: z.string()
    .min(3, 'Title must be at least 3 characters')
    .max(50, 'Title must be less than 50 characters'),
  description: z.string()
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description must be less than 500 characters')
    .optional(),
})

// Новые типы для задач
export const taskSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title is too long'),
  description: z.string().max(500, 'Description is too long').optional(),
  status: z.enum(['TODO', 'IN_PROGRESS', 'DONE']).default('TODO'),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH']).default('MEDIUM'),
  dueDate: z.date().optional(),
  projectId: z.string(),
  userId: z.string().optional(),
})


export type TaskFormData = z.infer<typeof taskSchema>

// Общие типы для ответов серверных экшенов
export type ActionResponse = {
  success: boolean
  message: string | null
}

export type ProjectFormData = z.infer<typeof projectSchema>
