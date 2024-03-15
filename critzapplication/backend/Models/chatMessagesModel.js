const mongoose = require('mongoose');

const chatMessageSchema = new mongoose.Schema({
    message_id: { 
        type: Number, 
        required: true, 
        unique: true 
    },
    user_id: { 
        type: Number, 
        required: true 
    },
    message_text: { 
        type: String 
    },
    message_type: { 
        type: String, 
        required: true 
    },
    message_content: { 
        type: String 
    },
    timestamp: { 
        type: Date, 
        default: Date.now 
    }
});

const ChatMessage = mongoose.model('ChatMessage', chatMessageSchema);

module.exports = ChatMessage;