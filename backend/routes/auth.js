const express = require('express');
const router  = express.Router();
const controllersAuth = require('../controllers/auth')

router.post('/register', controllersAuth.register);
router.post('/login', controllersAuth.login);
router.get('/me',controllersAuth.authMiddleware,controllersAuth.me)


module.exports = router;