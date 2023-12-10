import axios from "axios";
import defaultOnError from "./defaultOnError";
import Config from "../../config";

const getData = async (path, andThen, onError = defaultOnError) => {
  try {
    const response = await axios.get(`${Config.baseUrl}/${path}`);
    return andThen(response.data);
  } catch (error) {
    onError(error);
  }
};

export default getData;
