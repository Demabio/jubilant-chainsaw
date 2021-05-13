import express from "express";
const router = express.Router();
import {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
  //cats
  addCats,
  getCats,
  deleteCats,
  getCatById,
  updateCat,
  //types
  addTypes,
  getTypes,
  deleteType,
  getTypeById,
  updateTypes,
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").get(getProducts).post(admin, createProduct);
router.route("/:id/reviews").post(createProductReview);
router.get("/top", getTopProducts);
router
  .route("/:id")
  .get(getProductById)
  .delete(admin, deleteProduct)
  .put(admin, updateProduct);

//cats routes
router.route("/:addCats").post(addCats);
router.route("/").get(getCats).post(addCats);
router
  .route("/:id")
  .get(getCatById)
  .delete(protect, admin, deleteCats)
  .put(protect, admin, updateCat);
//types routes
//cats routes
router.route("/:addTypes").post(addTypes);
router.route("/").get(getTypes).post(addTypes);
router
  .route("/:id")
  .get(getTypeById)
  .delete(protect, admin, deleteType)
  .put(protect, admin, updateTypes);
export default router;
