const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user',{
    id:{type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true},//здесь юник айди будет применятся для всех новых созданных объектов
    email:{type: DataTypes.STRING, primaryKey:true, },
    password:{type: DataTypes.STRING},
    role:{type:DataTypes.STRING,defaultValue:"USER"}
})

const Product = sequelize.define('user',{
    id:{type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    title:{type: DataTypes.STRING, primaryKey:true, },
    price:{type: DataTypes.INTEGER},
    location:{type:DataTypes.STRING},
    description:{type:DataTypes.STRING},
    image:{type:DataTypes.STRING},

})

//ниже опишу связи но для начала у нас только два объекта