const Router = require("express").Router;
const router = new Router();

const authMiddleware = require("../middleware/auth-middleware");
const userController = require("../controllers/user-controller");

const upload = require("../service/upload");

const { body } = require("express-validator");

router.post(
  "/register",
  upload.single("profileImage"),
  body("email").isEmail(),
  body("password").isLength({ min: 3, max: 32 }),
  userController.register
);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/activate/:link", userController.activate);
router.get("/refresh", userController.refresh);

module.exports = router;
