import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="py-4">
      <div className="row align-items-center g-4">
        <div className="col-lg-6">
          <span className="badge bg-dark-subtle text-dark mb-3">
            Modern Task Management Platform
          </span>

          <h1 className="display-5 fw-bold mb-3">
            Organize work, track progress, and stay focused.
          </h1>

          <p className="lead text-muted mb-4">
            TaskFlow helps individuals and teams manage daily work with secure
            authentication, role-based access, and a clean workspace for task
            planning and execution.
          </p>

          <div className="d-flex flex-wrap gap-2">
            <Link to="/register" className="btn btn-dark btn-lg">
              Get Started
            </Link>
            <Link to="/login" className="btn btn-outline-dark btn-lg">
              Sign In
            </Link>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              <h5 className="fw-bold mb-3">Why teams use TaskFlow</h5>

              <div className="row g-3">
                <div className="col-sm-6">
                  <div className="border rounded p-3 h-100 bg-light">
                    <h6 className="fw-semibold">Secure Access</h6>
                    <p className="text-muted mb-0 small">
                      JWT-based authentication and protected routes for secure
                      user sessions.
                    </p>
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="border rounded p-3 h-100 bg-light">
                    <h6 className="fw-semibold">Role-Based Control</h6>
                    <p className="text-muted mb-0 small">
                      Admin and user access levels for better permission
                      management.
                    </p>
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="border rounded p-3 h-100 bg-light">
                    <h6 className="fw-semibold">Task Tracking</h6>
                    <p className="text-muted mb-0 small">
                      Create, update, complete, and manage work in one place.
                    </p>
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="border rounded p-3 h-100 bg-light">
                    <h6 className="fw-semibold">Responsive Experience</h6>
                    <p className="text-muted mb-0 small">
                      Works cleanly across desktop and smaller screens.
                    </p>
                  </div>
                </div>
              </div>

              <hr className="my-4" />

              <div className="d-flex justify-content-between flex-wrap gap-3">
                <div>
                  <div className="fw-bold fs-4">FastAPI</div>
                  <div className="text-muted small">Backend API</div>
                </div>
                <div>
                  <div className="fw-bold fs-4">React</div>
                  <div className="text-muted small">Frontend UI</div>
                </div>
                <div>
                  <div className="fw-bold fs-4">MySQL</div>
                  <div className="text-muted small">Persistent storage</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4 mt-4">
        <div className="col-md-4">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body">
              <h5 className="fw-bold">Plan clearly</h5>
              <p className="text-muted mb-0">
                Capture tasks with titles, descriptions, and progress status so
                nothing gets lost.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body">
              <h5 className="fw-bold">Work securely</h5>
              <p className="text-muted mb-0">
                Keep access protected with authentication, authorization, and
                role-aware workflows.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body">
              <h5 className="fw-bold">Deliver faster</h5>
              <p className="text-muted mb-0">
                Manage day-to-day execution with a simple interface designed for
                speed and clarity.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;