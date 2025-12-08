import { Router } from "express";
import {
  listPostComments,
  addCommentToPost,
  deleteComment
} from "../controllers/comment.controller";
import { validate } from "../middleware/validate";
import { createCommentSchema } from "../schemas/comment.schema";

const commentRoutes = Router();

// GET /api/v1/posts/:id/comments
commentRoutes.get("/posts/:id/comments", listPostComments);

// POST /api/v1/posts/:id/comments
commentRoutes.post(
  "/posts/:id/comments",
  validate(createCommentSchema),
  addCommentToPost
);

// DELETE /api/v1/comments/:id
commentRoutes.delete("/comments/:id", deleteComment);

export default commentRoutes;
