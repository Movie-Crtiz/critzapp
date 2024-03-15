const ChatMessage = require('../Models/chatMessagesModel');

// Get all chat messages
const getAllChatMessages = async (req, res) => {
    try {
        const chatMessages = await ChatMessage.find();
        res.status(200).json(chatMessages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new chat message
const createChatMessage = async (req, res) => {
    const chatMessage = new ChatMessage({
        message_id: req.body.message_id,
        user_id: req.body.user_id,
        message_text: req.body.message_text,
        message_type: req.body.message_type,
        message_content: req.body.message_content,
        timestamp: req.body.timestamp
    });

    try {
        const newChatMessage = await chatMessage.save();
        res.status(201).json(newChatMessage);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getAllChatMessages,
    createChatMessage
};
