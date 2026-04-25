import express from "express";
import { createBlog, deleteBlog, getAllBlogs, getMyBlogs, getSingleBlog, updateBlog } from "../controllers/blog.controller.js";
import { isAdmin, isAuthenticated } from "../middleware/authUser.js";

const router = express.Router();

router.post("/create",isAuthenticated,isAdmin("admin"),createBlog)
router.delete("/delete/:id", isAuthenticated, isAdmin("admin"), deleteBlog);
router.get("/allBlogs",getAllBlogs);
router.get("/singleBlog/:id", isAuthenticated, getSingleBlog);
router.get("/myBlogs", isAuthenticated,isAdmin("admin"), getMyBlogs  );
router.put("/update/:id", isAuthenticated, isAdmin("admin"), updateBlog);

export default router;
