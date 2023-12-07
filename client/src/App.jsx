import "./App.scss";
import Button from "./components/Button/Button";
import ButtonContainer from "./components/ButtonContainer/ButtonContainer";
import FloorDisplay from "./components/FloorDisplay/FloorDisplay";
import Layout from "./components/Layout/Layout";
import LiftStatus from "./components/LiftStatus/LiftStatus";
import StatusTracker from "./components/StatusTracker/StatusTracker";
import { getData, postData } from "./utils/api";
import { useEffect, useState } from "react";
import union from "lodash/union";
import Modal from "./components/Modal/Modal";

function App() {
  const [liftConfig, setLiftConfig] = useState(null);
  const [liftStatus, setLiftStatus] = useState(null);
  const [floors, setFloors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({ lift: null, to: null });

  const userFloor = process.env.REACT_APP_FLOOR;
  if (!userFloor) {
    throw new Error("REACT_APP_FLOOR env variable not set");
  }

  useEffect(() => {
    getData("lift/config", (data) => setLiftConfig(data));
    getData("lift/status", ({ lifts }) => setLiftStatus(lifts));

    // TODO: is this polling approach the best way to do this?
    // TODO: use env variable for interval
    // const interval = setInterval(() => {
    //   getData("lift/status", ({ lifts }) => setLiftStatus(lifts));
    // }, 1000);
    // return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!liftConfig) return;
    const allServicedFloors = Object.values(liftConfig.lifts).reduce(
      (acc, lift) => union(acc, lift.serviced_floors),
      []
    );
    setFloors(allServicedFloors);
  }, [liftConfig]);

  const onClick = async (e, from_floor) => {
    const to_floor = parseInt(e.target.value);

    const { lift } = await postData(
      "lift/request",
      { from_floor, to_floor },
      (data) => data
    );

    getData("lift/status", ({ lifts }) => setLiftStatus(lifts));

    setShowModal(true);
    setModalData({ lift: lift, to: to_floor });
  };

  return (
    <Layout isLoading={!Boolean(liftConfig && liftStatus)}>
      <FloorDisplay floor={userFloor} />
      {/* TODO: Add loading element(s) */}
      {liftConfig && liftStatus && (
        <>
          <ButtonContainer>
            {floors.map((floor) => {
              return (
                <Button
                  key={floor}
                  onClick={(e) => onClick(e, userFloor)}
                  floorNumber={floor}
                />
              );
            })}
          </ButtonContainer>
          <StatusTracker>
            {Object.entries(liftStatus).map(([liftNumber, status]) => (
              <LiftStatus
                key={liftNumber}
                liftNumber={liftNumber}
                currentFloor={status.floor}
                destinations={status.destinations}
              />
            ))}
          </StatusTracker>
        </>
      )}
      {showModal && (
        <Modal
          lift={modalData.lift}
          to={modalData.to}
          hideModal={() => {
            setShowModal(false);
            setModalData({ lift: null, to: null });
          }}
        />
      )}
    </Layout>
  );
}

export default App;
