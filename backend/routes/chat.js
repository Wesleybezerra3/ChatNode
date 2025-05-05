const express = require('express');
const router  = express.Router();
const controllersChat = require('../controllers/chat')

router.post('/create_chat', controllersChat.createChat );
router.get('/', controllersChat.getChats );
router.get('/my_chats', controllersChat.getMyChats );
router.get('/get_id', controllersChat.getChatId );


module.exports = router;
