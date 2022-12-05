const { Router } = require("express");

const router = Router();

const checkToken = require("../middleware/checktoken.js");

const userControllers = require("../controllers/users-controller.js");

router.post("/register", userControllers.createUser);
router.post("/login", userControllers.loginUser);
router.get("/:id", checkToken, userControllers.getUser);

module.exports = router;
