import "./App.scss";
import Button from "./components/Button/Button";
import ButtonContainer from "./components/ButtonContainer/ButtonContainer";
import FloorDisplay from "./components/FloorDisplay/FloorDisplay";
import Layout from "./components/Layout/Layout";
import { getData, postData } from "./utils/api";
import { useEffect, useState } from "react";
import union from "lodash/union";
import Modal from "./components/Modal/Modal";
import DestinationTracker from "./components/DestinationTracker/DestinationTracker";

function App() {
  const [liftConfig, setLiftConfig] = useState(null);
  const [liftStatus, setLiftStatus] = useState(null);
  const [floors, setFloors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({
    lift: null,
    to: null,
    at: null,
  });
  const [queueData, setQueueData] = useState([]);

  const userFloor = process.env.REACT_APP_FLOOR;
  if (!userFloor) {
    throw new Error("REACT_APP_FLOOR env variable not set");
  }

  useEffect(() => {
    getData("lift/config", (data) => setLiftConfig(data));
    getData("lift/status", (data) => setLiftStatus(data));

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

  useEffect(() => {
    if (!liftStatus) return;
    setQueueData(
      Object.entries(liftStatus.lifts).reduce(
        (acc, [lift, { destinations }]) => {
          destinations.forEach((destination) => {
            const floorObj = acc.find(
              (floorObj) => floorObj.floor === destination
            );
            if (floorObj) {
              floorObj.lifts.push(lift);
            } else {
              acc.push({ floor: destination, lifts: [lift] });
            }
          });
          return acc;
        },
        []
      )
    );
  }, [liftStatus]);

  const onClick = async (e) => {
    const to_floor = parseInt(e.target.value);

    if (liftStatus.lifts) {
      Object.entries(liftStatus.lifts).forEach((i) => console.log(i));
      const liftAlreadyGoingToFloor = Object.entries(liftStatus.lifts).find(
        ([_, { floor, destinations }]) => destinations.includes(to_floor)
      );

      if (liftAlreadyGoingToFloor) {
        const lift = liftAlreadyGoingToFloor[0];
        const floor = liftAlreadyGoingToFloor[1].floor;
        setModalData({ lift, to: to_floor, at: floor });
        setShowModal(true);
        return;
      }
    }

    const res = await postData(
      "lift/request",
      { from_floor: userFloor, to_floor },
      (data) => data
    );

    await getData("lift/status", (data) => setLiftStatus(data));

    setModalData({ lift: res.lift, to: to_floor });
    setShowModal(true);
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
                <Button key={floor} onClick={onClick} floorNumber={floor} />
              );
            })}
          </ButtonContainer>
          <DestinationTracker queueData={queueData} />
        </>
      )}
      {showModal && (
        <Modal
          lift={modalData.lift}
          to={modalData.to}
          hideModal={() => {
            setShowModal(false);
            setModalData({ lift: null, to: null, at: null });
          }}
        />
      )}
    </Layout>
  );
}

export default App;
