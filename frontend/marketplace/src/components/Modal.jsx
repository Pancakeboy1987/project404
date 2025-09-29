import ReactDOM from "react-dom";
import './Modal.css'

export default function Modal({onClose,children}){
    return ReactDOM.createPortal(
      <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()} // чтобы клик внутри окна не закрывал его
      >
        <button className="close-btn" onClick={onClose}>
          ✖
        </button>
        {children}
      </div>
    </div>,
    document.body
    )
  }
  