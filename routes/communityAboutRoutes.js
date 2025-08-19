// routes/communityAboutRoutes.js
import express from "express"
import {
  createCommunityAbout,
  getCommunityAbout,
  deleteCommunityAbout,
  updateCommunityAbout,
} from "../controllers/communityAboutController.js"
import multer from "multer"

const router = express.Router()
const upload = multer()
// For creating, allow up to 3 images, controller will validate exact 3
router.post("/", upload.array("images", 3), createCommunityAbout)
router.get("/", getCommunityAbout)
router.delete("/:id", deleteCommunityAbout)
// For updating, allow up to 3 images, controller will validate exact 3
router.put("/:id", upload.array("images", 3), updateCommunityAbout)

export default router
