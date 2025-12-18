const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING },
  name: { type: DataTypes.STRING },
  description: { type: DataTypes.STRING },
  image: { type: DataTypes.STRING, allowNull: true },
  role: { type: DataTypes.STRING, defaultValue: "USER", allowNull: true },
});

const Product = sequelize.define("Product", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.INTEGER },
  location: { type: DataTypes.STRING },
  description: { type: DataTypes.STRING },
  image: { type: DataTypes.STRING },
  userId: { type: DataTypes.INTEGER } ,
  userName: {type: DataTypes.STRING}
});

const Favorite = sequelize.define('Favorite', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});



// Связь User <-> Product
User.hasMany(Product, { onDelete: 'CASCADE' });
Product.belongsTo(User);

// Связь User <-> Favorite
User.hasMany(Favorite);
Favorite.belongsTo(User);

// Связь Product <-> Favorite
Product.hasMany(Favorite);
Favorite.belongsTo(Product);

module.exports = {
  User,     
  Product,
  Favorite
};