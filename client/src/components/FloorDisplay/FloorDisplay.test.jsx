import { render, screen } from "@testing-library/react";
import FloorDisplay from "./FloorDisplay";
import "@testing-library/jest-dom";
import Config from "../../config";

jest.mock("../../config", () => ({
  userFloor: 5,
}));

describe("FloorDisplay", () => {
  const renderComponent = () => render(<FloorDisplay />);

  it("renders without crashing", () => {
    renderComponent();

    expect(screen).toBeDefined();
  });

  it("renders correctly with the correct floor number", () => {
    renderComponent();

    const floorDisplay = screen.getByRole("heading");
    const floorDisplayNumber = screen.getByText(`Floor ${Config.userFloor}`);

    expect(floorDisplay).toBeInTheDocument();
    expect(floorDisplayNumber).toBeInTheDocument();
  });

  it("should match snapshot", () => {
    const { container } = renderComponent();

    expect(container).toMatchSnapshot();
  });
});
