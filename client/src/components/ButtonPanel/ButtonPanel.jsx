import "./ButtonPanel.scss";
import Button from "../Button/Button";
import { SmartElevatorContext } from "../../context/SmartElevatorProvider";
import { checkAlreadyGoingToFloor } from "../../utils/helpers";
import { requestFloor } from "../../utils/api";
import Config from "../../config";
import { useContext } from "react";

const ButtonPanel = () => {
  const {
    floors,
    showModal,
    liftStatus,
    setModalData,
    setShowModal,
    getLiftStatusCallback,
  } = useContext(SmartElevatorContext);

  const userFloor = Config.userFloor;

  const onClick = async (e) => {
    if (showModal) return;

    const toFloor = parseInt(e.target.value);

    if (liftStatus) {
      const alreadyGoingToFloorLiftData = checkAlreadyGoingToFloor(
        liftStatus,
        toFloor
      );

      if (alreadyGoingToFloorLiftData) {
        const lift = alreadyGoingToFloorLiftData[0];
        setModalData({ lift, toFloor });
        setShowModal(true);
        return;
      }
    }

    const lift = await requestFloor(userFloor, toFloor);

    await getLiftStatusCallback();

    setModalData({ lift, toFloor });
    setShowModal(true);
  };

  return (
    <div className="button-panel">
      {floors.map((floor) => {
        if (floor === userFloor) return null;
        return (
          <Button
            key={floor}
            floorNumber={floor}
            onClick={onClick}
            isDisabled={showModal}
          />
        );
      })}
    </div>
  );
};

export default ButtonPanel;
