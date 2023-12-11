import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ButtonPanel from "./ButtonPanel";
import { SmartElevatorContext } from "../../context/SmartElevatorProvider";
import Config from "../../config";

jest.mock("../../config", () => ({
  userFloor: 2,
}));

jest.mock("../Button/Button", () => (props) => (
  <button data-testid="elevator-button" {...props}>
    {props.floorNumber}
  </button>
));

const mockFloors = [1, 2, 3];
const mockShowModal = false;

const renderComponent = () =>
  render(
    <SmartElevatorContext.Provider
      value={{ floors: mockFloors, showModal: mockShowModal }}
    >
      <ButtonPanel />
    </SmartElevatorContext.Provider>
  );

describe("ButtonPanel", () => {
  it("renders without crashing", () => {
    renderComponent();

    expect(screen).toBeDefined();
  });

  it("renders the correct number of buttons, excluding the user's floor", () => {
    renderComponent();

    const buttons = screen.getAllByTestId("elevator-button");

    expect(buttons.length).toBe(mockFloors.length - 1);
  });

  it("does not render a button for the user's current floor", () => {
    renderComponent();

    const userFloorButton = screen.queryByText(Config.userFloor);

    expect(userFloorButton).toBeNull();
  });
});
