import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Button from "./Button";

describe("Button", () => {
  const mockOnClick = jest.fn();

  const renderComponent = (floorNumber = 0, isDisabled = false) =>
    render(
      <Button
        floorNumber={floorNumber}
        onClick={mockOnClick}
        isDisabled={isDisabled}
      />
    );

  it("renders without crashing", () => {
    renderComponent();

    expect(screen).toBeDefined();
  });

  it("displays the correct floor number", () => {
    const floorNumber = 5;

    renderComponent(floorNumber);

    const button = screen.getByRole("button");

    expect(button).toHaveTextContent(floorNumber);
  });

  it("applies the disabled class when isDisabled is true", () => {
    renderComponent(0, true);

    const button = screen.getByRole("button");

    expect(button).toHaveClass("button--disabled");
  });

  it("does not apply disabled class when isDisabled is false", () => {
    renderComponent(0, false);

    const button = screen.getByRole("button");

    expect(button).not.toHaveClass("button--disabled");
  });

  it("has the correct aria-label", () => {
    const floorNumber = 5;

    renderComponent(floorNumber);

    const button = screen.getByRole("button");

    expect(button).toHaveAttribute(
      "aria-label",
      `Call lift to floor ${floorNumber}`
    );
  });

  it("calls onClick function when clicked", () => {
    renderComponent();

    const button = screen.getByRole("button");

    fireEvent.click(button);

    expect(mockOnClick).toHaveBeenCalled();
  });

  it("should match snapshot", () => {
    const { container } = renderComponent();

    expect(container).toMatchSnapshot();
  });
});
