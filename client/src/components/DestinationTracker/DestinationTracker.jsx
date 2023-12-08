import "./DestinationTracker.scss";

const DestinationTracker = ({ queueData }) => {
  return (
    <div className="destination-tracker">
      {queueData.map((data) => {
        return (
          <div key={data.floor} className="item">
            <p className="item__box item__box--floor">{data.floor}</p>
            <p className="item__box item__box--lifts">{data.lifts.join(" ")}</p>
          </div>
        );
      })}
    </div>
  );
};

export default DestinationTracker;
