import z from "zod";

export const courseLevels = ["Beginner", "Intermidate", "Advanced"] as const;
export const courseStatus = ["Draft", "Published", "Archive"] as const;

export const courseCategories = [
  "Development",
  "Business",
  "Finance",
  "It & Software",
  "Office Productivity",
  "Personal Development",
  "Design",
  "Marketing",
  "Health & Fitness",
  "Music",
  "Teaching & Academics",
] as const;

export const courseSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long" })
    .max(100, { message: "Title must be at most 100 characters long" }),

  description: z
    .string()
    .min(3, { message: "Description must be at least 3 characters long" }),

  fileKey: z.string().min(1, { message: "File is required" }),

  price: z.number().min(1, { message: "Price must be positive number" }),

  duration: z
    .number()
    .min(1, { message: "Duration must be at least 1 hour" })
    .max(500, { message: "Duration must be at most 500 hours" }),

  level: z.enum(courseLevels, { message: "level is required" }),

  category: z.enum(courseCategories, { message: "Category is required" }),

  smallDescription: z
    .string()
    .min(3, { message: "small Description must be at least 3 characters long" })
    .max(200, {
      message: "small Description must be at most 200 characters long",
    }),

  slug: z.string().min(3, {
    message: "slug Description must be at least 3 characters long",
  }),

  status: z.enum(courseStatus, {
    message: "status is required",
  }),
});

export type courseSchemaType = z.infer<typeof courseSchema>;
