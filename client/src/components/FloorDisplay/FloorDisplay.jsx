import "./FloorDisplay.scss";

const FloorDisplay = ({ floor }) => {
  return (
    <h1 className="floor-display">
      You are on <span className="floor-display__floor">Floor {floor}</span>
    </h1>
  );
};

export default FloorDisplay;
