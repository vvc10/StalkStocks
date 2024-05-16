import React from 'react';
import './Modal.css'; // Import your custom CSS file

const Modal = ({ children, closeModal }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-modal" onClick={closeModal}>
          &times;
        </button>
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
