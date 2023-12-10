import axios from "axios";
import defaultOnError from "./defaultOnError";
import Config from "../../config";
import postData from "./postData";

const path = "test-path";
const mockData = { key: "value" };

jest.mock("axios");
jest.mock("../../config", () => ({ baseUrl: "http://test-api-url.com" }));
jest.mock("./defaultOnError");

const mockResponse = { data: "response-data" };
const mockError = new Error("test-error");

const mockAndThen = jest.fn();
const mockOnError = jest.fn();
const mockCustomOnError = jest.fn();

describe("postData", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("calls axios.post with the correct url and data and processes the response with the andThen function", async () => {
    axios.post.mockResolvedValue(mockResponse);

    await postData(path, mockData, mockAndThen, mockOnError);

    expect(axios.post).toHaveBeenCalledWith(
      `${Config.baseUrl}/${path}`,
      mockData
    );
    expect(mockAndThen).toHaveBeenCalledWith(mockResponse.data);
  });

  it("calls the defaultOnError function if the request fails and no onError function is provided", async () => {
    axios.post.mockRejectedValue(mockError);

    await postData(path, mockData, mockAndThen);

    expect(axios.post).toHaveBeenCalledWith(
      `${Config.baseUrl}/${path}`,
      mockData
    );
    expect(defaultOnError).toHaveBeenCalledWith(mockError);
    expect(mockAndThen).not.toHaveBeenCalledWith(mockResponse.data);
  });

  it("calls the provided onError function if the request fails", async () => {
    axios.post.mockRejectedValue(mockError);

    await postData(path, mockData, mockAndThen, mockCustomOnError);

    expect(axios.post).toHaveBeenCalledWith(
      `${Config.baseUrl}/${path}`,
      mockData
    );
    expect(mockCustomOnError).toHaveBeenCalledWith(mockError);
    expect(mockAndThen).not.toHaveBeenCalledWith(mockResponse.data);
  });
});
