const Router = require('express')
const router = new Router()

const upload = require('../middleware/uploadMiddleware'); // Наш мультер
const productController = require('../controllers/productController');


// POST запрос на создание
// image это имя пол в FormData на фронтенде
router.post('/create', upload.single('image'), productController.createProduct);
router.get('/', productController.getAllProducts); 



module.exports = router;