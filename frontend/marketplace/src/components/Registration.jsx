import Modal from "./Modal";
import "./Registration.css";

export default function Registration({onClose}){
    return(
        <Modal onClose={onClose}>
        <h2>Регистрация</h2>
        <form className="login-form">
          <input className="login-input" type="text" placeholder="Email" />
          <input className="login-input" type="password" placeholder="Пароль" />
          <button className="login-button" type="submit">Войти</button>
        </form>
        </Modal>
    )

}