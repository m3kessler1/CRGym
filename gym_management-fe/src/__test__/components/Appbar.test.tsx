import {
  render,
  screen,
  fireEvent,
  act,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { ThemeProvider, createTheme } from "@mui/material";
import CustomAppBar from "../../components/Appbar";
import { BrowserRouter } from "react-router-dom";
import ThemeContextProvider from "../../context/ThemeContextProvider";

// Create a theme for testing
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
  },
});

// Wrapper component with all required providers
const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <ThemeContextProvider>
        <ThemeProvider theme={theme}>{component}</ThemeProvider>
      </ThemeContextProvider>
    </BrowserRouter>
  );
};

describe("CustomAppBar", () => {
  const mockLogo = "test-logo.png";

  // Test tab navigation
  it("handles tab changes and navigation", () => {
    renderWithProviders(<CustomAppBar logo={mockLogo} />);

    // Click Workouts tab
    fireEvent.click(screen.getByText("Workouts"));
    expect(window.location.pathname).toBe("/workouts");

    // Click Coaches tab
    fireEvent.click(screen.getByText("Coaches"));
    expect(window.location.pathname).toBe("/coaches");

    // Click Home tab
    fireEvent.click(screen.getByText("Home"));
    expect(window.location.pathname).toBe("/home");
  });

  // Test theme toggle
  it("toggles theme mode", () => {
    renderWithProviders(<CustomAppBar logo={mockLogo} />);

    // Find theme toggle button
    const themeToggle = screen.getByTestId("theme-toggle");

    // The initial icon should be Brightness4Icon (dark mode)
    expect(screen.getByTestId("Brightness4Icon")).toBeInTheDocument();

    // Click to switch to light mode
    fireEvent.click(themeToggle);
    expect(screen.getByTestId("Brightness7Icon")).toBeInTheDocument();

    // Toggle again to dark mode
    fireEvent.click(themeToggle);
    expect(screen.getByTestId("Brightness4Icon")).toBeInTheDocument();
  });

  // Test logo rendering
  it("renders logo with correct properties", () => {
    renderWithProviders(<CustomAppBar logo={mockLogo} />);

    const logo = screen.getByAltText("Logo") as HTMLImageElement;
    expect(logo).toBeInTheDocument();
    expect(logo.src).toContain(mockLogo);
    expect(logo.style.height).toBe("2rem");
  });

  it("opens and closes profile menu", async () => {
    renderWithProviders(<CustomAppBar logo={mockLogo} />);

    // Open menu
    const profileButton = screen.getByTestId("profile-button");
    fireEvent.click(profileButton);

    // Verify menu is open
    expect(screen.getByRole("menu")).toBeInTheDocument();

    // Click outside to close menu (clicking on backdrop)
    const backdrop = screen.getByRole("presentation").firstChild as HTMLElement;
    fireEvent.click(backdrop);

    // Verify menu is closed
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });
});
