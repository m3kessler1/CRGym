import { render, screen } from "@testing-library/react";
import AlertComp from "../../components/Alert";

describe("AlertComp", () => {
  it("renders the message correctly", () => {
    const testMessage = "Test alert message";
    render(<AlertComp message={testMessage} />);

    expect(screen.getByText(testMessage)).toBeInTheDocument();
  });

  it("applies correct styling", () => {
    render(<AlertComp message="Test message" />);

    const alertElement = screen.getByRole("alert");
    expect(alertElement).toHaveStyle({ backgroundColor: "primary.main" });
  });
});
