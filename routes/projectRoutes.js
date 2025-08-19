import express from "express"
import { createProject, getAllProjects, updateProject, deleteProject } from "../controllers/projectController.js"
import multer from "multer";
// import {upload} from "../middleware/upload.js"

const router = express.Router();
const upload=multer();

router.get("/", getAllProjects)
router.post("/", upload.array("images", 10), createProject)
router.put("/:id", upload.array("images", 10), updateProject)
router.delete("/:id", deleteProject)

export default router
