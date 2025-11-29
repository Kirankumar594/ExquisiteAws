const express = require('express');
const { createClient, getClients, updateClient, deleteClient  } = require('../controllers/clientController');

const router = express.Router()

router.get("/", getClients)
router.post("/", createClient)
router.put("/:id", updateClient)
router.delete("/:id", deleteClient)

module.exports = router

