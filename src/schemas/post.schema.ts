import { z } from "zod";
export const createPostSchema = z.object({
  body: z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    content: z.string().min(10, "Content must be at least 10 characters"),
    categoryId: z.string().optional()
  })
});
export const updatePostPutSchema = z.object({
  params: z.object({
    id: z.string()
  }),
  body: z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    content: z.string().min(10, "Content must be at least 10 characters"),
    categoryId: z.string().optional()
  })
});


export const updatePostPatchSchema = z.object({
  params: z.object({
    id: z.string()
  }),
  body: z
    .object({
      title: z.string().min(3, "Title must be at least 3 characters").optional(),
      content: z
        .string()
        .min(10, "Content must be at least 10 characters")
        .optional(),
      categoryId: z.string().optional()
    })
    .refine((data) => Object.keys(data).length > 0, {
      message: "At least one field must be provided"
    })
});