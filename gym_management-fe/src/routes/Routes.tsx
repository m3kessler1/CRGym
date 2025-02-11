import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import RegisterPage from "../pages/registerPage.tsx";
import LoginPage from "../pages/loginPage.tsx";
import HomePage from "../pages/homePage.tsx";
import MyAccount from "../pages/accountMainPage.tsx";
import Workouts from "../pages/workoutPage.tsx";
import Coaches from "../pages/coachesPage.tsx";
import MainPage from "../pages/mainPage.tsx";
import ProtectedRoute from "./ProtectedRoute.tsx";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import BookCoachPage from "../pages/bookCoachPage.tsx";

function AppRoutes(): JSX.Element {
  return (
    <Router>
      <AppRoutesContent />
    </Router>
  );
}

function AppRoutesContent(): JSX.Element {
  const isAuthenticated = !!document.cookie
    .split("; ")
    .find((row) => row.startsWith("authToken"));
  const userData = useSelector((state: RootState) => state.user);
  const location = useLocation();
  const getDefaultRoute = () => {
    if (userData.isCoach && isAuthenticated) {
      return "/workouts";
    }
    return "/home";
  };
  console.log("userData", userData.isCoach, isAuthenticated, getDefaultRoute());

  return (
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
        <Route path="/" element={<Navigate to={getDefaultRoute()} replace />} />
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
              <BookCoachPage />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
