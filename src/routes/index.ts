import { Router } from "express";
import { apiDocs } from "../docs/api.docs";
import postRouter from "./post.route";
import commentRoutes from "./comment.route";
import categoryRoutes from "./category.route";

const router = Router();

router.get("/docs", apiDocs);

router.use("/posts", postRouter);     
router.use("/", commentRoutes);
router.use("/", categoryRoutes);

router.use("/",(_req,res)=>{
res.status(200).json({status:"Check it up"})
})

export default router;
