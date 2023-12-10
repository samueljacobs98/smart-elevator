import { render, screen } from "@testing-library/react";
import FloorDisplay from "./FloorDisplay";
import "@testing-library/jest-dom";

describe("FloorDisplay", () => {
  const renderComponent = (floor = 1) => render(<FloorDisplay floor={floor} />);

  it("renders without crashing", () => {
    renderComponent();

    expect(screen).toBeDefined();
  });

  it("render correctly with the correct floor number", () => {
    const floorNumber = 5;

    renderComponent(floorNumber);

    const floorDisplay = screen.getByRole("heading");
    const floorDisplayNumber = screen.getByText(`Floor ${floorNumber}`);

    expect(floorDisplay).toBeInTheDocument();
    expect(floorDisplayNumber).toBeInTheDocument();
  });

  it("should match snapshot", () => {
    const { container } = renderComponent();

    expect(container).toMatchSnapshot();
  });
});
