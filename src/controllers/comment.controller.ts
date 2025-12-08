import { Request, Response, NextFunction } from "express";
import { CommentModel, CommentDocument } from "../models/comment.model";
import { PostModel } from "../models/post.model";
import { ApiError } from "../utils/ApiError";
import { isValidObjectId } from "mongoose";

export const listPostComments = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;
        if (!isValidObjectId(id)) {
            throw new ApiError(400, "Invalid post id");
        }
        const postExists = await PostModel.exists({ _id: id }).exec();
        if (!postExists) {
            throw new ApiError(404, "Post not found");
        }
        const comments: CommentDocument[] = await CommentModel.find({
            postId: id
        })
            .sort({ createdAt: 1 })
            .exec();
        res.status(200).json({
            status: "success",
            data: comments
        });
    } catch (error) {
        next(error);
    }
};
export const addCommentToPost = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;
        if (!isValidObjectId(id)) {
            throw new ApiError(400, "Invalid post id");
        }
        const postExists = await PostModel.exists({ _id: id }).exec();
        if (!postExists) {
            throw new ApiError(404, "Post not found");
        }
        const { author, content } = req.body as {
            author: string;
            content: string;
        };
        const newComment = await CommentModel.create({
            postId: id,
            author,
            content
        });
        res.status(201).json({
            status: "success",
            data: newComment
        });
    } catch (error) {
        next(error);
    }
};
export const deleteComment = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;
        if (!isValidObjectId(id)) {
            throw new ApiError(400, "Invalid comment id");
        }
        const deleted = await CommentModel.findByIdAndDelete(id).exec();
        if (!deleted) {
            throw new ApiError(404, "Comment not found");
        }
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};