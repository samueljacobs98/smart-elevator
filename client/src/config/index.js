import { EnvVariableError } from "../utils/errors";

const baseUrl = process.env.REACT_APP_API_URL || "http://localhost:3001/api";

const userFloor = process.env.REACT_APP_FLOOR
  ? parseInt(process.env.REACT_APP_FLOOR)
  : null;

if (isNaN(userFloor) || userFloor === null) {
  throw new EnvVariableError("REACT_APP_FLOOR");
}

const pollingInterval = process.env.REACT_APP_POLLING_INTERVAL
  ? parseInt(process.env.REACT_APP_POLLING_INTERVAL)
  : 10;

if (isNaN(pollingInterval)) {
  throw new EnvVariableError("REACT_APP_POLLING_INTERVAL");
}

const Config = {
  baseUrl,
  pollingInterval,
  userFloor,
};

export default Config;
