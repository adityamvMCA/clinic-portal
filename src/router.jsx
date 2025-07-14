import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "../src/components/LoginForm";
import CalendarPage from "../src/pages/CalendarPage";
import DashboardLayout from "./components/DashboardLayout";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginForm />} />
        <Route
          path="/calendar"
          element={
            <DashboardLayout>
              <CalendarPage />
            </DashboardLayout>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;
