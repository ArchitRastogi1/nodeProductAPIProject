var express = require('express');
var router = express.Router();

var cartAPIs = require('../controllers/APIController');

/* routes corrosponding to apis */
router.get('/product',cartAPIs.viewProduct);
router.get('/viewAllProducts',cartAPIs.viewAllProducts);
router.patch('/product',cartAPIs.editProduct);
router.post('/product',cartAPIs.addProduct);
router.delete('/product',cartAPIs.deleteProduct);

module.exports = router;
