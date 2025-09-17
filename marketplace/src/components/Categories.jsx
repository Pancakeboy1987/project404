import React from "react";
import "./Categories.css"

export default function Categories() {
  const cats = [
    "Недвижимость",
    "Транспорт",
    "Электроника",
    "Работа",
    "Услуги",
    "Дом и сад",
    "Одежда",
    "Хобби",
  ];
 //мапим список в дивы
  return (
    <div className="categories" aria-label="Категории">
      {cats.map((catty) => (
        <div className="cat" key={catty}>
          {catty}
        </div>
      ))}
    </div>
  );
}
