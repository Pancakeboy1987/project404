import React from "react";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import Categories from "../components/Categories";
import PromoBanner from "../components/PromoBanner";
import ListingCard from "../components/ListingCard";
import Footer from "../components/Footer";
import {goods} from "../components/Goods";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../components/providers/ThemeContext";



export default function Home() {

  const {theme, setTheme} = useContext(ThemeContext)

  return (
    <div className={`site-${theme}`}>
      <Header />

      <main>
        <div className="search-bar">
          <SearchBar />
          <div className="search-actions">
            <button className={`btn-${theme}`}>Поиск</button>
            <button className={`btn-${theme}`}>Разместить объявление</button>
          </div>
        </div>

        <Categories />

        <PromoBanner />

        <section>
          <h2>Свежие объявления</h2>
          <div className="grid">
            {goods.map((item) => (
              <ListingCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
