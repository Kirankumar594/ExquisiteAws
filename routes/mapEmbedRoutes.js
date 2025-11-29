const express = require('express');
const { updateMapEmbed, getMapEmbed  } = require('../controllers/mapEmbedController');

const router = express.Router();

router.get("/", getMapEmbed);
router.post("/", updateMapEmbed); // or use PUT

module.exports = router;

