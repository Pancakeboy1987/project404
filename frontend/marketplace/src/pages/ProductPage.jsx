import { useParams } from "react-router-dom";
// import { goods } from "../components/Goods"; // Это больше не нужно, если берем с сервера
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import { review } from "../components/review";
import ReviewCard from "../components/ReviewCard";
import "../components/ProductPage.css";
import { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../components/providers/ThemeContext";
import voron from "../assets/voron.jpg"; // Не забудь импортировать заглушку!

export default function ProductPage() {
  const { theme } = useContext(ThemeContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Добавили состояние загрузки

  // При загрузке страницы скачиваем товары
  useEffect(() => {
    fetch('http://localhost:7000/api/products') 
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
            setProducts(data);
        }
      })
      .catch((err) => console.error("Ошибка загрузки товаров:", err))
      .finally(() => setLoading(false)); // Выключаем загрузку при любом исходе
  }, []);

  const { id } = useParams();
  
  // Ищем товар только когда данные загрузились
  const product = products.find((p) => p.id === Number(id));

  // 1. Показываем "Загрузка...", пока ждем ответ от сервера
  if (loading) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>Загрузка товара...</div>;
  }

  // 2. Если загрузка прошла, но товар не найден
  if (!product) {
    return <h2 style={{ padding: '20px', textAlign: 'center' }}>Товар не найден</h2>;
  }

  // 3. Формируем правильный путь к картинке
  const baseUrl = 'http://localhost:7000/uploads/';
  const imageUrl = product.image ? baseUrl + product.image : voron;

  return (
    <>
      <div className="site">
        <Header />

        <div className="search-bar">
          <SearchBar />
          <div className="search-actions">
            <button className={`btn-${theme}`}>Поиск</button>
            <button className={`btn-${theme}`}>Разместить объявление</button>
          </div>
        </div>
      </div>

      <div className="product-container">
        <div className={`left-block-${theme}`}>
          <div className="product-image">
            {/* ИСПОЛЬЗУЕМ СФОРМИРОВАННЫЙ URL */}
            <img src={imageUrl} alt={product.title} />
          </div>
          <div className="product-info">
            <h1>{product.title}</h1>
            <p className="product-price">{product.price} ₽</p>
            
            <div className="description-block">
               <h4>Описание</h4>
               <p className="product-description">{product.description}</p>
            </div>
            
            {/* Если есть город в базе, выводим его */}
            <p className="product-location" style={{marginTop: '20px', color: 'gray'}}>
              📍 {product.location || 'Город не указан'}
            </p>
          </div>
        </div>

        <div className={`right-block-${theme}`}>
          <div className={`seller-card-${theme}`}>
            <div className="contact-info">
              <h4>Продавец:</h4>
              {/* Здесь пока статика, позже можно привязать user_id из товара */}
              <h3>Иван Иванов</h3> 
            </div>
            <div className="btn-space">
              <button className={`contact-btn-${theme}`}>Показать телефон</button>
              <button className="write-btn">Написать</button>
            </div>
            <div className="review-space">
              {review.map((item) => (
                <ReviewCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}