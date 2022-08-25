import express from "express";
const router = express.Router();
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from "../controllers/userController.js";
import { auth, admin } from "../middleware/authMiddleware.js";

router.route("/").post(registerUser).get(auth, admin, getUsers);
router.post("/login", authUser);
router.route("/profile").get(auth, getUserProfile).put(auth, updateUserProfile);
router
  .route("/:id")
  .delete(auth, admin, deleteUser)
  .get(auth, admin, getUserById)
  .put(auth, admin, updateUser);

export default router;
