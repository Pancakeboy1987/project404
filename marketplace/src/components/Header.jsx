import React from "react";
import './Header.css'

export default function Header() {
  return (
    <header className="topbar">
      <div className="logo">
        <div className="mark">R/M</div>
        <div>
          <div className='main-title'>RUDN Market</div>
          <div  className="alter-title">
            лалаллалала
          </div>
        </div>
      </div>

      <nav className="nav-btns">
        <button className="btn">Избранное</button>
        <button className="btn">Сообщения</button>
        <button className="btn">Войти</button>
      </nav>
    </header>
  );
}
