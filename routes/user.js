const express = require("express");
const {
  getUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../controller/user.js");
const userRouter = express.Router();

userRouter.get("/", getUser);
userRouter.get("/:id", getUserById);
userRouter.post("/", createUser);
userRouter.put("/:id", updateUser);
userRouter.get("/:id", deleteUser);

module.exports = {
  userRouter,
};
