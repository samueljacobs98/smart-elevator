import "./Button.scss";

const Button = ({ floorNumber, onClick, isDisabled }) => {
  return (
    <button
      onClick={onClick}
      className={`button ${isDisabled ? "button--disabled" : ""}`}
      value={floorNumber}
      aria-label={`Call lift to floor ${floorNumber}`}
    >
      {floorNumber}
    </button>
  );
};

export default Button;
