import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import DestinationTrackerItem from "./DestinationTrackerItem";

const floor = 5;
const lifts = ["A", "B", "C"];
const arrived = new Set(["A", "C"]);

describe("DestinationTrackerItem", () => {
  const renderComponent = () =>
    render(
      <DestinationTrackerItem floor={floor} lifts={lifts} arrived={arrived} />
    );

  it("renders without crashing", () => {
    renderComponent();

    expect(screen).toBeDefined();
  });

  it("displays the correct floor number", () => {
    renderComponent();

    const floorNumber = screen.getByText(floor);

    expect(floorNumber).toBeInTheDocument();
  });

  it("renders the correct number of lifts", () => {
    renderComponent();

    lifts.forEach((lift) => {
      const liftElement = screen.getByText(lift);

      expect(liftElement).toBeInTheDocument();
    });
  });

  it("applies the arrived modifier to the className of the arrived lifts", () => {
    renderComponent();

    lifts.forEach((lift) => {
      const liftElement = screen.getByText(lift);

      let expectedClassName = "item__box__lift";

      if (arrived.has(lift)) {
        expectedClassName += " item__box__lift--arrived";
      }

      expect(liftElement).toHaveClass(expectedClassName);
    });
  });

  it("should match snapshot", () => {
    const { container } = renderComponent();

    expect(container).toMatchSnapshot();
  });
});
