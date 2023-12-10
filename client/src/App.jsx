import "./App.scss";
import Button from "./components/Button/Button";
import ButtonContainer from "./components/ButtonContainer/ButtonContainer";
import FloorDisplay from "./components/FloorDisplay/FloorDisplay";
import Layout from "./components/Layout/Layout";
import Modal from "./components/Modal/Modal";
import DestinationTrackerContainer from "./components/DestinationTrackerContainer/DestinationTrackerContainer";
import DestinationTrackerItem from "./components/DestinationTrackerItem/DestinationTrackerItem";
import { getLiftConfig, getLiftStatus, requestFloor } from "./utils/api";
import { mapLiftStatusData } from "./utils/helpers";
import { useEffect, useRef, useState, useCallback } from "react";
import LoaderModal from "./components/LoaderModal/LoaderModal";
import Config from "./config";

function App() {
  const [liftConfig, setLiftConfig] = useState(null);
  const [liftStatus, setLiftStatus] = useState(null);
  const [floors, setFloors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [queueData, setQueueData] = useState([]);
  const [arrived, setArrived] = useState(new Set());
  const [modalData, setModalData] = useState({
    lift: null,
    toFloor: null,
  });

  const userFloorRef = useRef(Config.userFloor);
  const pollingIntervalRef = useRef(Config.pollingInterval);

  const isLoading = !Boolean(liftConfig && liftStatus);

  const getConfigCallback = useCallback(async () => {
    const liftConfig = await getLiftConfig();
    if (liftConfig) setLiftConfig(liftConfig);
  }, []);

  const getLiftStatusCallback = useCallback(async () => {
    const status = await getLiftStatus(userFloorRef.current);
    if (status) setLiftStatus(status);
  }, []);

  useEffect(() => {
    getConfigCallback();
    getLiftStatusCallback();

    const interval = setInterval(() => {
      getLiftStatus();
    }, pollingIntervalRef.current * 1000);
    return () => clearInterval(interval);
  }, [getConfigCallback, getLiftStatusCallback]);

  useEffect(() => {
    if (!liftConfig) return;

    const allServicedFloors = Object.values(liftConfig.lifts).reduce(
      (acc, lift) => {
        lift.serviced_floors.forEach((floor) => {
          if (!acc.includes(floor)) acc.push(floor);
        });

        return acc;
      },
      []
    );

    setFloors(allServicedFloors);
  }, [liftConfig]);

  useEffect(() => {
    if (!liftStatus) return;

    const [mappedData, updatedArrived] = mapLiftStatusData(
      liftStatus,
      userFloorRef.current
    );

    setArrived(updatedArrived);
    setQueueData(mappedData);
  }, [liftStatus]);

  const onClick = async (e) => {
    if (showModal) return;

    const toFloor = parseInt(e.target.value);

    if (liftStatus) {
      const alreadyGoingToFloorLiftData = Object.entries(liftStatus).find(
        ([_, { destinations }]) => destinations.includes(toFloor)
      );

      if (alreadyGoingToFloorLiftData) {
        const lift = alreadyGoingToFloorLiftData[0];
        setModalData({ lift, toFloor });
        setShowModal(true);
        return;
      }
    }

    const lift = await requestFloor(userFloorRef.current, toFloor);

    await getLiftStatus();

    setModalData({ lift, toFloor });
    setShowModal(true);
  };

  return (
    <Layout>
      {isLoading ? (
        <LoaderModal />
      ) : (
        <>
          <FloorDisplay floor={userFloorRef.current} />
          <ButtonContainer>
            {floors.map((floor) => {
              if (floor === userFloorRef.current) return null;
              return (
                <Button
                  key={floor}
                  onClick={onClick}
                  floorNumber={floor}
                  isDisabled={showModal}
                />
              );
            })}
          </ButtonContainer>
          <DestinationTrackerContainer>
            {Object.entries(queueData).map(([floor, lifts]) => {
              if (parseInt(floor) === userFloorRef.current) return null;
              return (
                <DestinationTrackerItem
                  key={floor}
                  floor={floor}
                  lifts={lifts}
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
          to={modalData.toFloor}
          showModal={showModal}
          hideModal={() => {
            setShowModal(false);
            setModalData({ lift: null, toFloor: null });
          }}
          lifts={Object.keys(liftConfig.lifts)}
        />
      )}
    </Layout>
  );
}

export default App;
