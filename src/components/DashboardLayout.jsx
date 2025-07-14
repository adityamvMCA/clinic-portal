import { useLocation, useNavigate } from "react-router-dom";

const DashboardLayout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const userEmail = location?.state?.userEmail || "Unknown";

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold">Appointment Calendar</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm">Logged in as: <strong>{userEmail}</strong></span>
          <button
            onClick={handleLogout}
            className="bg-blue-800 px-3 py-1 rounded hover:bg-blue-900 text-sm"
          >
            Logout
          </button>
        </div>
      </header>
      <main className="flex-1 p-4 bg-gray-50 dark:bg-gray-900 dark:text-white transition-colors">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
