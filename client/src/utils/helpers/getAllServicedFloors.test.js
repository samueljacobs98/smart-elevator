import getAllServicedFloors from "./getAllServicedFloors";

describe("getAllServicedFloors", () => {
  it("returns all serviced floors from multiple lifts without duplicates", () => {
    const lifts = {
      lift1: { serviced_floors: [1, 2, 3] },
      lift2: { serviced_floors: [2, 3, 4] },
      lift3: { serviced_floors: [5] },
    };

    const expectedServicedFloors = [1, 2, 3, 4, 5];

    const result = getAllServicedFloors(lifts);

    expect(result).toEqual(expectedServicedFloors);
  });

  it("returns an empty array when an empty object is provided", () => {
    const lifts = {};

    const expectedServicedFloors = [];

    const result = getAllServicedFloors(lifts);

    expect(result).toEqual(expectedServicedFloors);
  });

  it("returns an empty array when the lifts have no serviced floors", () => {
    const lifts = {
      lift1: { serviced_floors: [] },
      lift2: { serviced_floors: [] },
    };

    const expectedServicedFloors = [];

    const result = getAllServicedFloors(lifts);

    expect(result).toEqual(expectedServicedFloors);
  });
});
