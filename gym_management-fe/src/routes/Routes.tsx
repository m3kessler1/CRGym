import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import RegisterPage from "../pages/registerPage.tsx";
import LoginPage from "../pages/loginPage.tsx";
import HomePage from "../pages/homePage.tsx";
import MyAccount from "../pages/accountMainPage.tsx";
import Workouts from "../pages/workoutPage.tsx";
import Coaches from "../pages/coachesPage.tsx";
import BookCoach from "../pages/bookCoachPage.tsx";
import MainPage from "../pages/mainPage.tsx";
import ProtectedRoute from "./ProtectedRoute.tsx";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

function AppRoutes(): JSX.Element {
  const isAuthenticated = !!document.cookie
    .split("; ")
    .find((row) => row.startsWith("authToken"));
  const userData = useSelector((state: RootState) => state.user);
  const getDefaultRoute = () => {
    if (userData.isCoach && isAuthenticated) {
      return "/workouts";
    }
    return "/home";
  };
  console.log("userData", userData.isCoach, isAuthenticated, getDefaultRoute());

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to={getDefaultRoute()} replace />
            ) : (
              <LoginPage />
            )
          }
        />
        <Route
          path="/register"
          element={
            isAuthenticated ? (
              <Navigate to={getDefaultRoute()} replace />
            ) : (
              <RegisterPage />
            )
          }
        />
        <Route element={<MainPage />}>
          <Route
            path="/"
            element={<Navigate to={getDefaultRoute()} replace />}
          />
          <Route
            path="/home"
            element={
              userData.isCoach && isAuthenticated ? (
                <Navigate to="/workouts" replace />
              ) : (
                <HomePage />
              )
            }
          />
          <Route path="/coaches" element={<Coaches />} />

          <Route
            path="/my-account"
            element={
              <ProtectedRoute>
                <MyAccount />
              </ProtectedRoute>
            }
          />
          <Route
            path="/workouts"
            element={
              <ProtectedRoute>
                <Workouts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/book-coach"
            element={
              <ProtectedRoute>
                <BookCoach />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default AppRoutes;
