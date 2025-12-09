const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }, //здесь юник айди будет применятся для всех новых созданных объектов
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING },
  name: {type: DataTypes.STRING},
  description: {type: DataTypes.STRING},
  image: {type:DataTypes.STRING,allowNull: true},
  role: { type: DataTypes.STRING, defaultValue: "USER", allowNull:true},
});

const Product = sequelize.define("Product", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.INTEGER },
  location: { type: DataTypes.STRING },
  description: { type: DataTypes.STRING },
  image: { type: DataTypes.STRING },
  userId: { type: DataTypes.INTEGER }
});


const Favorite = sequelize.define('Favorite', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});


User.hasMany(Product);
Product.belongsTo(User);


User.hasMany(Favorite);
Favorite.belongsTo(User);

Product.hasMany(Favorite);
Favorite.belongsTo(Product);

User.hasMany(Product);

// Каждый товар принадлежит одному пользователю
Product.belongsTo(User)


module.exports = {
  User,     
  Product,
  Favorite

};