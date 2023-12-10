import axios from "axios";
import defaultOnError from "./defaultOnError";
import Config from "../../config";

const postData = async (path, data, andThen, onError = defaultOnError) => {
  try {
    const response = await axios.post(`${Config.baseUrl}/${path}`, data);
    return andThen(response.data);
  } catch (error) {
    onError(error);
  }
};

export default postData;
