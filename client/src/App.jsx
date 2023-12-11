import "./App.scss";
import Layout from "./components/Layout/Layout";
import Modal from "./components/Modal/Modal";
import LoaderModal from "./components/LoaderModal/LoaderModal";
import FloorDisplay from "./components/FloorDisplay/FloorDisplay";
import ButtonPanel from "./components/ButtonPanel/ButtonPanel";
import DestinationTrackerPanel from "./components/DestinationTrackerPanel/DestinationTrackerPanel";
import Config from "./config";
import { SmartElevatorContext } from "./context/SmartElevatorProvider";
import { getLiftConfig } from "./utils/api";
import { getAllServicedFloors, mapLiftStatusData } from "./utils/helpers";
import { useEffect, useState, useCallback, useContext } from "react";

function App() {
  const [liftConfig, setLiftConfig] = useState(null);

  const {
    liftStatus,
    setFloors,
    setArrived,
    setQueueData,
    showModal,
    modalData,
    setShowModal,
    setModalData,
    getLiftStatusCallback,
  } = useContext(SmartElevatorContext);

  const isLoading = !Boolean(liftConfig && liftStatus);

  const getConfigCallback = useCallback(async () => {
    const liftConfig = await getLiftConfig();
    if (liftConfig) setLiftConfig(liftConfig);
  }, []);

  useEffect(() => {
    getConfigCallback();
    getLiftStatusCallback();

    const interval = setInterval(() => {
      getLiftStatusCallback();
    }, Config.pollingInterval * 1000);
    return () => clearInterval(interval);
  }, [getConfigCallback, getLiftStatusCallback]);

  useEffect(() => {
    if (!liftConfig) return;

    const allServicedFloors = getAllServicedFloors(liftConfig.lifts);

    setFloors(allServicedFloors);
  }, [liftConfig, setFloors]);

  useEffect(() => {
    if (!liftStatus) return;

    const [mappedData, updatedArrived] = mapLiftStatusData(
      liftStatus,
      Config.userFloor
    );

    setArrived(updatedArrived);
    setQueueData(mappedData);
  }, [liftStatus, setArrived, setQueueData]);

  return (
    <Layout>
      {isLoading ? (
        <LoaderModal />
      ) : (
        <>
          <FloorDisplay />
          <ButtonPanel />
          <DestinationTrackerPanel />
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
