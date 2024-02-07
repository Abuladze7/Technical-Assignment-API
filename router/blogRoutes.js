const {
  getAllBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
  createBlog,
} = require("../controllers/blogController");
const { protected } = require("../controllers/authController");

const router = require("express").Router();

router.route("/").get(getAllBlogs).post(protected, createBlog);

router
  .route("/:id")
  .get(getBlog)
  .put(protected, updateBlog)
  .patch(protected, updateBlog)
  .delete(protected, deleteBlog);

module.exports = router;
