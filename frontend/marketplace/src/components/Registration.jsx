import Modal from "./Modal";
import "./Registration.css";
import { useState } from "react";
import { ThemeContext } from "./providers/ThemeContext";

export default function Registration({onClose}){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState(null);  // Для отображения ошибок
  const [success, setSuccess] = useState(false);  // Для успеха

  const handleSubmit = async (event) => {
    event.preventDefault();  // Предотвращаем перезагрузку страницы

    try {
      // Собираем данные из формы
      const userData = { email, password, name };
      console.log(userData)

      // Fetch-запрос на регистрацию (как в примере, но с реальными данными из формы)
      const response = await fetch('http://localhost:7000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),  // Преобразуем объект в JSON
      });

      // Проверяем, успешный ли ответ (если статус не 200-299, бросаем ошибку)
      if (!response.ok) {
        throw new Error('Registration failed');
        
      }

      // Парсим JSON из ответа
      const data = await response.json();

      // Сохраняем токен в localStorage (для будущих запросов, например, на авторизованные страницы)
      localStorage.setItem('token', data.token);

      // Выводим токен в консоль для теста (как в твоем примере)
      console.log('Token:', data.token);

      // Устанавливаем успех (можно перенаправить на главную страницу)
      setSuccess(true);
      setError(null);
      onClose()      // Здесь можно добавить redirect: window.location.href = '/'; (если без React Router)
    } catch (err) {
      // Обработка ошибок (например, если email уже занят или сервер упал)
      setError(err);
      console.error('Error:', err);
    }
  };



    return(
        <Modal onClose={onClose}>
        <h2>Регистрация</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <input className="login-input" type="text" placeholder="Имя пользователя"
          value={name}
          onChange={(e)=>setName(e.target.value)}
          required
          />
          <input className="login-input" type="text" placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          required

           />
          <input className="login-input" type="password" placeholder="Пароль"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          required
           />
          <button className="login-button" type="submit" >Зарегистрироваться</button>
        </form>
        </Modal>
    )

}