import express from "express"
const router = express.Router();
import {
  getAllContactBlocks,
  createContactBlock,
  updateContactBlock,
  deleteContactBlock
} from'../controllers/contactBlockController.js';

router.get('/', getAllContactBlocks);
router.post('/', createContactBlock);
router.put('/:id', updateContactBlock);
router.delete('/:id', deleteContactBlock);

export default router;
