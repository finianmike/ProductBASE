const express = require("express");
const { registerUser, loginUser, updateUser, deletUser, getAllUser, getUserById } = require("../controller/userController.js");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/:id", updateUser);
router.delete("/:id", deletUser);
router.get("/:id", getUserById);
router.get("/", getAllUser);

module.exports = router;