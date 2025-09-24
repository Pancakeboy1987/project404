import { useParams } from "react-router-dom";
import {goods} from "../components/Goods";
import "../components/ProductPage.css"

export default function ProductPage() {
  const { id } = useParams();
  const product = goods.find((p) => p.id === Number(id));

  if (!product) {
    return <h2>Товар не найден</h2>;
  }

  return (
    <div className="product-container">
      <div className="product-image">
        <img src={product.img} alt={product.title} />
      </div>
      <div className="product-info">
        <h1>{product.title}</h1>
        <p className="product-price">{product.price}</p>
        <p className="product-description">{product.description}</p>

        <div className="seller-card">
          <h3>Продавец</h3>
          <p>Иван Иванов</p>
          <button className="contact-btn">Показать телефон</button>
        </div>
      </div>
    </div>
  );
}
