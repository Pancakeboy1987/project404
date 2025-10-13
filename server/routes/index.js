const Router = require('express')
const router = new Router()
//импорт роутов
const userRouter = require('./userRouter')
const productRouter = require('./productRouter')
const authRoutes = require('./auth')

router.use('/user',userRouter)
router.use('/auth', authRoutes)
//router.use('/product')


module.exports = router