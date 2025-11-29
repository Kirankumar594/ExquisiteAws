const express = require('express');
const { createProject, getAllProjects, updateProject, deleteProject  } = require('../controllers/projectController');
const multer = require('multer');
// const { upload } = require('../middleware/upload');

const router = express.Router();
const upload=multer();

router.get("/", getAllProjects)
router.post("/", upload.array("images", 10), createProject)
router.put("/:id", upload.array("images", 10), updateProject)
router.delete("/:id", deleteProject)

module.exports = router

