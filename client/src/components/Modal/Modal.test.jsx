import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { halveArray } from "../../utils/helpers";
import Modal from "./Modal";

jest.mock("../../utils/helpers", () => ({
  halveArray: jest.fn(),
}));

const lift = "A";
const to = 5;
const lifts = ["A", "B", "C"];

const mockHideModal = jest.fn();

beforeEach(() => {
  jest.useFakeTimers();
  jest.clearAllMocks();
  halveArray.mockReturnValue([["A", "B"], ["C"]]);
});

describe("Modal", () => {
  const renderComponent = (showModal = false) =>
    render(
      <Modal
        lift={lift}
        to={to}
        showModal={showModal}
        hideModal={mockHideModal}
        lifts={lifts}
      />
    );

  it("renders without crashing", () => {
    renderComponent();

    expect(screen).toBeDefined();
  });

  it("dynamically displays the lift number in the title", () => {
    renderComponent(true);

    const title = screen.getByText(`The next lift to floor ${to}:`);

    expect(title).toBeInTheDocument();
  });

  it("renders the correct lift number", () => {
    renderComponent(true);

    const text = screen.getByText(lift);

    expect(text).toBeInTheDocument();
    expect(text).toHaveClass("modal__content__main__text");
  });

  it("calls hide modal after 4 seconds", () => {
    renderComponent(true);

    act(() => {
      jest.advanceTimersByTime(4000);
    });

    expect(mockHideModal).toHaveBeenCalled();
  });

  it("displays the arrows with the correct states", () => {
    renderComponent(true);

    const leftArrow = screen.getByAltText("Left arrow");
    const rightArrow = screen.getByAltText("Right arrow");

    expect(leftArrow).toHaveClass("arrow arrow--left arrow--active");
    expect(rightArrow).toHaveClass("arrow");
    expect(rightArrow).not.toHaveClass("arrow--left arrow--active");
  });

  it("should match snapshot", () => {
    const { container } = renderComponent(true);

    expect(container).toMatchSnapshot();
  });
});
