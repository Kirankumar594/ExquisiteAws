import express from 'express';
import {
  createPageName,
  getAllPageNames,
  getPageNameById,
  updatePageName,
  deletePageName
} from '../controllers/pageNameController.js';

const router = express.Router();

// POST - Create
router.post('/', createPageName);

// GET - All
router.get('/', getAllPageNames);

// GET - By ID
router.get('/:id', getPageNameById);

// PUT - Update
router.put('/:id', updatePageName);

// DELETE - Delete
router.delete('/:id', deletePageName);

export default router;
