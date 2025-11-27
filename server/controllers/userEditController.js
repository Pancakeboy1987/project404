const { User } = require('../models/models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const fs = require('fs'); // Для создания папки, если нужно

// Настройка multer: храним файлы в 'uploads/' с уникальным именем
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Уникальное имя
  }
});

// Фильтр: только изображения
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Файл не является изображением'), false);
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB лимит
  fileFilter: fileFilter
}).single('image'); // Ожидаем поле 'image' из FormData

const updateUser = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: err.message || 'Ошибка загрузки файла' });
    }

    try {
      const { nickBlock, descriptionBlock, id } = req.body;
      const user = await User.findOne({ where: { id } });

      if (!user) {
        console.log('Входящие данные для входа:', req.body);
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const updates = {};

      if (nickBlock) {
        updates.name = nickBlock;
      }

      if (descriptionBlock) {
        updates.description = descriptionBlock;
      }

      if (req.file) {
        updates.image = `uploads/${req.file.filename}`; // Путь к файлу (относительный URL)
      }

      if (Object.keys(updates).length === 0) {
        return res.status(400).json({ error: 'Нет данных для обновления' });
      }

      await user.update(updates);

      await user.reload();
    res.status(200).json({ message: 'Профиль обновлён', user });

    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Ошибка обновления профиля' });
    }
  });
};

module.exports = { updateUser };