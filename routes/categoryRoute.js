import express from "express";
import { requireSignIn, isAdmin } from "./../middlewares/authMiddleware.js";
import {
  categoryController,
  createCategoryController,
  deleteCategoryController,
  singleCategoryController,
  updateCategoryController,
} from "../controllers/categoryController.js";
const router = express.Router();

//create categoory route
router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  createCategoryController
);

//update categoory route
router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);

//get categoory route
router.get("/get-category", categoryController);

//get categoory route
router.get("/single-category/:slug", singleCategoryController);

//delete categoory route
router.delete("/delete-category/:id", deleteCategoryController);

export default router;
