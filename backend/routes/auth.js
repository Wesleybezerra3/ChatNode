const express = require('express');
const router  = express.Router();
const controllersUser = require('../controllers/auth')

router.post('/register', controllersUser.register);
router.post('/login', controllersUser.login);
router.get('/me',controllersUser.authMiddleware,controllersUser.me)


module.exports = router;