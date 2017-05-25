var express = require('express');
var router = express.Router();

var auth = require('../controllers/AuthController');

/* routes corrosponding to apis */
router.post('/signup',auth.signup);
router.post('/login',auth.login);


module.exports = router;
