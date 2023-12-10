import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Layout from "./Layout";

describe("Layout", () => {
  const renderComponent = (children) => render(<Layout>{children}</Layout>);

  it("renders without crashing", () => {
    renderComponent();
    expect(screen).toBeDefined();
  });

  it("renders child content correctly", () => {
    const content = "Content";

    renderComponent(content);

    const childElement = screen.getByText(content);
    expect(childElement).toBeInTheDocument();
  });

  it("renders multiple-element child content correctly", () => {
    const content = ["Content 1", "Content 2"];
    const children = content.map((text) => <div key={text}>{text}</div>);

    renderComponent(children);

    content.forEach((text) => {
      const childElement = screen.getByText(text);
      expect(childElement).toBeInTheDocument();
    });
  });

  it("should match snapshot", () => {
    const { container } = renderComponent();

    expect(container).toMatchSnapshot();
  });
});
