import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { User } from "@/types/user";

export function useProjects() {
  const router = useRouter(); // Move useRouter to the top level

  const [projects, setProjects] = useState<
    {
      id: string;
      userId: string;
      title: string;
      description: string | null;
      createdAt: Date;
      updatedAt: Date;
    }[]
  >([]);

  useEffect(() => {
    async function fetchProjects() {
      const session = await getAuthSession();
      const user = session?.user as User | undefined;

      if (!session || !user) {
        router.push("/auth/signin");
      }

      // setProjects(projects);
      setProjects(await prisma.project.findMany({
        where: {
          userId: user!.id,
        },
        orderBy: {
          createdAt: "desc",
        },
      }));
    }

    fetchProjects();
  }, [projects, router]);

  return projects;
}
