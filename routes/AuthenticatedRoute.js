var express = require('express');
var router = express.Router();

var cartAPIs = require('../controllers/APIController');

/* routes corrosponding to apis */
router.get('/viewProduct',cartAPIs.viewProduct);
router.get('/viewAllProducts',cartAPIs.viewAllProducts);
router.patch('/editProduct',cartAPIs.editProduct);
router.post('/addProduct',cartAPIs.addProduct);
router.delete('/deleteProduct',cartAPIs.deleteProduct);

module.exports = router;
