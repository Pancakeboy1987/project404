import React, { useContext, useEffect } from "react";
import ReactDOM from "react-dom";
import './Modal.css';
import { ThemeContext } from './providers/ThemeContext';

export default function Modal({ onClose, children }) {
  const { theme } = useContext(ThemeContext);

  // Закрытие по нажатию клавиши ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return ReactDOM.createPortal(
    <div className="modal-backdrop" onClick={onClose}>
      <div
        // Применяем класс в зависимости от темы + класс анимации
        className={`modal-content-${theme} modal-animate`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-btn" onClick={onClose}>
          ✖
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
}