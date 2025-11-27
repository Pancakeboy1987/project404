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
//увеличиваем лимит загрузки
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
// Статическая папка для раздачи загруженных фото (чтобы фронт мог их видеть)
const path = require('path');

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.get('/',(req,res)=>{
    res.status(200).json({message:'working!'})
})





const start = async ()=>{
    try{
        
        await sequelize.authenticate()//сверяется пароль и другие данные
        await sequelize.sync({ alter: true })//синхронятся данные с бд на сервере
        app.listen(PORT, ()=> console.log('it works'))

    }catch (e){
        console.log('error',e)//для отловли ошибок
    }
}

start()
