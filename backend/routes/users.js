const express = require('express');
const router  = express.Router();
const controllersUser = require('../controllers/users')

router.get('/getNameById', controllersUser.getNameById);

module.exports = router;