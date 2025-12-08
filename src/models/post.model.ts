import { Schema, model, Document, Types } from "mongoose";
import { CommentModel } from "./comment.model";

export interface PostDocument extends Document {
    title: string;
    content: string;
    categoryId?: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const postSchema = new Schema<PostDocument>({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: false
    },
},
    {
        timestamps: {
            createdAt: "createdAt",
            updatedAt: "updatedAt"
        }
    }
)
postSchema.pre("findOneAndDelete", async function () {
    const doc = await this.model.findOne(this.getFilter()); // the post being deleted
    if (doc) {
        await CommentModel.deleteMany({ postId: doc._id });
    }
});
export const PostModel = model<PostDocument>("Post", postSchema)