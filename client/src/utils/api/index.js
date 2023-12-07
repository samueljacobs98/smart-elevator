import axios from "axios";

const defaultOnError = (error) => console.error(error);

// TODO: where to save these (getData + postData) functions?
export const getData = async (path, andThen, onError = defaultOnError) => {
  try {
    // TODO: use env variable for api url
    const response = await axios.get(`http://localhost:3001/${path}`);
    andThen(response.data);
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
    const response = await axios.post(`http://localhost:3001/${path}`, data);
    andThen(response.data);
  } catch (error) {
    onError(error);
  }
};
