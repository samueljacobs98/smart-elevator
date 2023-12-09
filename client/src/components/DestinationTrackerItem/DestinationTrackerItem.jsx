import "./DestinationTrackerItem.scss";

const DestinationTrackerItem = ({ floor, lifts, arrived }) => {
  return (
    <div key={floor} className="item">
      <p className="item__box item__box--floor">{floor}</p>
      <div className="item__box item__box--lifts">
        {lifts.map((lift) => {
          const modifier = arrived.has(lift) ? "item__box__lift--arrived" : "";
          return (
            <p key={lift} className={"item__box__lift" + modifier}>
              {lift}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default DestinationTrackerItem;
