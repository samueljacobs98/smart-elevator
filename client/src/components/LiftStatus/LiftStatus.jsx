import "./LiftStatus.scss";

const LiftStatus = ({ liftNumber, queue }) => {
  return (
    <div className="lift-status">{`Lift: ${liftNumber} going to ${queue.join(
      " "
    )}`}</div>
  );
};

export default LiftStatus;
