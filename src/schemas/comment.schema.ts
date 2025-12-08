import z from "zod";

export const createCommentSchema = z.object({
  params: z.object({
    id: z.string()
  }),
  body: z.object({
    author: z.string().min(1, "Author is required"),
    content: z.string().min(3, "Content must be at least 3 characters")
  })
});