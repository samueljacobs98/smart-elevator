import { filterLiftStatus } from "../helpers";
import getData from "./getData";
import postData from "./postData";

const getLiftConfig = () => getData("lift/config", (data) => data);

const getLiftStatus = (userFloor) =>
  getData("lift/status", (data) => filterLiftStatus(data.lifts, userFloor));

const requestFloor = (userFloor, toFloor) =>
  postData(
    "lift/request",
    { from_floor: userFloor, to_floor: toFloor },
    (data) => data.lift
  );

export { getLiftConfig, getLiftStatus, requestFloor };
