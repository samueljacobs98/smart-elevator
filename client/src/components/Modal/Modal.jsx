import "./Modal.scss";
import { useEffect } from "react";

const Modal = ({ lift, to, showModal, hideModal }) => {
  useEffect(() => {
    const timeout = setTimeout(hideModal, 4000);
    return () => clearTimeout(timeout);
  }, [hideModal]);

  return (
    <div className={`modal ${showModal ? "modal--show" : ""}`}>
      <div className="modal__content">
        <p className="modal__content__title">The next lift to floor {to}:</p>
        <p className="modal__content__text">{lift}</p>
      </div>
    </div>
  );
};

export default Modal;
