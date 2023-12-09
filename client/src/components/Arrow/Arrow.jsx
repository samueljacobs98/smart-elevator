import "./Arrow.scss";
import arrow from "../../assets/svgs/arrow.svg";

const Arrow = ({ isLeft, isActive }) => {
  return (
    <img
      className={`arrow ${isLeft ? "arrow--left" : ""} ${
        isActive ? "arrow--active" : ""
      }`}
      src={arrow}
      alt={`${isLeft ? "Left" : "Right"} arrow`}
    />
  );
};

export default Arrow;
