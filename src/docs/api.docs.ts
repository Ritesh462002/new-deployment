import { Request, Response } from "express";

export const apiDocs = (_req: Request, res: Response): void => {
  res.status(200).json({
    info: {
      title: "Blog API (MongoDB)",
      version: "1.0.0"
    },
    notes: {
      idFormat:
        "All ids (postId, categoryId, commentId) are MongoDB ObjectId strings."
    },
    endpoints: {
      posts: {
        list: {
          method: "GET",
          path: "/api/v1/posts",
          queryParams: [
            "page",
            "limit",
            "categoryId",
            "search",
            "sortBy",
            "sortOrder"
          ],
          example: "GET /api/v1/posts?page=1&limit=10&search=node"
        },
        getOne: {
          method: "GET",
          path: "/api/v1/posts/:id"
        },
        create: {
          method: "POST",
          path: "/api/v1/posts"
        },
        updatePut: {
          method: "PUT",
          path: "/api/v1/posts/:id"
        },
        updatePatch: {
          method: "PATCH",
          path: "/api/v1/posts/:id"
        },
        delete: {
          method: "DELETE",
          path: "/api/v1/posts/:id"
        }
      },
      comments: {
        listForPost: {
          method: "GET",
          path: "/api/v1/posts/:id/comments"
        },
        createForPost: {
          method: "POST",
          path: "/api/v1/posts/:id/comments"
        },
        delete: {
          method: "DELETE",
          path: "/api/v1/comments/:id"
        }
      },
      categories: {
        list: {
          method: "GET",
          path: "/api/v1/categories"
        },
        create: {
          method: "POST",
          path: "/api/v1/categories"
        }
      }
    }
  });
};
