import { halveArray } from "../../utils/helpers";
import Arrow from "../Arrow/Arrow";
import "./Modal.scss";
import { useEffect } from "react";

const Modal = ({ lift, to, showModal, hideModal, lifts }) => {
  useEffect(() => {
    const timeout = setTimeout(hideModal, 4000);
    return () => clearTimeout(timeout);
  }, [hideModal]);

  const [firstHalf, secondHalf] = halveArray(lifts);

  return (
    <div className={`modal ${showModal ? "modal--show" : ""}`}>
      <div className="modal__content">
        <p className="modal__content__title">The next lift to floor {to}:</p>
        <div className="modal__content__main">
          <Arrow isLeft={true} isActive={firstHalf.includes(lift)} />
          <p className="modal__content__main__text">{lift}</p>
          <Arrow isLeft={false} isActive={secondHalf.includes(lift)} />
        </div>
      </div>
    </div>
  );
};

export default Modal;
