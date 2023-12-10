import halveArray from "./halveArray";

describe("halveArray", () => {
  it("splits an array of even length into two equal halves", () => {
    const evenLengthArray = [1, 2, 3, 4, 5, 6];

    const [firstHalf, secondHalf] = halveArray(evenLengthArray);

    const expectedFirstHalf = [1, 2, 3];
    const expectedSecondHalf = [4, 5, 6];

    expect(firstHalf).toEqual(expectedFirstHalf);
    expect(secondHalf).toEqual(expectedSecondHalf);
  });

  it("splits an array of odd length into two halves, the first being one element longer than the second", () => {
    const oddLengthArray = [1, 2, 3, 4, 5];

    const [firstHalf, secondHalf] = halveArray(oddLengthArray);

    const expectedFirstHalf = [1, 2, 3];
    const expectedSecondHalf = [4, 5];

    expect(firstHalf).toEqual(expectedFirstHalf);
    expect(secondHalf).toEqual(expectedSecondHalf);
  });

  it("returns an empty arrays if the input array is empty", () => {
    const emptyArray = [];

    const [firstHalf, secondHalf] = halveArray(emptyArray);

    const expectedFirstHalf = [];
    const expectedSecondHalf = [];

    expect(firstHalf).toEqual(expectedFirstHalf);
    expect(secondHalf).toEqual(expectedSecondHalf);
  });

  it("returns an array with one array with a single element and an empty array if the input array has one element", () => {
    const singleElementArray = [1];

    const [firstHalf, secondHalf] = halveArray(singleElementArray);

    const expectedFirstHalf = [1];
    const expectedSecondHalf = [];

    expect(firstHalf).toEqual(expectedFirstHalf);
    expect(secondHalf).toEqual(expectedSecondHalf);
  });

  it("maintains the order of elements", () => {
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    const [firstHalf, secondHalf] = halveArray(array);

    const expectedFirstHalf = [1, 2, 3, 4, 5];
    const expectedSecondHalf = [6, 7, 8, 9];

    expect(firstHalf).toEqual(expectedFirstHalf);
    expect(secondHalf).toEqual(expectedSecondHalf);
  });
});
