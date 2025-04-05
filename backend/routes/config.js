const express = require('express');
const router  = express.Router();
const controllersConfig = require('../controllers/config')

router.get('/ping',controllersConfig.ping );

module.exports = router;