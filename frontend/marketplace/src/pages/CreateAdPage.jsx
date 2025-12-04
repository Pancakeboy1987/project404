import React, { useState,useContext, useEffect } from 'react';
import '../components/CreateAddPageComponents/createAdPage.css'; // Убедись, что путь к CSS верный
import { ThemeContext } from '../components/providers/ThemeContext';
import { AuthContext } from '../components/providers/AuthContext';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';


export default function CreateAdPage(){
  // Состояние темы (light или dark)
  const { theme, setTheme } = useContext(ThemeContext);
  const { authorised, setAuthorised, userAuth, setUserAuth, logout, login } = useContext(AuthContext);

  // Состояние формы
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: 'electronics',
    image: null,
  });

  // Состояние для превью картинки
  const [preview, setPreview] = useState(null);

  // Обработчик переключения темы
  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Обработчик изменений в текстовых полях
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Обработчик загрузки файла
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  // Обработчик отправки формы
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // 1. Создаем объект FormData (он нужен для отправки файлов)
      const dataToSend = new FormData();
      
      // 2. Добавляем текстовые поля из стейта
      dataToSend.append('title', formData.title);
      dataToSend.append('price', formData.price);
      dataToSend.append('description', formData.description);
      dataToSend.append('category', formData.category); // Если на бэке нужно это поле
      // Если в модели есть поле location, добавь его, иначе будет ошибка валидации (если оно обязательное)
      // dataToSend.append('location', 'Москва'); 
  
      // 3. Добавляем файл (важно: имя 'image' должно совпадать с upload.single('image') на сервере)
      if (formData.image) {
        dataToSend.append('image', formData.image);
      }
  
      // 4. Отправляем запрос
      const response = await fetch('http://localhost:7000/api/products/create', {
        method: 'POST',
        // ВАЖНО: НЕ добавляй headers: { 'Content-Type': 'multipart/form-data' }
        // Браузер сам добавит этот заголовок с правильным boundary
        body: dataToSend, 
      });
  
      const result = await response.json();
  
      if (!response.ok) {
        // Если сервер вернул 400 или 500, выводим сообщение от сервера
        console.error('Ошибка сервера:', result);
        alert(`Ошибка: ${result.message || 'Не удалось создать объявление'}`);
        return;
      }
  
      console.log('Успех:', result);
      alert('Объявление успешно создано!');
      
      // Очистка формы (по желанию)
      /* 
      setFormData({ title: '', description: '', price: '', category: 'electronics', image: null });
      setPreview(null);
      */
  
    } catch (error) {
      console.error('Ошибка сети:', error);
      alert('Произошла ошибка при отправке запроса');
    }
  };

  // Вспомогательные классы в зависимости от темы
  const pageClass = theme === 'light' ? 'page-light' : 'page-dark';
  const wrapperClass = theme === 'light' ? 'wrapper-light' : 'wrapper-dark';
  const btnClass = theme === 'light' ? 'btn-light' : 'btn-dark';
  const inputClass = theme === 'light' ? 'input-light' : 'input-dark';
  const userBlockClass = theme === 'light' ? 'user-block-light' : 'user-block-dark';
  const usernameClass = theme === 'light' ? 'username-light' : 'username-dark';

  return (
    <div className={`site-${theme}`}>
    <Header />

    <div className="search-bar">
      <SearchBar />
      <div className="search-actions">
        <button className={`btn-${theme}`}>Поиск</button>
        <button className={`btn-${theme}`}>Разместить объявление</button>
      </div>
    </div>



      {/* --- ФОРМА СОЗДАНИЯ ОБЪЯВЛЕНИЯ --- */}
      <div className={`create-ad-wrapper ${wrapperClass}`}>
        <h2 className="main-title" style={{ marginBottom: '20px' }}>Новое объявление</h2>
        
        <form onSubmit={handleSubmit}>
          {/* Название */}
          <div className="form-group">
            <label className="form-label">Название товара</label>
            <input
              type="text"
              name="title"
              className={`form-input ${inputClass}`}
              placeholder="Например, iPhone 12 Pro"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          {/* Категория */}
          <div className="form-group">
            <label className="form-label">Категория</label>
            <select
              name="category"
              className={`form-input ${inputClass}`}
              value={formData.category}
              onChange={handleChange}
            >
              <option value="electronics">Электроника</option>
              <option value="clothing">Одежда</option>
              <option value="auto">Автомобили</option>
              <option value="services">Услуги</option>
            </select>
          </div>

          {/* Описание */}
          <div className="form-group">
            <label className="form-label">Описание</label>
            <textarea
              name="description"
              className={`form-input ${inputClass}`}
              placeholder="Расскажите подробнее о товаре..."
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          {/* Цена */}
          <div className="form-group">
            <label className="form-label">Цена (₽)</label>
            <input
              type="number"
              name="price"
              className={`form-input ${inputClass}`}
              placeholder="0"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>

          {/* Загрузка фото */}
          <div className="form-group">
            <label className="form-label">Фотографии</label>
            <div className={`image-upload-box ${theme === 'light' ? 'input-light' : 'input-dark'}`}>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ position: 'absolute', opacity: 0, width: '100%', height: '100%', cursor: 'pointer' }}
              />
              {!preview ? (
                <div style={{ color: 'rgb(0, 179, 255)' }}>
                  <span>+ Загрузить фото</span>
                </div>
              ) : (
                <img src={preview} alt="Preview" className="image-preview" />
              )}
            </div>
          </div>

          {/* Кнопка отправки */}
          <div style={{ textAlign: 'right', marginTop: '30px' }}>
            <button type="submit" className={btnClass} style={{ fontSize: '16px', fontWeight: 'bold' }}>
              Разместить объявление
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
