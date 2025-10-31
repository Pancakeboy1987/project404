import React, { useContext, useEffect } from "react";
import ReactDOM from "react-dom";
import { useState } from "react";
import './Header.css'
import { MdOutlineLightMode } from "react-icons/md"
import Login from "./Login";

import { ThemeContext } from "./Contexts";
import  {AuthContext}  from "./AuthContext";

import { Link } from "react-router-dom";

import Modal from "./Modal";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [authBlock,setAuthBlock] = useState(null)
  const {authorised, setAuthorised, userAuth,setUserAuth,logout} = useContext(AuthContext)
  const {theme, setTheme} = useContext(ThemeContext);

  useEffect(() => {
    if (authorised) {
      setAuthBlock(
        <div className="user-block">
          <div className="username">
          <Link to={`/pages/profile`} target="_blank">
          {userAuth.name}
          </Link>
          </div>
          <button
            className={`btn-${theme}`}
            onClick={() => {
              logout()
            }}
          >
            Выйти
          </button>
        </div>
      );
    } else {
      setAuthBlock(
        <button className={`btn-${theme}`} onClick={() => setIsOpen(true)}>
          Войти
        </button>
      );
    }
  }, [theme,userAuth,authorised,setAuthorised]

  )


  return (
    <header className="topbar">
      <div className="logo">
        <div className="mark">
        <Link className="mark-url" to={`/`}>
        R/M
        </Link>
          </div>
        <div>
          <div className='main-title'>RUDN Market</div>
          <div  className="alter-title">
            лалаллалала
          </div>
        </div>
      </div>

      <nav className="nav-btns">
        <button className="light-mode-btn" onClick={()=>{
          if (theme==='light'){
            setTheme('dark')
          }else{
            setTheme('light')
          }
        }
        }>

          <MdOutlineLightMode />
        </button>
        <button className={`btn-${theme}`}>Избранное</button>
        <button className={`btn-${theme}`}>Сообщения</button>
        {authBlock}

        
      </nav>

      {isOpen && (
      <Login onClose={() => setIsOpen(false)}/>
      )}

    </header>
  );
}
