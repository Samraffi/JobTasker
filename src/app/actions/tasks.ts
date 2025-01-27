// src/app/actions/tasks.ts
'use server'

import { revalidatePath } from 'next/cache'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'
import { taskSchema, type TaskFormData } from '@/lib/validations'
import { TaskStatus } from '@/types/task'
import { User } from '@/types/user'

export async function createTask(data: TaskFormData) {
  const session = await getServerSession(authOptions)
  const user = session?.user as User | undefined;
  
  if (!session?.user) {
    return {
      success: false,
      message: 'Not authenticated'
    }
  }

  try {
    const validatedData = taskSchema.parse(data)

    await prisma.task.create({
      data: {
        ...validatedData,
        userId: user?.id ?? '',
      },
    })

    revalidatePath(`/projects/${data.projectId}`)
    return { success: true, message: null }
  } catch (error) {
    console.error('Task creation error:', error)
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to create task'
    }
  }
}

export async function updateTaskStatus(taskId: string, status: TaskStatus) {
  try {
    const session = await getServerSession(authOptions)
    const user = session?.user as User | undefined;

    
    if (!session?.user) {
      return { error: 'Unauthorized' }
    }

    const task = await prisma.task.findFirst({
      where: {
        id: taskId,
        userId: user?.id
      }
    })

    if (!task) {
      return { error: 'Task not found' }
    }

    const updatedTask = await prisma.task.update({
      where: {
        id: taskId
      },
      data: {
        status
      }
    })

    revalidatePath(`/projects/${task.projectId}/tasks/${taskId}`)
    revalidatePath(`/projects/${task.projectId}`)

    return { task: updatedTask }
  } catch (error) {
    console.error('Error updating task status:', error)
    return { error: 'Failed to update task status' }
  }
}

export async function getTask(taskId: string) {
  try {
    const session = await getServerSession(authOptions)
    const user = session?.user as User | undefined;

    
    if (!session?.user) {
      return null
    }

    const task = await prisma.task.findFirst({
      where: {
        id: taskId,
        userId: user?.id
      }
    })

    return task
  } catch (error) {
    console.error('Error getting task:', error)
    return null
  }
}