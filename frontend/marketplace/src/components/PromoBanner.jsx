import React from "react";
import './PromoBanner.css'

export default function PromoBanner() {
  return (
    <div className="promo">
      <div>
        <div className="main-text">Разместите объявление прямо сейчас!</div>
        <div className="other-text">
          Быстрое размещение, тысячи просмотров!!
        </div>
      </div>
      <div>
        <button className="btn">Разместить</button>
      </div>
    </div>
  );
}
