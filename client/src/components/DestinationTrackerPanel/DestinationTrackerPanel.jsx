import "./DestinationTrackerPanel.scss";
import { useContext } from "react";
import DestinationTrackerItem from "../DestinationTrackerItem/DestinationTrackerItem";
import { SmartElevatorContext } from "../../context/SmartElevatorProvider";
import Config from "../../config";

const DestinationTrackerPanel = () => {
  const { queueData, arrived } = useContext(SmartElevatorContext);

  const userFloor = Config.userFloor;

  return (
    <div className="destination-tracker-panel">
      {Object.entries(queueData).map(([floor, lifts]) => {
        if (parseInt(floor) === userFloor) return null;
        return (
          <DestinationTrackerItem
            key={floor}
            floor={floor}
            lifts={lifts}
            arrived={arrived}
          />
        );
      })}
    </div>
  );
};

export default DestinationTrackerPanel;
