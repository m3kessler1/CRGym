import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import CoachesCard from "../../components/CoachesCard";

// Wrapper component with router
const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("CoachesCard", () => {
  it("renders basic card information", () => {
    renderWithRouter(<CoachesCard />);

    expect(screen.getByText("Aditya Singh")).toBeInTheDocument();
    expect(
      screen.getByText("Certified personal yoga trainer")
    ).toBeInTheDocument();
    expect(screen.getByText("4.6")).toBeInTheDocument();
    expect(screen.getByText("Book Workout")).toBeInTheDocument();
  });

  it("navigates to booking page when Book Workout is clicked", () => {
    renderWithRouter(<CoachesCard />);

    const bookButton = screen.getByText("Book Workout");
    fireEvent.click(bookButton);

    expect(window.location.pathname).toBe("/book-coach");
  });

  it("shows Repeat Previous Workout button when booking prop is true", () => {
    renderWithRouter(<CoachesCard booking={true} />);

    expect(screen.getByText("Repeat Previous Workout")).toBeInTheDocument();
  });

  it("doesn't show Repeat Previous Workout button when booking prop is false", () => {
    renderWithRouter(<CoachesCard booking={false} />);

    expect(
      screen.queryByText("Repeat Previous Workout")
    ).not.toBeInTheDocument();
  });

  it("applies custom dimensions when provided", () => {
    const customHeight = "500px";
    const customWidth = "300px";
    const customMediaHeight = "200px";

    renderWithRouter(
      <CoachesCard
        cardHeight={customHeight}
        cardWidth={customWidth}
        mediaHeight={customMediaHeight}
      />
    );

    const card = screen.getByRole("article");
    expect(card).toHaveStyle({ height: customHeight, width: customWidth });

    const media = screen.getByRole("img");
    expect(media).toHaveStyle({ height: customMediaHeight });
  });
});
