import React from "react";
import './PromoBanner.css'
import { useContext } from "react";
import { ThemeContext } from "./providers/ThemeContext";

export default function PromoBanner() {
  const {theme,setTheme} = useContext(ThemeContext)

  return (
    <div className={`promo-${theme}`}>
      <div>
        <div className="main-text">Разместите объявление прямо сейчас!</div>
        <div className="other-text">
          Быстрое размещение, тысячи просмотров!!
        </div>
      </div>
      <div>
        <button className={`btn-${theme}`}>Разместить</button>
      </div>
    </div>
  );
}
