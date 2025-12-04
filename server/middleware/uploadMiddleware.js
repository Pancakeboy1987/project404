const multer = require('multer');
const path = require('path');

// Настройка хранилища
const storage = multer.diskStorage({
  destination(req, file, cb) {
    // Папка, куда будут сохраняться картинки
    // Убедись, что папка 'uploads' существует в корне проекта
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    // Генерируем уникальное имя файла: дата + оригинальное расширение
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// Фильтр для проверки типов файлов (только картинки)
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
    cb(null, true);
  } else {
    cb(new Error('Неверный формат файла. Только png, jpeg, jpg!'), false);
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 } // Лимит 5MB
});

module.exports = upload;