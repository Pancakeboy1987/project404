import React from "react";
import './ListingCard.css'
import { Link } from "react-router-dom"
import { useContext } from "react";
import { ThemeContext } from "./providers/ThemeContext";
import voron from "../assets/voron.jpg"; // Заглушка, если картинки нет

export default function ListingCard({ item }) {
  const { theme } = useContext(ThemeContext);

  // Базовый URL твоего сервера
  const API_URL = 'http://localhost:7000/uploads/';

  // Проверяем, есть ли картинка в товаре. Если нет — ставим заглушку.
  // item.image — это то, как поле называется в твоей базе данных (sequilize модель)
  const imageUrl = item.image ? API_URL + item.image : voron;

  return (
    <div className={`card-${theme}`}>
      {/* Используем сформированный URL */}
      <img src={imageUrl} alt={item.title} />
      
      <div className="card-body">
        <div>
          <div id={`title-${item.id}`} className="card-title">
            {item.title}
          </div>
          {/* Если location не указан, пишем дефолтное */}
          <div className="card-meta">{item.location || 'Город не указан'}</div>
        </div>
        <div className="price">
          {item.price} ₽ 
        </div>
      </div>
      
      <div className={`card-${theme}-footer`}>
        {/* Можно выводить реальную дату создания, если хочешь */}
        <div className="card-meta">
           {new Date(item.createdAt).toLocaleDateString()}
        </div>
        
        <Link to={`/pages/${item.id}`} className="link-style">
           Подробнее...
        </Link>
      </div>
    </div>
  );
}