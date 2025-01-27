import * as z from "zod";

// Схема для создания проекта
export const createProjectSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be less than 100 characters"),
  description: z
    .string()
    .max(500, "Description must be less than 500 characters")
    .optional()
    .nullable(),
  userId: z.string().nullable(),
});

// Схема для обновления проекта
export const updateProjectSchema = createProjectSchema.partial();

// Тип для данных проекта
export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;
