import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import ListingCard from "../components/ListingCard";
import ProfileLists from "../components/profileComponents/ProfileLists";
import ProfileButtons from "../components/profileComponents/ProfileButtons";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../components/providers/ThemeContext";
import { AuthContext } from "../components/providers/AuthContext";
import voron from "../assets/voron.jpg";
import { goods } from "../components/Goods";
import "../components/profileComponents/profile.css";

import { FaBroom } from "react-icons/fa";

//////Итак, мне нужно будет сделать оформление профиля как на ютубе и сделать возможность загружать свою фотку

export default function Profile() {
  const { theme, setTheme } = useContext(ThemeContext);
  const { authorised, setAuthorised, userAuth, setUserAuth, logout, login } = useContext(AuthContext);
  const [nickBlock, setNickBlock] = useState('');
  const [contactBlock, setContactBlock] = useState('');
  const [descriptionBlock, setDescriptionBlock] = useState('');
  const [editedPhoto, setEditedPhoto] = useState(null); // Файл фото
  const baseUrl = 'http://localhost:7000'; // Базовый URL бэкенда
  const [photoPreview, setPhotoPreview] = useState(userAuth?.image ? `${baseUrl}/${userAuth.image}` : voron); // Предпросмотр фото с полным URL
  const [isEditing, setIsEditing] = useState(false); // Режим редактирования

  useEffect(() => {
    const user = userAuth;

    if (authorised && !isEditing) {  // Добавили !isEditing, чтобы не ресетить во время/после редактирования
      setNickBlock(user?.name || 'name');
      setContactBlock(user?.email || '');
      setDescriptionBlock(user?.description || 'dolor sit amet, consectetuer adipiscing elit.');
      setPhotoPreview(user?.image ? `${baseUrl}/${user.image}` : voron);  // Полный URL для фото с сервера
    } else if (!authorised) {
      setNickBlock('Name');
    }
  }, [userAuth, authorised, isEditing]);  // Добавили isEditing в deps, чтобы useEffect сработал после выхода из редактирования

  // Предпросмотр фото
  useEffect(() => {
    if (editedPhoto) {
      const previewUrl = URL.createObjectURL(editedPhoto);
      setPhotoPreview(previewUrl);
      return () => URL.revokeObjectURL(previewUrl); // Очистка
    }
  }, [editedPhoto]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const id = userAuth.id;

      // Используем FormData для текста + файла
      const formData = new FormData();
      formData.append('nickBlock', nickBlock);
      formData.append('descriptionBlock', descriptionBlock);
      formData.append('id', id);
      if (editedPhoto) {
        formData.append('image', editedPhoto);  // Файл как 'image'
      }

      const response = await fetch(`http://localhost:7000/api/auth/edit`, {
        method: "PUT",
        body: formData,  // Нет headers Content-Type — браузер сам установит multipart/form-data
      });

      if (!response.ok) {
        throw new Error("Ошибка обновления профиля");
      }

      const updatedUserResponse = await response.json();
      const updatedUser = updatedUserResponse.user;  // Из {message, user}
      console.log(updatedUser);

      setUserAuth(updatedUser);
      localStorage.setItem("userAuth", JSON.stringify(updatedUser));

      // useEffect обновит блоки, включая полный URL для photoPreview
      setIsEditing(false); // Выходим из режима редактирования
      alert("Профиль обновлён!");
    } catch (error) {
      console.error(error);
      alert("Ошибка при сохранении");
    }
  };

  const handleCancel = () => {
    if (authorised) {
      setNickBlock(userAuth?.name || "name");
      setDescriptionBlock(userAuth?.description || "dolor sit amet, consectetuer adipiscing elit.");
      setPhotoPreview(userAuth?.image ? `${baseUrl}/${userAuth.image}` : voron); // Полный URL
    } else {
      setNickBlock("Name");
    }
    setEditedPhoto(null); // Сбрасываем файл фото
    setIsEditing(false); // Выходим из режима редактирования
  };

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

      <div className={`profile-body-${theme}`}>
        <div className={`profile-main-block-${theme}`}>
          <img className="profile-picture" src={photoPreview} alt="" />  {/* Используем photoPreview */}
          <div className={`profile-text-block-${theme}`}>
            {isEditing ? (
              <>
                <input
                  type="text"
                  value={nickBlock}
                  onChange={(e) => setNickBlock(e.target.value)}
                  placeholder="Никнейм"
                />
                <textarea
                  value={descriptionBlock}
                  onChange={(e) => setDescriptionBlock(e.target.value)}
                  placeholder="Описание"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setEditedPhoto(e.target.files[0])}
                />
              </>
            ) : (
              <>
                <h3>{nickBlock}</h3>
                <div className="profile-description">{descriptionBlock}</div>
              </>
            )}
            <div className="star-block">Here will be stars</div>
          </div>
        </div>

        <div className={`profile-contacts-block-${theme}`}>
          <div>
            <h2>Контакты</h2>
          </div>
          <div className="contact-line">
            <h4>Номер телефона:</h4> 88005553535
          </div>
          <div className="contact-line">
            <h4>Почта:</h4> {contactBlock}
          </div>
          <div className="contact-line">
            <h4>соцсетей </h4>нет
          </div>
        </div>

        {authorised && !isEditing && (
          <button className={`profile-edit-btn-${theme}`} onClick={() => setIsEditing(true)}>
            <FaBroom />
          </button>
        )}
        {isEditing && (
          <div className="editing-btn">
            <button className={`btn-${theme}`} onClick={handleSubmit}>
              Сохранить
            </button>
            <button className={`btn-${theme}`} onClick={handleCancel}>
              Отмена
            </button>
          </div>
        )}
      </div>

      <div className="profile-button-block">
        <ProfileButtons />
      </div>

      <div className="profile-lists-block">
        <ProfileLists />
      </div>
    </div>
  );
}