import "./App.scss";
import Button from "./components/Button/Button";
import ButtonContainer from "./components/ButtonContainer/ButtonContainer";
import FloorDisplay from "./components/FloorDisplay/FloorDisplay";
import Layout from "./components/Layout/Layout";
import LiftStatus from "./components/LiftStatus/LiftStatus";
import StatusTracker from "./components/StatusTracker/StatusTracker";
import union from "lodash/union";

function App() {
  const liftConfig = {
    lifts: {
      0: {
        servicedFloors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      },
      1: {
        servicedFloors: [0, 7, 8, 9, 10],
      },
    },
  };
  const floors = union(
    liftConfig.lifts[0].servicedFloors,
    liftConfig.lifts[1].servicedFloors
  );

  const userFloor = 0;

  const onClick = (e) => {
    console.log(e.target.value);
  };

  const buttons = floors.map((floor) => {
    return <Button key={floor} onClick={onClick} floorNumber={floor} />;
  });

  return (
    <Layout>
      <FloorDisplay floor={userFloor} />
      <ButtonContainer>{buttons}</ButtonContainer>
      <StatusTracker>
        <LiftStatus liftNumber={1} queue={[1, 3, 4]} />
        <LiftStatus liftNumber={2} queue={[1, 5, 9]} />
        <LiftStatus liftNumber={5} queue={[2, 6, 7]} />
      </StatusTracker>
    </Layout>
  );
}

export default App;
