const express = require('express');
const { createPageName,
  getAllPageNames,
  getPageNameById,
  updatePageName,
  deletePageName
 } = require('../controllers/pageNameController');

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

module.exports = router;

