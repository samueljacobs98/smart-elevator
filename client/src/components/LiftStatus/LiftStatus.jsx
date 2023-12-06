import "./LiftStatus.scss";

function getDirection(currentFloor, destinations) {
  if (destinations.some((floor) => floor > currentFloor)) {
    return "up";
  } else if (destinations.some((floor) => floor < currentFloor)) {
    return "down";
  }

  return "-";
}

const LiftStatus = ({ liftNumber, currentFloor, destinations }) => {
  const direction = getDirection(currentFloor, destinations);

  const floors = [currentFloor, ...destinations]
    .sort((a, b) => a - b)
    .map((floor) => {
      const className = "lift-status__box__floor";
      return (
        <p
          key={floor}
          className={`${className} ${
            floor === currentFloor && className + "--current"
          }`}
        >
          {floor}
        </p>
      );
    });

  return (
    <div className="lift-status">
      <div
        className="lift-status__box lift-status__box--blue"
        aria-label="lift number"
      >
        {liftNumber}
      </div>
      <div className="lift-status__box lift-status__box--green lift-status__box--order">
        {floors}
      </div>
      <div
        className="lift-status__box lift-status__box--blue"
        aria-label="direction"
      >
        {direction}
      </div>
    </div>
  );
};

export default LiftStatus;
