const { signIn, signUp } = require("../controllers/authController");

const router = require("express").Router();

router.post("/signup", signUp);
router.post("/login", signIn);

module.exports = router;
