const Router = require('express')
const router = new Router()
const {updateUser} = require('../controllers/userEditController')


router.get('/auth  ',(req,res)=>{
    res.json({message:'all works'})
})



module.exports = router