import express from 'express';
import {
  createMusicName,
  getAllMusicNames,
  getMusicNameById,
  updateMusicName,
  deleteMusicName
} from '../controllers/musicNameController.js';

const router = express.Router(); // ✅ You forgot this line

router.post('/', createMusicName);
router.get('/', getAllMusicNames);
router.get('/:id', getMusicNameById);
router.put('/:id', updateMusicName);
router.delete('/:id', deleteMusicName);

export default router;
