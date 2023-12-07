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

// TODO: use env variable for user floor
const userFloor = 0;

function App() {
  const [liftConfig, setLiftConfig] = useState(null);
  const [liftStatus, setLiftStatus] = useState(null);
  const [floors, setFloors] = useState([]);

  useEffect(() => {
    getData("api/lift/config", (data) => setLiftConfig(data));
    getData("api/lift/status", ({ lifts }) => setLiftStatus(lifts));

    // TODO: is this polling approach the best way to do this?
    // TODO: use env variable for interval
    // const interval = setInterval(() => {
    //   getData("api/lift/status", ({ lifts }) => setLiftStatus(lifts));
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

  const onClick = (e, from_floor) => {
    const to_floor = parseInt(e.target.value);

    postData("api/lift/request", { from_floor, to_floor }, (data) => {
      console.log(data);
    });

    getData("api/lift/status", ({ lifts }) => setLiftStatus(lifts));

    console.log({ from_floor, to_floor });
  };

  return (
    <Layout>
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
    </Layout>
  );
}

export default App;
