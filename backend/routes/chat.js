const express = require('express');
const router  = express.Router();
const controllersChat = require('../controllers/chat')

router.post('/create_chat', controllersChat.createChat );
router.get('/', controllersChat.getChats );


module.exports = router;
