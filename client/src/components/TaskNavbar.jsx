import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const TaskNavbar = () => {
  const navigate = useNavigate();

  const logouthandle = (e) => {
    e.preventDefault();
    localStorage.clear();
    navigate("/home");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm" style={{ padding: '10px 20px' }}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <h2 style={{ color: '#007bff', fontWeight: 'bold' }}>TaskTide</h2>
        </Link>
        
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
          <div className="d-flex align-items-center">
            {localStorage.getItem("token") ? (
              <>
                <Link to="/" className="nav-link">
                  <button className="btn btn-outline-primary me-2">All Tasks</button>
                </Link>
                <Link to="/upcoming-tasks" className="nav-link">
                  <button className="btn btn-outline-primary me-2">Upcoming Tasks</button>
                </Link>
                <Link to="/overdue-tasks" className="nav-link">
                  <button className="btn btn-outline-primary me-2">Overdue Tasks</button>
                </Link>
                <Link to="/completed-tasks" className="nav-link">
                  <button className="btn btn-outline-primary me-2">Completed Tasks</button>
                </Link>
                <button className="btn btn-danger" onClick={logouthandle}>Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-link">
                  <button className="btn btn-primary me-2">Login</button>
                </Link>
                <Link to="/createuser" className="nav-link">
                  <button className="btn btn-secondary">Sign Up</button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TaskNavbar;
