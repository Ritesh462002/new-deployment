import { model, Schema, Document } from "mongoose";

export interface CategoryDocument extends Document {
    name: string;
    slug: string;
}
const categorySchema = new Schema<CategoryDocument>(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        }
    },
    {
        timestamps: false
    }
);
export const CategoryModel = model<CategoryDocument>("Category", categorySchema)