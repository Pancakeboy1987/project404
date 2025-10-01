require('dotenv').config()
//dotenv для хранения пароля и данных для дб
const express = require('express')
//фрейм express для запросов без хттп
const sequelize = require('./db')
//либа для взаимодействия с базами данных напрямую
const models = require('./models/models')

const cors = require('cors')

const router = require('./routes/index')

const PORT = process.env.PORT

const app=express()

app.use(cors())
app.use(express.json())
app.use('/api',router)


app.get('/',(req,res)=>{
    res.status(200).json({message:'working!'})
})

const start = async ()=>{
    try{
        
        await sequelize.authenticate()//сверяется пароль и другие данные
        await sequelize.sync()//синхронятся данные с бд на сервере
        app.listen(PORT, ()=> console.log('it works'))

    }catch (e){
        console.log('error',e)//для отловли ошибок
    }
}

start()
