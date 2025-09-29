import Modal from "./Modal"
import { useState } from "react"
import "./Login.css"
import Registration from "./Registration"

export default function({onClose}){
    const [authIsOpen,setAuthIsOpen]=useState(false)
    return(
        <Modal onClose={onClose}>
        <h2>Вход</h2>
        <form className="login-form">
          <input className="login-input" type="text" placeholder="Email" />
          <input className="login-input" type="password" placeholder="Пароль" />
          <button className="login-button" type="submit">Войти</button>
        </form>
        <div className="to-sign-in">
            <h3>Зарегистрироваться?</h3>
            <button className="to-sign-in-button" onClick={()=>setAuthIsOpen(true)} type="text">Зарегистрироваться</button>
            {authIsOpen&&(
                <Registration onClose={() => setAuthIsOpen(false)}/>
            )}
        </div>
      </Modal>
    )

}