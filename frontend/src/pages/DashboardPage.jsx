import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function DashboardPage() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingTasks, setLoadingTasks] = useState(true);

  const [taskForm, setTaskForm] = useState({
    title: "",
    description: "",
  });

  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    status: "pending",
  });

  const handleTaskChange = (e) => {
    setTaskForm({
      ...taskForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value,
    });
  };

  const fetchTasks = async () => {
    try {
      setLoadingTasks(true);
      const response = await API.get("/tasks/");
      setTasks(response.data);
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to load tasks");
    } finally {
      setLoadingTasks(false);
    }
  };

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        setLoadingUser(true);
        const response = await API.get("/users/me");
        setUser(response.data);
      } catch (err) {
        setError(err.response?.data?.detail || "Failed to load dashboard");
      } finally {
        setLoadingUser(false);
      }
    };

    fetchCurrentUser();
    fetchTasks();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      await API.post("/tasks/", taskForm);

      setTaskForm({
        title: "",
        description: "",
      });

      setMessage("Task created successfully.");
      fetchTasks();
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to create task");
    }
  };

  const handleDeleteTask = async (taskId) => {
    setError("");
    setMessage("");

    try {
      await API.delete(`/tasks/${taskId}`);
      setMessage("Task deleted successfully.");
      fetchTasks();
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to delete task");
    }
  };

  const startEditingTask = (task) => {
    setEditingTaskId(task.id);
    setEditForm({
      title: task.title,
      description: task.description || "",
      status: task.status,
    });
  };

  const cancelEditing = () => {
    setEditingTaskId(null);
    setEditForm({
      title: "",
      description: "",
      status: "pending",
    });
  };

  const handleUpdateTask = async (taskId) => {
    setError("");
    setMessage("");

    try {
      await API.put(`/tasks/${taskId}`, editForm);
      setEditingTaskId(null);
      setEditForm({
        title: "",
        description: "",
        status: "pending",
      });
      setMessage("Task updated successfully.");
      fetchTasks();
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to update task");
    }
  };

  const completedTasks = tasks.filter((task) => task.status === "completed").length;
  const pendingTasks = tasks.filter((task) => task.status === "pending").length;

  return (
    <div className="py-3">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        <div>
          <h2 className="fw-bold mb-1">Workspace</h2>
          <p className="text-muted mb-0">
            Manage your tasks, track progress, and stay organized.
          </p>
        </div>

        <button onClick={handleLogout} className="btn btn-outline-dark">
          Logout
        </button>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}
      {message && <div className="alert alert-success">{message}</div>}

      <div className="row g-4 mb-4">
        <div className="col-12 col-lg-8">
          <div className="card border-0 shadow-sm h-100 soft-card">
            <div className="card-body p-4">
              {loadingUser ? (
                <p className="text-muted mb-0">Loading user data...</p>
              ) : user ? (
                <>
                  <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
                    <div>
                      <h4 className="fw-bold mb-1">Welcome, {user.name}</h4>
                      <p className="text-muted mb-0">
                        Signed in as {user.email}
                      </p>
                    </div>
                    <span className="badge text-bg-dark px-3 py-2 text-uppercase">
                      {user.role}
                    </span>
                  </div>

                  <hr />

                  <div className="row g-3">
                    <div className="col-sm-4">
                      <div className="border rounded p-3 bg-light h-100 soft-panel">
                        <div className="text-muted small">User ID</div>
                        <div className="fw-semibold">{user.id}</div>
                      </div>
                    </div>

                    <div className="col-sm-4">
                      <div className="border rounded p-3 bg-light h-100 soft-panel">
                        <div className="text-muted small">Role</div>
                        <div className="fw-semibold text-capitalize">{user.role}</div>
                      </div>
                    </div>

                    <div className="col-sm-4">
                      <div className="border rounded p-3 bg-light h-100 soft-panel">
                        <div className="text-muted small">Account Email</div>
                        <div className="fw-semibold text-break">{user.email}</div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                !error && <p className="text-muted mb-0">User data not available.</p>
              )}
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-4">
              <h5 className="fw-bold mb-3">Task Summary</h5>

              <div className="d-grid gap-3">
                <div className="border rounded p-3 bg-light">
                  <div className="text-muted small">Total Tasks</div>
                  <div className="fs-4 fw-bold">{tasks.length}</div>
                </div>

                <div className="border rounded p-3 bg-light">
                  <div className="text-muted small">Pending</div>
                  <div className="fs-4 fw-bold">{pendingTasks}</div>
                </div>

                <div className="border rounded p-3 bg-light">
                  <div className="text-muted small">Completed</div>
                  <div className="fs-4 fw-bold">{completedTasks}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-12 col-xl-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              <h5 className="fw-bold mb-3">Create New Task</h5>
              <p className="text-muted small mb-4">
                Add a task with a clear title and helpful description.
              </p>

              <form onSubmit={handleCreateTask}>
                <div className="mb-3">
                  
                  <input
                    type="text"
                    name="title"
                    className="form-control"
                    value={taskForm.title}
                    onChange={handleTaskChange}
                    placeholder="Enter task title"
                  />
                </div>

                <div className="mb-3">
                  
                  <textarea
                    name="description"
                    className="form-control"
                    rows="4"
                    value={taskForm.description}
                    onChange={handleTaskChange}
                    placeholder="Enter task description"
                  />
                </div>

                <button type="submit" className="btn btn-dark w-100">
                  Create Task
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="col-12 col-xl-8">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <h5 className="fw-bold mb-1">Task List</h5>
                  <p className="text-muted small mb-0">
                    Review, update, and manage your work items.
                  </p>
                </div>
              </div>

              {loadingTasks ? (
                <p className="text-muted mb-0">Loading tasks...</p>
              ) : tasks.length === 0 ? (
                <div className="border rounded p-4 text-center bg-light">
                  <h6 className="fw-bold mb-2">No tasks yet</h6>
                  <p className="text-muted mb-0">
                    Create your first task using the form on the left.
                  </p>
                </div>
              ) : (
                <div className="d-grid gap-3">
                  {tasks.map((task) => (
                    <div key={task.id} className="border rounded p-3 bg-white task-card">
                      {editingTaskId === task.id ? (
                        <div>
                          <div className="mb-3">
                            <label className="form-label">Title</label>
                            <input
                              type="text"
                              name="title"
                              className="form-control"
                              value={editForm.title}
                              onChange={handleEditChange}
                              placeholder="Task title"
                            />
                          </div>

                          <div className="mb-3">
                            <label className="form-label">Description</label>
                            <textarea
                              name="description"
                              className="form-control"
                              rows="3"
                              value={editForm.description}
                              onChange={handleEditChange}
                              placeholder="Task description"
                            />
                          </div>

                          <div className="mb-3">
                            <label className="form-label">Status</label>
                            <select
                              name="status"
                              className="form-select"
                              value={editForm.status}
                              onChange={handleEditChange}
                            >
                              <option value="pending">Pending</option>
                              <option value="completed">Completed</option>
                            </select>
                          </div>

                          <div className="d-flex flex-wrap gap-2">
                            <button
                              type="button"
                              onClick={() => handleUpdateTask(task.id)}
                              className="btn btn-dark"
                            >
                              Save Changes
                            </button>
                            <button
                              type="button"
                              onClick={cancelEditing}
                              className="btn btn-outline-secondary"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="d-flex flex-column flex-md-row justify-content-between gap-3">
                          <div className="flex-grow-1">
                            <div className="d-flex align-items-center gap-2 mb-2 flex-wrap">
                              <h6 className="fw-bold mb-0">{task.title}</h6>
                              <span
                                className={`badge ${
                                  task.status === "completed"
                                    ? "text-bg-success"
                                    : "text-bg-warning"
                                }`}
                              >
                                {task.status}
                              </span>
                            </div>

                            <p className="text-muted mb-2">
                              {task.description || "No description provided."}
                            </p>

                            <small className="text-muted">
                              Task ID: {task.id}
                            </small>
                          </div>

                          <div className="d-flex flex-md-column gap-2">
                            <button
                              type="button"
                              onClick={() => startEditingTask(task)}
                              className="btn btn-outline-dark btn-sm"
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteTask(task.id)}
                              className="btn btn-outline-danger btn-sm"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;