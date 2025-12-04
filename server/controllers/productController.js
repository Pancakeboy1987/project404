const { Product } = require('../models/models'); 

const createProduct = async (req, res) => {
  try {
    // 1. Проверяем, загрузился ли файл

    if (!req.file) {
      return res.status(400).json({ message: 'Необходимо загрузить изображение' });
    }
    

    // 2. Получаем данные из тела запроса
    // В React форме оправляется: title, description, price, loc.
    const { title, price, description, location } = req.body;

    // 3. Формируем путь к картинке
    // Если файл есть, берем его имя/путь. Если нет — null или заглушку.
    // Важно: мы сохраняем относительный путь или имя файла
    const imagePath = req.file ? req.file.filename : null; 

    // 4. Создаем запись в БД через Sequelize
    const newProduct = await Product.create({
      title,
      price: Number(price), // Убедимся, что это число
      description,
      location: location || 'Не указано', // Т.к. в React форме этого поля не было
      image: imagePath,
    });

    // 5. Отправляем ответ клиенту
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

module.exports = {
  createProduct, getAllProducts
};