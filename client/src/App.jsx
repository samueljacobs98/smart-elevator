import "./App.scss";
import Button from "./components/Button/Button";
import ButtonContainer from "./components/ButtonContainer/ButtonContainer";
import FloorDisplay from "./components/FloorDisplay/FloorDisplay";
import Layout from "./components/Layout/Layout";
import LiftStatus from "./components/LiftStatus/LiftStatus";
import StatusTracker from "./components/StatusTracker/StatusTracker";
import { Suspense, useEffect, useState } from "react";
import union from "lodash/union";

function getLiftConfig() {
  return {
    lifts: {
      0: {
        servicedFloors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      },
      1: {
        servicedFloors: [0, 1, 7, 8, 9, 10],
      },
    },
  };
}

function getLiftStatus() {
  return {
    0: {
      floor: 0,
      destinations: [1, 5, 10],
    },
    1: {
      floor: 0,
      destinations: [1, 10],
    },
  };
}

const userFloor = 0;

function App() {
  const [liftConfig, setLiftConfig] = useState(null);
  const [liftStatus, setLiftStatus] = useState(null);
  const [floors, setFloors] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLiftConfig(getLiftConfig());
      setLiftStatus(getLiftStatus());
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!liftConfig) return;
    const allServicedFloors = Object.values(liftConfig.lifts).reduce(
      (acc, lift) => union(acc, lift.servicedFloors),
      []
    );
    setFloors(allServicedFloors);
  }, [liftConfig]);

  const onClick = (e, floorFrom) => {
    const floorTo = parseInt(e.target.value);

    console.log({ floorTo, floorFrom });
  };

  return (
    <Layout>
      <FloorDisplay floor={userFloor} />
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
