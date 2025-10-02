import { useParams } from "react-router-dom";
import {goods} from "../components/Goods";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import Categories from "../components/Categories";
import { review } from "../components/review";
import ReviewCard from "../components/ReviewCard";
import "../components/ProductPage.css"

export default function ProductPage() {
  const { id } = useParams();
  const product = goods.find((p) => p.id === Number(id));

  if (!product) {
    return <h2>Товар не найден</h2>;
  }

  return (
    <>
    <div className="site">
    <Header />

      <div className="search-bar">
        <SearchBar />
        <div className="search-actions">
          <button className="btn">Поиск</button>
          <button className="btn">Разместить объявление</button>
        </div>
      </div>
      </div>

        <div className="product-container">

        <div className="left-block">
        <div className="product-image">
            <img src={product.img} alt={product.title} />
        </div>
        <div className="product-info">
            <h1>{product.title}</h1>
            <p className="product-price">{product.price}</p>
            <p className="product-description">{product.description}</p>
        </div>
        </div>

        <div className="right-block">
        <div className="seller-card">
          <div className="contact-info">
          <h4>Продавец:</h4>
          <h3>Иван Иванов</h3>
          </div>
          <div className="btn-space">
            <button className="contact-btn">Показать телефон</button>
            <button className="write-btn">Написать</button>
          </div>
          <div className="review-space">
            {review.map((item) => (
              <ReviewCard key={item.id} item={item}/>
            )
          )}
          </div>


            </div>
        </div>

 
    </div>
    </>
  );
}
