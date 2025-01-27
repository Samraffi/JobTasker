// src/app/actions/projects.ts
'use server'

import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { authOptions } from "@/lib/auth"
import { type ActionResponse, projectSchema, type ProjectFormData } from '@/lib/validations'

export async function createProject(data: ProjectFormData): Promise<ActionResponse> {
  const session = await getServerSession(authOptions)
  
  if (!session?.user) {
    return {
      success: false,
      message: 'Not authenticated'
    }
  }

  try {
    const validatedData = projectSchema.parse(data)

    await prisma.project.create({
      data: {
        title: validatedData.title,
        description: validatedData.description || '',
        userId: session.user.id,
      },
    })

    revalidatePath('/projects')
    return { 
      success: true,
      message: null
    }
  } catch (error) {
    console.error('Project creation error:', error)
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to create project'
    }
  }
}

// export async function deleteProject(formData: FormData) {
//   const session = await getServerSession(authOptions)
  
//   if (!session?.user) {
//     redirect('/auth/signin')
//   }

//   const id = formData.get('id') as string

//   const project = await prisma.project.findUnique({
//     where: { id },
//     select: { userId: true }
//   })

//   if (project?.userId !== session.user.id) {
//     throw new Error('Unauthorized')
//   }

//   await prisma.project.delete({
//     where: { id },
//   })

//   revalidatePath('/projects')
// }

// src/app/actions/projects.ts
interface DeleteProjectResponse {
  success: boolean
  message?: string
}

export async function deleteProject(id: string): Promise<DeleteProjectResponse> {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      redirect('/auth/signin')
    }

    const project = await prisma.project.findUnique({
      where: { id },
      select: { userId: true }
    })

    if (!project) {
      return { success: false, message: 'Project not found' }
    }

    if (project.userId !== session.user.id) {
      return { success: false, message: 'Unauthorized' }
    }

    await prisma.project.delete({
      where: { id },
    })

    revalidatePath('/projects')
    
    return { success: true }
  } catch (error) {
    console.error('Delete project error:', error)
    return { success: false, message: 'Failed to delete project' }
  }
}

// Функция получения списка проектов
export async function getProjects() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return []
    }

    const projects = await prisma.project.findMany({
      where: {
        userId: session.user.id
      },
      include: {
        tasks: {
          select: {
            id: true,
            status: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return projects
  } catch (error) {
    console.error('Error fetching projects:', error)
    return []
  }
}

// Функция получения одного проекта по ID
export async function getProject(id: string) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return null
    }

    const project = await prisma.project.findFirst({
      where: {
        id: id,
        userId: session.user.id
      },
      include: {
        tasks: {
          orderBy: {
            createdAt: 'desc'
          }
        }
      }
    })

    return project
  } catch (error) {
    console.error('Error getting project:', error)
    return null
  }
}