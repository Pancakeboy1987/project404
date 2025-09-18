import Modal from "./Modal"
import { useState } from "react"
import "./Login.css"

export default function({onClose}){
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
            <button className="to-sign-in-button" type="text">Зарегистрироваться</button>
        </div>
      </Modal>
    )

}