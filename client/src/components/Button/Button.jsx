import "./Button.scss";

const Button = ({ floorNumber, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="button"
      value={floorNumber}
      aria-label={`Call lift to floor ${floorNumber}`}
    >
      {floorNumber}
    </button>
  );
};

export default Button;
