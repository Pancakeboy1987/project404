import React, { useEffect } from "react";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import ListingCard from "../components/ListingCard";
import ProfileLists from "../components/profileComponents/ProfileLists";
import ProfileButtons from "../components/profileComponents/ProfileButtons";
import { Link } from "react-router-dom";
import { useContext,useState } from "react";
import { ThemeContext } from "../components/providers/ThemeContext";
import { AuthContext } from "../components/providers/AuthContext";
import voron from "../assets/voron.jpg";
import { goods } from "../components/Goods";
import "../components/profileComponents/profile.css";

//////Итак, мне нужно будет сделать оформление профиля как на ютубе и сделать возможность загружать свою фотку

export default function Profile() {
  const { theme, setTheme } = useContext(ThemeContext);
  const { authorised, setAuthorised, userAuth, setUserAuth, logout, login } =
    useContext(AuthContext);
  const [nickBlock, setNickBlock] = useState(null);
  const [contactBlock, setContactBlock] = useState(null);
  const [descriptionBlock, setDescriptionBlock]=useState("dolor sit amet, consectetuer adipiscing elit.")
  const [editedPhoto, setEditedPhoto] = useState(null); // Файл фото
  const [photoPreview, setPhotoPreview] = useState(userAuth?.profilePicture || voron); // Предпросмотр фото
  const [isEditing, setIsEditing] = useState(false); // Режим редактирования


  useEffect(() =>{
    localStorage.getItem("userAuth");
    localStorage.getItem("authorised");

    const user = userAuth

    if (authorised){
      setNickBlock(
        <h3>{user.name}</h3>
      )
      setContactBlock(
        <>{user.email}</>
      )
      setDescriptionBlock(
        user.description||''
      )
      setEditedPhoto(
        user.image||''
      )
    }else{
      setNickBlock(<h3>Name</h3>)
    }
     
  },[userAuth, setNickBlock, setContactBlock,setDescriptionBlock,setEditedPhoto])

  const handleSubmit = async (event)=>{

    event.preventDefault()
    try {
      // Собираем данные из формы
      const updatedUserData = {updatedName,description,image };
      console.log(updatedUserData);

      // Fetch-запрос на регистрацию (как в примере, но с реальными данными из формы)
      const response = await fetch("http://localhost:7000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUserData), // Преобразуем объект в JSON
      });

      // Здесь можно добавить redirect: window.location.href = '/'; (если без React Router)
    } catch (err) {
      // Обработка ошибок (например, если email уже занят или сервер упал)
      setError(err);
      console.error("Error:", err);
    }
  };

///тут хэндлер если изменения отменяем
  

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
          <img className="profile-picture" src={`${voron}`} alt="" />
          <div className={`profile-text-block-${theme}`}>
            {nickBlock}
            <div className="profile-description">
              dolor sit amet, consectetuer adipiscing elit. Aenean commodo
              ligula eget dolor.
            </div>
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

        <button className="profile-edit-btn"></button>
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
