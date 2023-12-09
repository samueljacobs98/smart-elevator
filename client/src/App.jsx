import "./App.scss";
import Button from "./components/Button/Button";
import ButtonContainer from "./components/ButtonContainer/ButtonContainer";
import FloorDisplay from "./components/FloorDisplay/FloorDisplay";
import Layout from "./components/Layout/Layout";
import { getData, postData } from "./utils/api";
import Modal from "./components/Modal/Modal";
import DestinationTrackerContainer from "./components/DestinationTrackerContainer/DestinationTrackerContainer";
import DestinationTrackerItem from "./components/DestinationTrackerItem/DestinationTrackerItem";
import { useEffect, useRef, useState } from "react";
import union from "lodash/union";

function App() {
  // TODO: context API?
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
  const [arrived, setArrived] = useState(new Set());

  const userFloorRef = useRef(parseInt(process.env.REACT_APP_FLOOR));
  if (userFloorRef.current == null) {
    throw new Error("REACT_APP_FLOOR env variable not set");
  }
  const pollingIntervalRef = useRef(
    process.env.REACT_APP_POLLING_INTERVAL || 10
  );

  useEffect(() => {
    getData("lift/config", (data) => setLiftConfig(data));
    getData("lift/status", (data) => setLiftStatus(data));

    // TODO: is this polling approach the best way to do this?
    const interval = setInterval(() => {
      getData("lift/status", (data) => setLiftStatus(data));
    }, pollingIntervalRef.current * 1000);
    return () => clearInterval(interval);
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
      // can this be done more efficiently?
      Object.entries(liftStatus.lifts).reduce(
        (acc, [lift, { floor, destinations }]) => {
          if (floor === userFloorRef.current) {
            setArrived((arrived) => new Set(arrived).add(lift));
          }

          destinations.forEach((destination) => {
            const floorObj = acc.find(({ floor }) => floor === destination);
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
    const toFloor = parseInt(e.target.value);

    if (liftStatus.lifts) {
      const liftAlreadyGoingToFloor = Object.entries(liftStatus.lifts).find(
        ([_, { destinations }]) => destinations.includes(toFloor)
      );

      if (liftAlreadyGoingToFloor) {
        const lift = liftAlreadyGoingToFloor[0];
        const floor = liftAlreadyGoingToFloor[1].floor;
        setModalData({ lift, to: toFloor, at: floor });
        setShowModal(true);
        return;
      }
    }

    const res = await postData(
      "lift/request",
      { from_floor: userFloorRef.current, to_floor: toFloor },
      (data) => data
    );

    await getData("lift/status", (data) => setLiftStatus(data));

    setModalData({ lift: res.lift, to: toFloor });
    setShowModal(true);
  };

  return (
    <Layout isLoading={!Boolean(liftConfig && liftStatus)}>
      <FloorDisplay floor={userFloorRef.current} />
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
          <DestinationTrackerContainer>
            {queueData.map((data) => {
              return (
                <DestinationTrackerItem
                  key={data.floor}
                  floor={data.floor}
                  lifts={data.lifts}
                  arrived={arrived}
                />
              );
            })}
          </DestinationTrackerContainer>
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
