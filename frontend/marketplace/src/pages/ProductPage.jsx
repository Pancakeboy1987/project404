import { useParams } from "react-router-dom";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import { review } from "../components/review";
import ReviewCard from "../components/ReviewCard";
import "../components/ProductPage.css";
import { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../components/providers/ThemeContext";
import voron from "../assets/voron.jpg"; 

export default function ProductPage() {
  const { theme } = useContext(ThemeContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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
      .finally(() => setLoading(false));
  }, []);

  const { id } = useParams();
  
  const product = products.find((p) => p.id === Number(id));

  if (loading) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>Загрузка товара...</div>;
  }

  if (!product) {
    return <h2 style={{ padding: '20px', textAlign: 'center' }}>Товар не найден</h2>;
  }

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
            <img src={imageUrl} alt={product.title} />
          </div>
          <div className="product-info">
            <h1>{product.title}</h1>
            <p className="product-price">{product.price} ₽</p>
            
            <div className="description-block">
               <h4>Описание</h4>
               <p className="product-description">{product.description}</p>
            </div>
            
            <p className="product-location" style={{marginTop: '20px', color: 'gray'}}>
              📍 {product.location || 'Город не указан'}
            </p>
          </div>
        </div>

        <div className={`right-block-${theme}`}>
          <div className={`seller-card-${theme}`}>
            <div className="contact-info">
              <h4>Продавец:</h4>
              
              {/* --- ИЗМЕНЕНИЕ ЗДЕСЬ --- */}
              {/* Выводим сохраненный userId (Ник + ID) */}
              <h3>{product.userName|| 'Продавец не указан'}</h3> 
              
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