import defaultOnError from "./defaultOnError";

describe("defaultOnError", () => {
  it("should log the error to the console", () => {
    const mockError = new Error("test-error");

    console.error = jest.fn();

    defaultOnError(mockError);

    expect(console.error).toHaveBeenCalledWith(mockError);
  });
});
