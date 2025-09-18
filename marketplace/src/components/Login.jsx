import Modal from "./Modal"

export default function({onClose}){
    return(
        <Modal onClose={onClose}>
        <h2>Вход</h2>
        <form className="login-form">
          <input className="login-input" type="text" placeholder="Email" />
          <input className="login-input" type="password" placeholder="Пароль" />
          <button className="login-button" type="submit">Войти</button>
        </form>
      </Modal>
    )

}