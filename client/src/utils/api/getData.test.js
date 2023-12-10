import axios from "axios";
import defaultOnError from "./defaultOnError";
import Config from "../../config";
import getData from "./getData";

const path = "test-path";

jest.mock("axios");
jest.mock("../../config", () => ({ baseUrl: "http://test-api-url.com" }));
jest.mock("./defaultOnError");

const mockResponse = { data: "test-data" };
const mockError = new Error("test-error");

const mockAndThen = jest.fn();
const mockOnError = jest.fn();
const mockCustomOnError = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
});

describe("getData", () => {
  it("calls axios.get with the correct url and processes the response with the andThen function", async () => {
    axios.get.mockResolvedValue(mockResponse);

    await getData(path, mockAndThen, mockOnError);

    expect(axios.get).toHaveBeenCalledWith(`${Config.baseUrl}/${path}`);
    expect(mockAndThen).toHaveBeenCalledWith(mockResponse.data);
  });

  it("calls the defaultOnError function if the request fails and no onError function is provided", async () => {
    axios.get.mockRejectedValue(mockError);

    await getData(path, mockAndThen);

    expect(axios.get).toHaveBeenCalledWith(`${Config.baseUrl}/${path}`);
    expect(defaultOnError).toHaveBeenCalledWith(mockError);
    expect(mockAndThen).not.toHaveBeenCalledWith(mockResponse.data);
  });

  it("calls the provided onError function if the request fails", async () => {
    axios.get.mockRejectedValue(mockError);

    await getData(path, mockAndThen, mockCustomOnError);

    expect(axios.get).toHaveBeenCalledWith(`${Config.baseUrl}/${path}`);
    expect(mockCustomOnError).toHaveBeenCalledWith(mockError);
    expect(mockAndThen).not.toHaveBeenCalledWith(mockResponse.data);
  });
});
