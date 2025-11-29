const express = require('express');
const { createMusicName,
  getAllMusicNames,
  getMusicNameById,
  updateMusicName,
  deleteMusicName
 } = require('../controllers/musicNameController');

const router = express.Router(); // ✅ You forgot this line

router.post('/', createMusicName);
router.get('/', getAllMusicNames);
router.get('/:id', getMusicNameById);
router.put('/:id', updateMusicName);
router.delete('/:id', deleteMusicName);

module.exports = router;

