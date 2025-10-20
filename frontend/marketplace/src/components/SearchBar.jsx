import React from "react";
import "./SearchBar.css"
import { useContext } from "react";
import { ThemeContext } from "./Contexts";

export default function SearchBar() {
  const {theme, setTheme} = useContext(ThemeContext)

  return (
    <div className={`search-${theme}`} role="search" >
      <input className={`search-input-${theme}`} placeholder="Чо ищете?" />
      <select
        
      >
        <option>Все категории</option>
        <option>Электроника</option>
        <option>Недвижимость</option>
        <option>Авто</option>
        <option>Литература</option>
        <option>Вилеоигры</option>
        <option>Гик-стафф</option>
      </select>
      <input
        className="city-input"
        placeholder="Город или регион"
      />
    </div>
  );
}
