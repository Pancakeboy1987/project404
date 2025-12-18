import React, { useState, useContext, useEffect } from 'react';
import '../components/CreateAddPageComponents/createAdPage.css';
import { ThemeContext } from '../components/providers/ThemeContext';
import { AuthContext } from '../components/providers/AuthContext';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';

export default function CreateAdPage() {
  const { theme, setTheme } = useContext(ThemeContext);
  // Получаем userAuth, где должны храниться данные пользователя (ник и id)
  const { authorised, userAuth } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: 'electronics',
    image: null,
  });

  const [preview, setPreview] = useState(null);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Проверка авторизации перед отправкой
    if (!userAuth) {
      alert('Вы должны быть авторизованы, чтобы создавать товары!');
      return;
    }

    try {
      const dataToSend = new FormData();
      
      dataToSend.append('title', formData.title);
      dataToSend.append('price', formData.price);
      dataToSend.append('description', formData.description);
      dataToSend.append('category', formData.category);
      
      
      // Добавляем это поле в отправляемые данные
      dataToSend.append('userId', userAuth.id); 
      dataToSend.append('userName', userAuth.name); 

      
      // Для отладки можно вывести в консоль, что отправляем
      console.log('Отправляемый userId:',userAuth.id);
      // --------------------

      if (formData.image) {
        dataToSend.append('image', formData.image);
      }
  
      const response = await fetch('http://localhost:7000/api/products/create', {
        method: 'POST',
        body: dataToSend, 
      });
  
      const result = await response.json();
  
      if (!response.ok) {
        console.error('Ошибка сервера:', result);
        alert(`Ошибка: ${result.message || 'Не удалось создать объявление'}`);
        return;
      }
  
      console.log('Успех:', result);
      alert('Объявление успешно создано!');
      
    } catch (error) {
      console.error('Ошибка сети:', error);
      alert('Произошла ошибка при отправке запроса');
    }
  };

  const pageClass = theme === 'light' ? 'page-light' : 'page-dark';
  const wrapperClass = theme === 'light' ? 'wrapper-light' : 'wrapper-dark';
  const btnClass = theme === 'light' ? 'btn-light' : 'btn-dark';
  const inputClass = theme === 'light' ? 'input-light' : 'input-dark';

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