import { describe, it, expect, vi } from "vitest";
import { createRoot } from "react-dom/client";
// import App from "../App";

// Mock react-dom/client
vi.mock("react-dom/client", () => ({
  createRoot: vi.fn(() => ({
    render: vi.fn(),
  })),
}));

// Mock App component
vi.mock("./App", () => ({
  default: () => <div>Mock App</div>,
}));

// Update the mock for main.tsx to actually execute the code
vi.mock("../main.tsx", async () => {
  const actual = await vi.importActual("../main.tsx");
  return {
    ...actual,
  };
});

describe("main", () => {
  it("renders App component into root element", async () => {
    // Create a fake root element
    const root = document.createElement("div");
    root.id = "root";
    document.body.appendChild(root);

    // Reset the mock before test
    vi.clearAllMocks();

    // Import and execute main
    await import("../main.tsx");

    // Verify createRoot was called with root element
    expect(createRoot).toHaveBeenCalledWith(root);

    // Cleanup
    document.body.removeChild(root);
  }, 10000);
});
