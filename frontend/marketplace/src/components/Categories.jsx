import React from "react";
import "./Categories.css"
import { useContext } from "react";
import { ThemeContext } from "./Contexts";

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

  const {theme, setTheme} = useContext(ThemeContext);
 //мапим список в дивы
  return (
    <div className={`categories-${theme}`} aria-label="Категории">
      {cats.map((catty) => (
        <div className={`cat-${theme}`} key={catty}>
          {catty}
        </div>
      ))}
    </div>
  );
}
