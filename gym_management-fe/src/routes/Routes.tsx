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

function AppRoutes(): JSX.Element {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<MainPage />}>
          <Route index element={<Navigate to="/home" />} />
          <Route path="home" element={<HomePage />} />
          <Route path="my-account" element={<MyAccount />} />
          <Route path="workouts" element={<Workouts />} />
          <Route path="coaches" element={<Coaches />} />
          <Route path="book-coach" element={<BookCoach />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default AppRoutes;
