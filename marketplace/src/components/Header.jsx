import React from "react";
import ReactDOM from "react-dom";
import { useState } from "react";
import './Header.css'
import Login from "./Login";

import Modal from "./Modal";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
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
        <button className="btn" onClick={()=>setIsOpen(true)}>Войти</button>
      </nav>

      {isOpen && (
      <Login onClose={() => setIsOpen(false)}/>
      )}

    </header>
  );
}
