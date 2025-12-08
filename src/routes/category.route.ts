import { Router } from "express";
import {
  listCategories,
  createCategory
} from "../controllers/category.controller";
import { validate } from "../middleware/validate";
import { createCategorySchema } from "../schemas/category.schema";

const categoryRoutes = Router();

// GET /api/v1/categories
categoryRoutes.get("/categories", listCategories);

// POST /api/v1/categories
categoryRoutes.post("/categories", validate(createCategorySchema), createCategory);

export default categoryRoutes;
