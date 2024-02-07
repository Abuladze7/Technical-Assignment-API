const Category = require("../models/Category");
const router = require("express").Router();
const {
  getAllCategory,
  getCategory,
  updateCategory,
  deleteCategory,
  createCategory,
} = require("../controllers/categoryController");
const { protected } = require("../controllers/authController");

router.route("/").get(getAllCategory).post(protected, createCategory);

router
  .route("/:id")
  .get(getCategory)
  .put(protected, updateCategory)
  .patch(protected, updateCategory)
  .delete(protected, deleteCategory);

module.exports = router;
