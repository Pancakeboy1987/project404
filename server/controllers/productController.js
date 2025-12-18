const { Product, Favorite } = require('../models/models'); // Не забудьте импортировать Favorite, если он используется ниже

const createProduct = async (req, res) => {
  try {
    // Проверяем, загрузился ли файл
    if (!req.file) {
      return res.status(400).json({ message: 'Необходимо загрузить изображение' });
    }

    //  Получаем данные из тела запроса
    // Добавляем сюда userId и category, которые приходят с фронтенда
    const { title, price, description, location, category, userId,userName } = req.body;

    const imagePath = req.file ? req.file.filename : null; 


    const newProduct = await Product.create({
      title,
      price: Number(price), 
      description,
      location: location || 'Не указано', 
      category: category || 'electronics', 
      userId, 
      userName,
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
    const products = await Product.findAll(); 
    return res.json(products);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Ошибка при получении товаров" });
  }
};

const getMyProducts = async (req, res) => {
  try {
      const userId = req.user.id; 
      const products = await Product.findAll({ where: { userId } });
      return res.json(products);
  } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Ошибка" });
  }
};

const getMyFavorites = async (req, res) => {
  try {
      const userId = req.user.id;
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
  createProduct, 
  getAllProducts, 
  getMyFavorites, 
  getMyProducts, 
  toggleFavorite
};