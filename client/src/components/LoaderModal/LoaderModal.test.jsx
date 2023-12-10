import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import loader from "../../assets/gifs/loader.gif";
import LoaderModal from "./LoaderModal";

describe("LoaderModal", () => {
  const renderComponent = () => render(<LoaderModal />);

  it("renders without crashing", () => {
    renderComponent();

    expect(screen).toBeDefined();
  });

  it("renders the loader image", () => {
    renderComponent();

    const loaderImage = screen.getByRole("img");

    expect(loaderImage).toHaveAttribute("src", loader);
  });

  it("renders the loader image with an alt text", () => {
    renderComponent();

    const loaderImage = screen.getByRole("img");

    expect(loaderImage).toHaveAttribute("alt", "Loading animation");
  });

  it("should match snapshot", () => {
    const { container } = renderComponent();

    expect(container).toMatchSnapshot();
  });
});
