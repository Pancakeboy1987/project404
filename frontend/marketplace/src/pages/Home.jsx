import React from "react";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import Categories from "../components/Categories";
import PromoBanner from "../components/PromoBanner";
import ListingCard from "../components/ListingCard";
import Footer from "../components/Footer";
import {goods} from "../components/Goods";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import { useContext } from "react";
import { ThemeContext } from "../components/providers/ThemeContext";



export default function Home() {

  const {theme, setTheme} = useContext(ThemeContext)
  const [products, setProducts] = useState([]);

  // При загрузке страницы скачиваем товары
  useEffect(() => {
   
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

  return (
    <div className={`site-${theme}`}>
      <Header />

      <main>
        <div className="search-bar">
          <SearchBar />
          <div className="search-actions">
            <button className={`btn-${theme}`}>Поиск</button>
            <Link className="mark-url" to={`/pages/CreateAd`}>
              <button className={`btn-${theme}`}>
                Разместить объявление
            </button>
          </Link>
          </div>
        </div>

        <Categories />

        <PromoBanner />

        <section>
          <h2>Свежие объявления</h2>
          <div className="grid">
            {products.map((item) => (
              <ListingCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
