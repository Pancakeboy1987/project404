const { Product } = require('../models/models'); 

const createProduct = async (req, res) => {
  try {
    // Проверяем, загрузился ли файл

    if (!req.file) {
      return res.status(400).json({ message: 'Необходимо загрузить изображение' });
    }
    

    // Получаем данные из тела запроса
    // В React форме оправляется: title, description, price, loc.
    const { title, price, description, location } = req.body;

  
    const imagePath = req.file ? req.file.filename : null; 


    const newProduct = await Product.create({
      title,
      price: Number(price), 
      description,
      location: location || 'Не указано', 
      image: imagePath,
    });

    // Отправляем ответ клиенту
    return res.status(201).json({
      message: 'Объявление успешно создано',
      product: newProduct,
    });

  } catch (error) {
    console.error('Ошибка при создании объявления:', error);
    return res.status(500).json({
      message: 'Не удалось создать объявление',
      error: error.message,
    });
  }
};


const getAllProducts = async (req, res) => {
  try {
    // Получаем все товары из базы
    const products = await Product.findAll(); 
    return res.json(products);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Ошибка при получении товаров" });
  }
};

const getMyProducts = async (req, res) => {
  try {
      const userId = req.user.id; // Из authMiddleware
      const products = await Product.findAll({ where: { userId } });
      return res.json(products);
  } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Ошибка" });
  }
};

// Получиение избраннх товаров пользователя
const getMyFavorites = async (req, res) => {
  try {
      const userId = req.user.id;
      // Ищем записи в таблице Favorite и подтягиваем связанные Products
      const favorites = await Favorite.findAll({
          where: { userId },
          include: [{ model: Product }] 
      });
      
      
      const products = favorites.map(fav => fav.Product);
      return res.json(products);
  } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Ошибка" });
  }
};


const toggleFavorite = async (req, res) => {
  try {
      const userId = req.user.id;
      const { productId } = req.body;

      const existingFav = await Favorite.findOne({ where: { userId, productId } });

      if (existingFav) {
          await existingFav.destroy();
          return res.json({ message: "Удалено из избранного", isFavorite: false });
      } else {
          await Favorite.create({ userId, productId });
          return res.json({ message: "Добавлено в избранное", isFavorite: true });
      }
  } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Ошибка" });
  }
};




module.exports = {
  createProduct, getAllProducts,getMyFavorites, getMyProducts,toggleFavorite
};