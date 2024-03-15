const express = require('express');
const router = express.Router();
const chatMessageController = require('../Controllers/chatMessageController');

// Route for getting all chat messages
router.get('/chatMessages', chatMessageController.getAllChatMessages);

// Route for creating a new chat message
router.post('/chatMessages', chatMessageController.createChatMessage);

module.exports = router;
