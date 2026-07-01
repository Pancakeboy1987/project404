const Router = require('express')
const router = new Router()
//импорт роутов
const userRouter = require('./userRouter')
const productRouter = require('./productRouter')
const authRoutes = require('./auth')
const productRoutes = require('./productRouter');

router.use('/user',userRouter)
router.use('/auth', authRoutes)
router.use('/products', productRoutes);



module.exports = router