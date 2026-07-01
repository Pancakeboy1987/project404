const Router = require('express')
const router = new Router()

const upload = require('../middleware/uploadMiddleware'); // мультер
const productController = require('../controllers/productController');



router.post('/create', upload.single('image'), productController.createProduct);
router.get('/', productController.getAllProducts); 



module.exports = router;