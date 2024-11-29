import { render, screen } from "@testing-library/react";
import App from "../App";
import React from "react";
import { vi } from "vitest";

// Mock the child components
vi.mock("./routes/Routes.tsx", () => ({
  __esModule: true,
  default: () => <div data-testid="mock-routes">Routes Component</div>,
}));

vi.mock("./context/ThemeContextProvider.tsx", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="mock-theme-provider">{children}</div>
  ),
}));

describe("App Component", () => {
  it("renders without crashing", () => {
    render(<App />);
    const appBar = screen.getByRole("banner");
    expect(appBar).toBeInTheDocument();
  });
});
