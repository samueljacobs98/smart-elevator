import { filterLiftStatus } from "../helpers";
import axios from "axios";

const defaultOnError = (error) => console.error(error);

const baseUrl = process.env.REACT_APP_API_URL || "http://localhost:3001/api";

export const getData = async (path, andThen, onError = defaultOnError) => {
  try {
    const response = await axios.get(`${baseUrl}/${path}`);
    return andThen(response.data);
  } catch (error) {
    // TODO: improve error handling
    onError(error);
  }
};

export const postData = async (
  path,
  data,
  andThen,
  onError = defaultOnError
) => {
  try {
    const response = await axios.post(`${baseUrl}/${path}`, data);
    return andThen(response.data);
  } catch (error) {
    onError(error);
  }
};

export const getConfig = () => getData("lift/config", (data) => data);

export const getLiftStatus = (userFloor) =>
  getData("lift/status", ({ lifts }) => filterLiftStatus(lifts, userFloor));
