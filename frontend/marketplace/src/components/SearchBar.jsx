import React from "react";
import "./SearchBar.css"

export default function SearchBar() {
  return (
    <div className="search" role="search" >
      <input placeholder="Чо ищете?" />
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
