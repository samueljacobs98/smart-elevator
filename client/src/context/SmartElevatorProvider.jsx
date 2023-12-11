import { createContext, useState, useCallback } from "react";
import { getLiftStatus } from "../utils/api";
import Config from "../config";

export const SmartElevatorContext = createContext();

export const SmartElevatorProvider = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const [liftStatus, setLiftStatus] = useState(null);
  const [floors, setFloors] = useState([]);
  const [queueData, setQueueData] = useState([]);
  const [arrived, setArrived] = useState(new Set());
  const [modalData, setModalData] = useState({
    lift: null,
    toFloor: null,
  });

  const getLiftStatusCallback = useCallback(async () => {
    const status = await getLiftStatus(Config.userFloor);
    if (status) setLiftStatus(status);
  }, [setLiftStatus]);

  return (
    <SmartElevatorContext.Provider
      value={{
        showModal,
        setShowModal,
        liftStatus,
        setLiftStatus,
        floors,
        setFloors,
        queueData,
        setQueueData,
        arrived,
        setArrived,
        modalData,
        setModalData,
        getLiftStatusCallback,
      }}
    >
      {children}
    </SmartElevatorContext.Provider>
  );
};
