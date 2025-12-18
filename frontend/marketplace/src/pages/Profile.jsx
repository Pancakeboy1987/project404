import React, { useEffect, useState, useContext } from "react";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import ProfileLists from "../components/profileComponents/ProfileLists";
import ProfileButtons from "../components/profileComponents/ProfileButtons";
import { ThemeContext } from "../components/providers/ThemeContext";
import { AuthContext } from "../components/providers/AuthContext";
import voron from "../assets/voron.jpg"; 
import "../components/profileComponents/profile.css";

// Иконки (если не установлены: npm install react-icons)
import { FaPen, FaSave, FaTimes, FaCamera, FaPhone, FaEnvelope, FaShareAlt } from "react-icons/fa";

export default function Profile() {
  const { theme } = useContext(ThemeContext);
  const { authorised, userAuth, setUserAuth } = useContext(AuthContext);
  
  const [nickBlock, setNickBlock] = useState('');
  const [contactBlock, setContactBlock] = useState('');
  const [descriptionBlock, setDescriptionBlock] = useState('');
  
  // Состояния для фото
  const [editedPhoto, setEditedPhoto] = useState(null);
  const baseUrl = 'http://localhost:7000';
  const [photoPreview, setPhotoPreview] = useState(voron);
  
  const [isEditing, setIsEditing] = useState(false);

  // Инициализация данных
  useEffect(() => {
    if (authorised && !isEditing) {
      setNickBlock(userAuth?.name || 'Пользователь');
      setContactBlock(userAuth?.email || '');
      setDescriptionBlock(userAuth?.description || 'Нет описания профиля.');
      // Если есть фото на сервере - берем его, иначе заглушка
      setPhotoPreview(userAuth?.image ? `${baseUrl}/${userAuth.image}` : voron);
    } else if (!authorised) {
      setNickBlock('Гость');
      setPhotoPreview(voron);
    }
  }, [userAuth, authorised, isEditing]);

  // Превью фото при выборе файла
  useEffect(() => {
    if (editedPhoto) {
      const previewUrl = URL.createObjectURL(editedPhoto);
      setPhotoPreview(previewUrl);
      return () => URL.revokeObjectURL(previewUrl);
    }
  }, [editedPhoto]);

  ///загрузка товара 
  useEffect(() => {
    // Запрос на твой сервер
    fetch('http://localhost:7000/api/products') 
      .then((res) => res.json())
      .then((data) => {
        // Если пришел массив, сохраняем его
        if (Array.isArray(data)) {
            setProducts(data);
        }
      })
      .catch((err) => console.error("Ошибка загрузки товаров:", err));
  }, []);


  // Сохранение
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const id = userAuth.id;
      const formData = new FormData();
      formData.append('nickBlock', nickBlock);
      formData.append('descriptionBlock', descriptionBlock);
      formData.append('id', id);
      if (editedPhoto) {
        formData.append('image', editedPhoto);
      }

      const response = await fetch(`http://localhost:7000/api/auth/edit`, {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) throw new Error("Ошибка обновления");

      const updatedUserResponse = await response.json();
      const updatedUser = updatedUserResponse.user;

      setUserAuth(updatedUser);
      localStorage.setItem("userAuth", JSON.stringify(updatedUser));
      setIsEditing(false);
      setEditedPhoto(null);
      alert("Профиль обновлен!");
    } catch (error) {
      console.error(error);
      alert("Не удалось сохранить изменения");
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedPhoto(null);
    // Данные сбросятся useEffect-ом автоматически
  };

  return (
    <div className={`page-wrapper ${theme}-mode`}>
      <Header />

      {/* Поиск */}
      <div className="search-section">
        <SearchBar />
        <div className="search-actions">
          <button className={`btn-action btn-${theme}`}>Поиск</button>
          <button className={`btn-action btn-${theme}`}>Подать объявление</button>
        </div>
      </div>

      <div className="profile-container">
        
        {/* --- Верхняя часть профиля (Шапка) --- */}
        {/* ВАЖНО: Используем класс profile-card-${theme}, чтобы не конфликтовать с главной */}
        <div className={`profile-header-card profile-card-${theme}`}>
          
          {/* Блок аватарки */}
          <div className="avatar-wrapper">
            <img className="profile-picture-large" src={photoPreview} alt="Avatar" />
            
            {/* Оверлей для загрузки фото (появляется только при редактировании) */}
            {isEditing && (
              <label className="upload-overlay">
                <FaCamera className="camera-icon" />
                <span>Изменить</span>
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden-input"
                  onChange={(e) => setEditedPhoto(e.target.files[0])}
                />
              </label>
            )}
          </div>

          {/* Инфо блок */}
          <div className="profile-info">
            <div className="info-header">
              {isEditing ? (
                <input
                  type="text"
                  className={`edit-input title-input input-${theme}`}
                  value={nickBlock}
                  onChange={(e) => setNickBlock(e.target.value)}
                  placeholder="Ваше имя"
                />
              ) : (
                <h1 className="profile-name">{nickBlock}</h1>
              )}
              
              {/* Рейтинг/Звезды */}
              <div className="star-block">⭐⭐⭐⭐⭐ (5.0)</div>
            </div>

            <div className="info-body">
              {isEditing ? (
                <textarea
                  className={`edit-textarea input-${theme}`}
                  value={descriptionBlock}
                  onChange={(e) => setDescriptionBlock(e.target.value)}
                  placeholder="Расскажите о себе..."
                />
              ) : (
                <p className="profile-description">{descriptionBlock}</p>
              )}
            </div>
            
            <div className="info-footer">
               {/* Кнопки действий */}
               {authorised && !isEditing && (
                <button className={`btn-edit btn-${theme}`} onClick={() => setIsEditing(true)}>
                  <FaPen style={{marginRight: '8px'}}/> Редактировать
                </button>
              )}

              {isEditing && (
                <div className="edit-actions">
                  <button className={`btn-save btn-${theme}`} onClick={handleSubmit}>
                    <FaSave /> Сохранить
                  </button>
                  <button className={`btn-cancel btn-${theme}-outline`} onClick={handleCancel}>
                    <FaTimes /> Отмена
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* --- Блок контактов --- */}
        {/* ВАЖНО: Используем класс profile-card-${theme} */}
        <div className={`profile-contacts-card profile-card-${theme}`}>
          <h3 className="section-title">Контакты</h3>
          
          <div className="contact-item">
            <FaPhone className="icon" />
            <span>8 (800) 555-35-35</span>
          </div>
          
          <div className="contact-item">
            <FaEnvelope className="icon" />
            <span>{contactBlock || 'Почта скрыта'}</span>
          </div>
          
          <div className="contact-item">
            <FaShareAlt className="icon" />
            <span>Соцсетей нет</span>
          </div>
        </div>

      </div>

      {/* Остальные блоки */}
      <div className="profile-nav-block">
        <ProfileButtons />
      </div>

      <div className="profile-content-block">
        <ProfileLists />
      </div>
    </div>
  );
}