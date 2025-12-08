import { NextFunction, Request, Response } from "express";
import { CategoryModel, CategoryDocument } from "../models/category.model";
import { ApiError } from "../utils/ApiError";

export const listCategories = async (
    _req: Request,
    res: Response,
    _next: NextFunction
): Promise<void> => {
    const categories: CategoryDocument[] = await CategoryModel.find().exec();
    res.status(200).json({
        status: "success",
        data: categories
    });
};

export const createCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { name, slug } = req.body as {
            name: string;
            slug: string;
        };
        const normalizedSlug = slug.toLowerCase().trim();
        const exists = await CategoryModel.findOne({
            slug: normalizedSlug
        }).exec();
        if (exists) {
            throw new ApiError(409, "Category slug already exists");
        }
        const newCategory = await CategoryModel.create({
            name,
            slug: normalizedSlug
        });
        res.status(201).json({
            status: "success",
            data: newCategory
        });
    } catch (error) {
        next(error);
    }
}