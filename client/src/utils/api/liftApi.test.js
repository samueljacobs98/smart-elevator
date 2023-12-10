import { getLiftConfig, getLiftStatus, requestFloor } from "./liftApi";
import getData from "./getData";
import postData from "./postData";
import { filterLiftStatus } from "../helpers";

jest.mock("./getData", () => jest.fn());
jest.mock("./postData", () => jest.fn());
jest.mock("../helpers", () => ({
  filterLiftStatus: jest.fn(),
}));

const userFloor = 0;

beforeEach(() => {
  jest.clearAllMocks();
});

describe("getLiftConfig", () => {
  it("should call get data with the correct arguments and return the result", async () => {
    const mockData = { test: "test" };
    getData.mockResolvedValue(mockData);

    jest.clearAllMocks();

    const result = await getLiftConfig();

    expect(getData).toHaveBeenCalledWith("lift/config", expect.any(Function));
    expect(result).toEqual(mockData);
  });
});

describe("getLiftStatus", () => {
  it("should call getData with the correct arguments and return the filtered result", async () => {
    const mockLiftsData = {
      lifts: {
        A: { floor: 0, destinations: [1, 5, 9] },
        B: { floor: 0, destinations: [7, 10] },
        C: { floor: 5, destinations: [0, 1, 2] },
        D: { floor: 8, destinations: [7, 10] },
      },
    };

    const mockFilteredData = {
      A: { floor: 0, destinations: [1, 5, 9] },
      B: { floor: 0, destinations: [7, 10] },
      C: { floor: 5, destinations: [0, 1, 2] },
    };

    getData.mockImplementation((_, andThen) =>
      Promise.resolve(andThen(mockLiftsData))
    );
    filterLiftStatus.mockReturnValue(mockFilteredData);

    const result = await getLiftStatus(userFloor);

    expect(getData).toHaveBeenCalledWith("lift/status", expect.any(Function));
    expect(filterLiftStatus).toHaveBeenCalledWith(
      mockLiftsData.lifts,
      userFloor
    );
    expect(result).toEqual(mockFilteredData);
  });
});

describe("requestFloor", () => {
  it("should call postData with the correct arguments and return the result", async () => {
    const toFloor = 1;

    const mockResponseData = { lift: "B" };

    postData.mockImplementation((_0, _1, andThen) =>
      Promise.resolve(andThen(mockResponseData))
    );

    const result = await requestFloor(userFloor, toFloor);

    expect(postData).toHaveBeenCalledWith(
      "lift/request",
      { from_floor: userFloor, to_floor: toFloor },
      expect.any(Function)
    );
    expect(result).toEqual(mockResponseData.lift);
  });
});
