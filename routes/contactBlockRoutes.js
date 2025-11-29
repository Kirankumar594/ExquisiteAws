const express = require('express');
const router = express.Router();
const {
  getAllContactBlocks,
  createContactBlock,
  updateContactBlock,
  deleteContactBlock
} = require('../controllers/contactBlockController');

router.get('/', getAllContactBlocks);
router.post('/', createContactBlock);
router.put('/:id', updateContactBlock);
router.delete('/:id', deleteContactBlock);

module.exports = router;

