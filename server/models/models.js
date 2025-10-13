const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }, //здесь юник айди будет применятся для всех новых созданных объектов
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING },
  name: {type: DataTypes.STRING},
  role: { type: DataTypes.STRING, defaultValue: "USER", allowNull:true},
});

const Product = sequelize.define("Product", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, primaryKey: true },
  price: { type: DataTypes.INTEGER },
  location: { type: DataTypes.STRING },
  description: { type: DataTypes.STRING },
  image: { type: DataTypes.STRING },
});


module.exports = {User};
//ниже опишу связи но для начала у нас только два объекта
