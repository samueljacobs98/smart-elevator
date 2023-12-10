import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import arrowSvg from "../../assets/svgs/arrow.svg";
import Arrow from "./Arrow";

describe("Arrow", () => {
  const renderComponent = (isLeft = false, isActive = false) =>
    render(<Arrow isLeft={isLeft} isActive={isActive} />);

  it("renders without crashing", () => {
    renderComponent();

    expect(screen).toBeDefined();
  });

  it("applies correct class names for right and inactive state", () => {
    renderComponent(false, false);

    const arrow = screen.getByRole("img");

    expect(arrow).toHaveClass("arrow");
    expect(arrow).not.toHaveClass("arrow--left arrow--active");
  });

  it("applies correct class names for left and active state", () => {
    renderComponent(true, true);

    const arrow = screen.getByRole("img");

    expect(arrow).toHaveClass("arrow arrow--left arrow--active");
  });

  it("has the correct image source", () => {
    renderComponent();

    const arrow = screen.getByRole("img");

    expect(arrow).toHaveAttribute("src", arrowSvg);
  });

  it("has the correct alt text for a right arrow", () => {
    renderComponent();

    const arrow = screen.getByRole("img");

    expect(arrow).toHaveAttribute("alt", "Right arrow");
  });

  it("has the correct alt text for a left arrow", () => {
    renderComponent(true, true);

    const arrow = screen.getByRole("img");

    expect(arrow).toHaveAttribute("alt", "Left arrow");
  });

  it("should match snapshot", () => {
    const { container } = renderComponent();

    expect(container).toMatchSnapshot();
  });
});
