import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <div className="bg-light min-vh-100 d-flex flex-column">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
          <div className="container">
            <Link className="navbar-brand fw-bold" to="/">
              TaskFlow
            </Link>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#mainNavbar"
              aria-controls="mainNavbar"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="mainNavbar">
              <div className="navbar-nav ms-auto">
                <Link className="nav-link" to="/">
                  Home
                </Link>
                <Link className="nav-link" to="/register">
                  Sign Up
                </Link>
                <Link className="nav-link" to="/login">
                  Login
                </Link>
                <Link className="nav-link" to="/dashboard">
                  Workspace
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <main className="py-4 flex-grow-1">
          <div className="container">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </main>

        <footer className="border-top bg-white py-3">
          <div className="container text-center app-footer">
            TaskFlow • Secure task management workspace
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;