import express from "express";
import { getAllAdmins, getMyProfile, getSingleUser, login, logout, register } from "../controllers/user.controller.js";
import { isAuthenticated } from "../middleware/authUser.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout",isAuthenticated, logout);
router.get("/myProfile", isAuthenticated, getMyProfile);
router.get("/admins",getAllAdmins);
router.get("/:id", getSingleUser);

export default router;
