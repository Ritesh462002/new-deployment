import { Router } from "express";
import { validate } from "../middleware/validate";
import { createPost, deletePost, getPostById, listPost, updatePost, updatePostPatch } from "../controllers/post.controller";
import { createPostSchema, updatePostPatchSchema, updatePostPutSchema } from "../schemas/post.schema";

const postRouter = Router();

// GET /api/v1/posts
postRouter.get("/", listPost);

// GET /api/v1/posts/:id
postRouter.get("/:id", getPostById);

// POST /api/v1/posts
postRouter.post("/", validate(createPostSchema), createPost);

// PUT /api/v1/posts/:id
postRouter.put("/:id", validate(updatePostPutSchema), updatePost);

// PATCH /api/v1/posts/:id
postRouter.patch("/:id", validate(updatePostPatchSchema), updatePostPatch);

// DELETE /api/v1/posts/:id
postRouter.delete("/:id", deletePost);

export default postRouter ;
