const express = require('express');
const { createContactInfo,
  getAllContactInfo,
  getContactInfoById,
  updateContactInfo,
  deleteContactInfo,
 } = require('../controllers/contactInfoController');

const router = express.Router();

router.post('/', createContactInfo);
router.get('/', getAllContactInfo);
router.get('/:id', getContactInfoById);
router.put('/:id', updateContactInfo);
router.delete('/:id', deleteContactInfo);

module.exports = router;

