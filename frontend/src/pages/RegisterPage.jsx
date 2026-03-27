import { useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
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
      const response = await API.post("/users/register", formData);
      setMessage(`Account created successfully for ${response.data.email}`);

      setFormData({
        name: "",
        email: "",
        password: "",
      });
    } catch (err) {
      setError(err.response?.data?.detail || "Registration failed");
    }
  };

  return (
    <div className="row justify-content-center py-4">
      <div className="col-12 col-md-8 col-lg-5">
        <div className="card border-0 shadow-sm auth-card soft-card">
          <div className="card-body p-4 p-md-5">
            <div className="text-center mb-4">
              <h2 className="fw-bold mb-2">Create your account</h2>
              <p className="text-muted mb-0">
                Start organizing your work securely with TaskFlow.
              </p>
            </div>

            {message && <div className="alert alert-success">{message}</div>}
            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                />
              </div>

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
                  placeholder="Create a password"
                />
              </div>

              <button type="submit" className="btn btn-dark w-100">
                Create Account
              </button>
            </form>

            <p className="text-center text-muted mt-4 mb-0">
              Already have an account?{" "}
              <Link to="/login" className="text-decoration-none">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;