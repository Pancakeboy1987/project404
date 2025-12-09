import Modal from "./Modal";
import { useState, useContext } from "react";
import "./Login.css";
import Registration from "./Registration";
import { AuthContext } from "./providers/AuthContext";
import { ThemeContext } from "./providers/ThemeContext";

export default function Login({ onClose }) { 
  const [authIsOpen, setAuthIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { login } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext); // Получаем тему

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null); // Сбрасываем старые ошибки

    try {
      const userData = { email, password };

      const response = await fetch("http://localhost:7000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        // Если сервер вернул ошибку, показываем её сообщение
        throw new Error(data.message || "Ошибка при входе");
      }

      localStorage.setItem("token", data.token);
      
      // Обновляем глобальную авторизацию
      login({ 
        token: data.token, 
        name: data.user.name, 
        email: data.user.email, 
        id: data.user.id 
      });


      alert("Вы успешно вошли!");
      onClose?.(); 
      
    } catch (err) {
      console.error("Error:", err);

      setError(err.message);
    }
  };

  
  const inputClass = theme === 'dark' ? 'login-input-dark' : 'login-input-light';

  return (
    <Modal onClose={onClose}>
      <h2 style={{marginTop: 0, marginBottom: '20px'}}>Вход</h2>
      
    
      {error && <div className="error-message">{error}</div>}

      <form className="login-form" onSubmit={handleSubmit}>
        <input
          className={`login-input ${inputClass}`}
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className={`login-input ${inputClass}`}
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        
        <button className="login-button" type="submit">
          Войти
        </button>
      </form>

      <div className="to-sign-in">
        <h4 style={{margin: 0}}>Нет аккаунта?</h4>
        <button
          className="to-sign-in-button"
          onClick={() => setAuthIsOpen(true)}
          type="button" 
        >
          Зарегистрироваться
        </button>

        {authIsOpen && <Registration onClose={() => setAuthIsOpen(false)} />}
      </div>
    </Modal>
  );
}