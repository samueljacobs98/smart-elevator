import "./App.scss";
import Button from "./components/Button/Button";
import ButtonContainer from "./components/ButtonContainer/ButtonContainer";
import FloorDisplay from "./components/FloorDisplay/FloorDisplay";
import Layout from "./components/Layout/Layout";
import LiftStatus from "./components/LiftStatus/LiftStatus";
import StatusTracker from "./components/StatusTracker/StatusTracker";
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
  const liftConfig = getLiftConfig();
  const liftStatus = getLiftStatus();

  const floors = Object.values(liftConfig.lifts).reduce(
    (acc, lift) => union(acc, lift.servicedFloors),
    []
  );

  const onClick = (e) => {
    console.log(e.target.value);
  };

  const buttons = floors.map((floor) => {
    return <Button key={floor} onClick={onClick} floorNumber={floor} />;
  });

  const liftStatuses = Object.entries(liftStatus).map(
    ([liftNumber, status]) => (
      <LiftStatus
        key={liftNumber}
        liftNumber={liftNumber}
        currentFloor={status.floor}
        destinations={status.destinations}
      />
    )
  );

  return (
    <Layout>
      <FloorDisplay floor={userFloor} />
      <ButtonContainer>{buttons}</ButtonContainer>
      <StatusTracker>{liftStatuses}</StatusTracker>
    </Layout>
  );
}

export default App;
