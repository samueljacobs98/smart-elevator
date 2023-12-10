import filterLiftStatus from "./filterLiftStatus";

const liftsData = {
  A: { floor: 0, destinations: [1, 5, 9] },
  B: { floor: 0, destinations: [7, 10] },
  C: { floor: 5, destinations: [0, 1, 2] },
  D: { floor: 8, destinations: [7, 10] },
};

const userFloor = 0;

describe("filterLiftStatus", () => {
  it("filters lifts correctly based on user floor", () => {
    const filteredData = filterLiftStatus(liftsData, userFloor);

    const expectedFilteredData = {
      A: { floor: 0, destinations: [1, 5, 9] },
      B: { floor: 0, destinations: [7, 10] },
      C: { floor: 5, destinations: [0, 1, 2] },
    };

    expect(filteredData).toEqual(expectedFilteredData);
  });

  it("includes lifts that are already on the user's floor", () => {
    const filteredData = filterLiftStatus(liftsData, userFloor);

    expect(filteredData).toHaveProperty("A");
    expect(filteredData).toHaveProperty("B");
  });

  it("returns an empty object if there are no lifts on the user's floor and no lifts with the user's floor as a destination", () => {
    const userFloor = 100;

    const filteredData = filterLiftStatus(liftsData, userFloor);

    const expectedFilteredData = {};

    expect(filteredData).toEqual(expectedFilteredData);
  });

  it("returns an empty object if there are no lifts", () => {
    const liftsData = {};

    const filteredData = filterLiftStatus(liftsData, userFloor);

    const expectedFilteredData = {};

    expect(filteredData).toEqual(expectedFilteredData);
  });
});
