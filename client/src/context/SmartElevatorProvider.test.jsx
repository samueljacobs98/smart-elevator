import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useContext } from "react";
import {
  SmartElevatorProvider,
  SmartElevatorContext,
} from "./SmartElevatorProvider";
import { getLiftStatus } from "../utils/api";

jest.mock("../utils/api", () => ({
  getLiftStatus: jest.fn(),
}));

const defaultValues = {
  showModal: false,
  liftStatus: null,
  floors: [],
  queueData: [],
  arrived: new Set(),
  modalData: { lift: null, toFloor: null },
};

describe("SmartElevatorProvider", () => {
  it("renders its children", () => {
    render(
      <SmartElevatorProvider>
        <div data-testid="child-element">Test Child</div>
      </SmartElevatorProvider>
    );

    const childElement = screen.getByTestId("child-element");

    expect(childElement).toBeInTheDocument();
  });

  it("provides default context values", () => {
    const TestComponent = () => {
      const context = useContext(SmartElevatorContext);

      return (
        <div>
          <div data-testid="context-showModal">
            {context.showModal.toString()}
          </div>
          <div data-testid="context-liftStatus">{context.liftStatus}</div>
          <div data-testid="context-floors">
            {JSON.stringify(context.floors)}
          </div>
          <div data-testid="context-queueData">
            {JSON.stringify(context.queueData)}
          </div>
          <div data-testid="context-arrived">
            {JSON.stringify(Array.from(context.arrived))}
          </div>
          <div data-testid="context-modalData">
            {JSON.stringify(context.modalData)}
          </div>
        </div>
      );
    };

    render(
      <SmartElevatorProvider>
        <TestComponent />
      </SmartElevatorProvider>
    );

    const showModalElement = screen.getByTestId("context-showModal");
    const liftStatusElement = screen.getByTestId("context-liftStatus");
    const floorElement = screen.getByTestId("context-floors");
    const queueDataElement = screen.getByTestId("context-queueData");
    const arrivedElement = screen.getByTestId("context-arrived");
    const modalDataElement = screen.getByTestId("context-modalData");

    expect(showModalElement.textContent).toBe(
      defaultValues.showModal.toString()
    );
    expect(liftStatusElement.textContent).toBe(defaultValues.liftStatus || "");
    expect(floorElement.textContent).toBe(JSON.stringify(defaultValues.floors));
    expect(queueDataElement.textContent).toBe(
      JSON.stringify(defaultValues.queueData)
    );
    expect(arrivedElement.textContent).toBe(
      JSON.stringify(Array.from(defaultValues.arrived))
    );
    expect(modalDataElement.textContent).toBe(
      JSON.stringify(defaultValues.modalData)
    );
  });

  it("updates the context values", () => {
    const TestComponent = () => {
      const context = useContext(SmartElevatorContext);

      return (
        <div>
          <div data-testid="showModal">{context.showModal.toString()}</div>
          <button onClick={() => context.setShowModal(true)}>
            Update showModal
          </button>
          <div data-testid="liftStatus">{context.liftStatus || ""}</div>
          <button onClick={() => context.setLiftStatus("some lift status")}>
            Update liftStatus
          </button>
          <div data-testid="floors">{context.floors.join(" ")}</div>
          <button onClick={() => context.setFloors(["floor 1", "floor 2"])}>
            Update floors
          </button>
          <div data-testid="queueData">{context.queueData.join(" ")}</div>
          <button onClick={() => context.setQueueData(["queue 1", "queue 2"])}>
            Update queueData
          </button>
          <div data-testid="arrived">
            {Array.from(context.arrived).join(" ")}
          </div>
          <button
            onClick={() => context.setArrived(new Set().add("A").add("B"))}
          >
            Update arrived
          </button>
          <div data-testid="modalData">{JSON.stringify(context.modalData)}</div>
          <button
            onClick={() =>
              context.setModalData({
                lift: "some lift",
                toFloor: "some floor",
              })
            }
          >
            Update modalData
          </button>
        </div>
      );
    };

    render(
      <SmartElevatorProvider>
        <TestComponent />
      </SmartElevatorProvider>
    );

    const updateShowModalButton = screen.getByText("Update showModal");
    const showModalElement = screen.getByTestId("showModal");
    const updateLiftStatusButton = screen.getByText("Update liftStatus");
    const liftStatusElement = screen.getByTestId("liftStatus");
    const updateFloorsButton = screen.getByText("Update floors");
    const floorsElement = screen.getByTestId("floors");
    const updateQueueDataButton = screen.getByText("Update queueData");
    const queueDataElement = screen.getByTestId("queueData");
    const updateArrivedButton = screen.getByText("Update arrived");
    const arrivedElement = screen.getByTestId("arrived");
    const modalDataElement = screen.getByTestId("modalData");
    const updateModalDataButton = screen.getByText("Update modalData");

    expect(showModalElement.textContent).toBe("false");
    expect(liftStatusElement.textContent).toBe("");
    expect(floorsElement.textContent).toBe("");
    expect(queueDataElement.textContent).toBe("");
    expect(arrivedElement.textContent).toBe("");
    expect(modalDataElement.textContent).toBe('{"lift":null,"toFloor":null}');

    fireEvent.click(updateShowModalButton);
    fireEvent.click(updateLiftStatusButton);
    fireEvent.click(updateFloorsButton);
    fireEvent.click(updateQueueDataButton);
    fireEvent.click(updateArrivedButton);
    fireEvent.click(updateModalDataButton);

    expect(showModalElement.textContent).toBe("true");
    expect(liftStatusElement.textContent).toBe("some lift status");
    expect(floorsElement.textContent).toBe("floor 1 floor 2");
    expect(queueDataElement.textContent).toBe("queue 1 queue 2");
    expect(arrivedElement.textContent).toBe("A B");
    expect(modalDataElement.textContent).toBe(
      '{"lift":"some lift","toFloor":"some floor"}'
    );
  });

  it("updates liftStatus using getLiftStatusCallback", async () => {
    getLiftStatus.mockResolvedValue("updated lift status");

    const TestComponent = () => {
      const context = useContext(SmartElevatorContext);

      return (
        <div>
          <div data-testid="liftStatus">{context.liftStatus || ""}</div>
          <button onClick={context.getLiftStatusCallback}>
            Get lift status
          </button>
        </div>
      );
    };

    render(
      <SmartElevatorProvider>
        <TestComponent />
      </SmartElevatorProvider>
    );

    const liftStatusElement = screen.getByTestId("liftStatus");
    const getLiftStatusButton = screen.getByText("Get lift status");

    expect(liftStatusElement.textContent).toBe("");

    fireEvent.click(getLiftStatusButton);

    await waitFor(() => {
      expect(liftStatusElement.textContent).toBe("updated lift status");
    });
  });
});
