import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

function LoginPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    try {
      const response = await API.post("/users/login", formData);

      localStorage.setItem("token", response.data.access_token);
      setMessage("Login successful");

      setFormData({
        email: "",
        password: "",
      });

      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.detail || "Login failed");
    }
  };

  return (
    <div className="row justify-content-center py-4">
      <div className="col-12 col-md-8 col-lg-5">
        <div className="card border-0 shadow-sm auth-card soft-card">
          <div className="card-body p-4 p-md-5">
            <div className="text-center mb-4">
              <h2 className="fw-bold mb-2">Welcome back</h2>
              <p className="text-muted mb-0">
                Sign in to access your workspace and manage tasks.
              </p>
            </div>

            {message && <div className="alert alert-success">{message}</div>}
            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                />
              </div>

              <div className="mb-3">
                
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                />
              </div>

              <button type="submit" className="btn btn-dark w-100">
                Sign In
              </button>
            </form>

            <p className="text-center text-muted mt-4 mb-0">
              Don’t have an account?{" "}
              <Link to="/register" className="text-decoration-none">
                Create one
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;