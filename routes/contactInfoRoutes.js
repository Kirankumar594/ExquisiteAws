import express from 'express';
import {
  createContactInfo,
  getAllContactInfo,
  getContactInfoById,
  updateContactInfo,
  deleteContactInfo,
} from '../controllers/contactInfoController.js';

const router = express.Router();

router.post('/', createContactInfo);
router.get('/', getAllContactInfo);
router.get('/:id', getContactInfoById);
router.put('/:id', updateContactInfo);
router.delete('/:id', deleteContactInfo);

export default router;
