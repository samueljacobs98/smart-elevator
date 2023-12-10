import mapLiftStatusData from "./mapLiftStatusData";

const liftsData = {
  lift1: {
    destinations: [1, 2, 3],
    floor: 1,
  },
  lift2: {
    destinations: [2, 3, 4],
    floor: 1,
  },
  lift3: {
    destinations: [3, 4, 5],
    floor: 3,
  },
};

const userFloor = 1;

const expectedMappedData = {
  1: ["lift1"],
  2: ["lift1", "lift2"],
  3: ["lift1", "lift2", "lift3"],
  4: ["lift2", "lift3"],
  5: ["lift3"],
};

const expectedUpdatedArrived = new Set(["lift1", "lift2"]);

describe("mapLiftStatusData", () => {
  it("maps the data as expected", () => {
    const result = mapLiftStatusData(liftsData, userFloor);

    const mappedData = result[0];

    expect(mappedData).toEqual(expectedMappedData);
  });

  it("returns the updatedArrived as expected", () => {
    const result = mapLiftStatusData(liftsData, userFloor);

    const updatedArrived = result[1];

    expect(updatedArrived).toEqual(expectedUpdatedArrived);
  });

  it("returns an empty object and set if an empty object is passed in", () => {
    const result = mapLiftStatusData({}, userFloor);

    const [mappedData, updatedArrived] = result;

    expect(mappedData).toEqual({});
    expect(updatedArrived).toEqual(new Set());
  });

  it("returns an empty set for updatedArrived if no lifts have arrived", () => {
    const result = mapLiftStatusData(liftsData, 100);

    const updatedArrived = result[1];

    expect(updatedArrived).toEqual(new Set());
  });

  it("ignores lifts that have no destinations in the mappedData", () => {
    const noDestinationLiftData = {
      lift1: {
        destinations: [],
        floor: 1,
      },
    };

    const result = mapLiftStatusData(noDestinationLiftData, userFloor);

    const [mappedData, updatedArrived] = result;

    expect(mappedData).toEqual({});
    expect(updatedArrived).toEqual(new Set().add("lift1"));
  });
});
