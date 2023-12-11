import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import DestinationTrackerPanel from "./DestinationTrackerPanel";
import { SmartElevatorContext } from "../../context/SmartElevatorProvider";
import Config from "../../config";

jest.mock("../../config", () => ({
  userFloor: 2,
}));

jest.mock("../DestinationTrackerItem/DestinationTrackerItem", () => (props) => (
  <div data-testid="destination-tracker-item" {...props}>
    {props.floor}
  </div>
));

const mockQueueData = {
  1: ["lift 1"],
  2: ["lift 2"],
  3: ["lift 3"],
};
const mockArrived = new Set(["lift 1"]);

const renderComponent = () =>
  render(
    <SmartElevatorContext.Provider
      value={{ queueData: mockQueueData, arrived: mockArrived }}
    >
      <DestinationTrackerPanel />
    </SmartElevatorContext.Provider>
  );

describe("DestinationTrackerPanel", () => {
  it("renders without crashing", () => {
    renderComponent();

    expect(screen).toBeDefined();
  });

  it("renders a DestinationTrackerItem for each floor apart from the userFloor", () => {
    renderComponent();

    const trackerItems = screen.getAllByTestId("destination-tracker-item");

    expect(trackerItems.length).toBe(2);

    trackerItems.forEach((item) => {
      expect(item).not.toHaveTextContent(Config.userFloor);
    });
  });

  it("should match snapshot", () => {
    const { container } = renderComponent();

    expect(container).toMatchSnapshot();
  });
});
