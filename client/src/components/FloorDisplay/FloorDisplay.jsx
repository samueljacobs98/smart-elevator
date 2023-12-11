import Config from "../../config";
import "./FloorDisplay.scss";

const FloorDisplay = () => {
  return (
    <h1 className="floor-display">
      {"You are on "}
      <span className="floor-display__floor">Floor {Config.userFloor}</span>
    </h1>
  );
};

export default FloorDisplay;
