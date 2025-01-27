import { getAuthSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { createProjectSchema } from '@/lib/validations/project'
import { User } from '@/types/user'
// import useRedirect from '@/components/hooks/useRedirect';
// import { useProjects } from '@/components/hooks/useProjects';


export async function getProject(projectId: string) {
  const session = await getAuthSession();
  const user = session?.user as User | undefined;


  if (!session?.user) {
    throw new Error('Unauthorized');
  }

  const foundProject = await prisma.project.findUnique({
    where: { id: projectId },
    include: { tasks: { orderBy: { createdAt: 'desc' } } },
  });

  if (!foundProject) {
    throw new Error('Project not found');
  }

  if (foundProject.userId !== user?.id) {
    throw new Error('Unauthorized');
  }

  return foundProject;
}

export async function getProjects() {
  const session = await getAuthSession();
  const user = session?.user as User | undefined;

  if (!session || !user) {
    // throw new Error('Unauthorized');
    // useRedirect('/auth/signin');
    return [];
  }

  return prisma.project.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' },
  });
}

export async function createProject(projectData: FormData) {
  const session = await getAuthSession();
  const user = session?.user as User | undefined;

  if (!user) {
    throw new Error('Unauthorized');
  }

  const { title, description = '' } = createProjectSchema.parse({
    title: projectData.get('title'),
    description: projectData.get('description'),
  });

  return prisma.project.create({
    data: {
      title,
      description,
      userId: user.id,
    },
  });
}

export async function updateProject(
  projectId: string,
  formData: FormData
) {
  const session = await getAuthSession();
  const user = session?.user as User | undefined;

  if (!session?.user) {
    throw new Error('Unauthorized');
  }

  const { title, description = '' } = createProjectSchema.parse({
    title: formData.get('title'),
    description: formData.get('description'),
  });

  const existingProject = await prisma.project.findUnique({
    where: { id: projectId },
  });

  if (!existingProject) {
    throw new Error('Project not found');
  }

  if (existingProject.userId !== user?.id) {
    throw new Error('Unauthorized');
  }

  return prisma.project.update({
    where: { id: projectId },
    data: { title, description },
  });
}

export async function deleteProject(projectId: string) {
  const session = await getAuthSession();
  const user = session?.user as User | undefined;

  const existingProject = await prisma.project.findUnique({
    where: { id: projectId },
  });

  if (!existingProject) {
    throw new Error('Project not found');
  }

  if (existingProject.userId !== user?.id) {
    throw new Error('Unauthorized');
  }

  return prisma.project.delete({
    where: { id: projectId },
  });
}
