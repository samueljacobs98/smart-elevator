import checkAlreadyGoingToFloor from "./checkAlreadyGoingToFloor";

const liftStatus = {
  A: { floor: 3, destinations: [5, 6] },
  B: { floor: 0, destinations: [7, 10] },
  C: { floor: 5, destinations: [0, 1, 2] },
};

const expectedResult = ["B", { floor: 0, destinations: [7, 10] }];

describe("checkAlreadyGoingToFloor", () => {
  it("returns the first lift already going to the specified floor", () => {
    const result = checkAlreadyGoingToFloor(liftStatus, 7);

    expect(result).toEqual(expectedResult);
  });

  it("returns undefined when no lift is going to the specified floor", () => {
    const result = checkAlreadyGoingToFloor(liftStatus, 8);

    expect(result).toBeUndefined();
  });

  it("returns undefined when the liftStatus is empty", () => {
    const result = checkAlreadyGoingToFloor({}, 5);

    expect(result).toBeUndefined();
  });
});
