import { NextFunction, Request, Response } from "express";
import { isValidObjectId } from "mongoose";
import { ApiError } from "../utils/ApiError";
import { PostDocument, PostModel } from "../models/post.model";
import { getPagination } from "../utils/pagination";
import { CategoryModel } from "../models/category.model";
import { CommentModel } from "../models/comment.model";

type PostListQuery = {
    categoryId?: string;
    search?: string;
    sortBy?: "createdAt" | "title";
    sortOrder?: "asc" | "desc";
    page?: string;
    limit?: string;
}

export const listPost = async (req: Request<unknown, unknown, unknown, PostListQuery>,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const {
            categoryId,
            search,
            sortBy = "createdAt",
            sortOrder = "desc"
        } = req.query;

        const filter: Record<string, unknown> = {}
        if (categoryId) {
            if (!isValidObjectId(categoryId)) {
                throw new ApiError(400, "Invalid categoryId");
            }
            filter.categoryId = categoryId;
        }

        if (search) {
            const regex = new RegExp(search, "i");
            filter.$or = [{ title: regex }, { content: regex }];
        }
        const totalItems = await PostModel.countDocuments(filter).exec();
        const { skip, ...meta } = getPagination(req.query as any, totalItems);
        const sort: Record<string, 1 | -1> = {};
        sort[sortBy] = sortOrder === "asc" ? 1 : -1;
        const posts: PostDocument[] = await PostModel.find(filter)
            .sort(sort)
            .skip(skip)
            .limit(meta.limit)
            .exec();

        res.status(200).json({
            status: "success",
            data: posts,
            meta
        });
    } catch (error) {
        next(error);
    }
}

export const getPostById = async (req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params
        if (!isValidObjectId(id)) {
            throw new ApiError(400, "Invalid post id");
        }

        const post = await PostModel.findById(id).exec()

        if (!post) {
            throw new ApiError(404, "Post not found");
        }
        res.status(200).json({
            status: "success",
            data: post
        });
    } catch (error) {
        next(error);
    }

}

export const createPost = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { title, content, categoryId } = req.body as {
            title: string;
            content: string;
            categoryId?: string;
        }

        if (categoryId) {
            if (!isValidObjectId(categoryId)) {
                throw new ApiError(400, "Invalid categoryId");
            }
            const exists = await CategoryModel.exists({ _id: categoryId }).exec();
            if (!exists) {
                throw new ApiError(400, "Invalid categoryId");
            }
        }

        const newPost = await PostModel.create({
            title,
            content,
            categoryId: categoryId ?? undefined
        });
        res.status(201).json({
            status: "success",
            data: newPost
        });
    } catch (error) {
        next(error);
    }
}

export const updatePost = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;
        const { title, content, categoryId } = req.body as {
            title: string;
            content: string;
            categoryId?: string;
        };

        if (!isValidObjectId(id)) {
            throw new ApiError(400, "Invalid Post Id ")
        }

        if (categoryId) {
            if (!isValidObjectId(categoryId)) {
                throw new ApiError(400, "Invalid categoryId");
            }
            const exists = await CategoryModel.exists({ _id: categoryId }).exec();
            if (!exists) {
                throw new ApiError(400, "Invalid categoryId");
            }
        }

        const updatedPost = await PostModel.findByIdAndUpdate(id, {
            title,
            content,
            categoryId: categoryId ?? undefined
        },
            { new: true, runValidators: true })

        if (!updatedPost) {
            throw new ApiError(404, "Post not found");
        }
        res.status(200).json({
            status: "success",
            data: updatedPost
        });
    } catch (error) {

    }
}

export const updatePostPatch = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;
        const { title, content, categoryId } = req.body as {
            title?: string;
            content?: string;
            categoryId?: string;
        };
        if (!isValidObjectId(id)) {
            throw new ApiError(400, "Invalid post id");
        }
        const updateData: Partial<{
            title: string;
            content: string;
            categoryId: string;
        }> = {};
        if (title !== undefined) updateData.title = title;
        if (content !== undefined) updateData.content = content;
        if (categoryId !== undefined) {
            if (!isValidObjectId(categoryId)) {
                throw new ApiError(400, "Invalid categoryId");
            }
            const exists = await CategoryModel.exists({ _id: categoryId }).exec();
            if (!exists) {
                throw new ApiError(400, "Invalid categoryId");
            }
            updateData.categoryId = categoryId;
        }
        const updatedPost = await PostModel.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true
        }).exec();
        if (!updatedPost) {
            throw new ApiError(404, "Post not found");
        }
        res.status(200).json({
            status: "success",
            data: updatedPost
        });
    } catch (error) {
        next(error);
    }
};

export const deletePost = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      throw new ApiError(400, "Invalid post id");
    }
    const deletedPost = await PostModel.findByIdAndDelete(id).exec();
    if (!deletedPost) {
      throw new ApiError(404, "Post not found");
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};