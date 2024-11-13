import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const EditTask = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { task } = location.state; // Get the task data passed from the previous page

  const [taskDetails, setTaskDetails] = useState({
    title: task.title,
    description: task.description,
    dueDate: new Date(task.dueDate).toISOString().split('T')[0], // Format date to YYYY-MM-DD
    priority: task.priority || 'Medium', // Default to Medium if no priority is set
  });
  const [loading, setLoading] = useState(false); // Track loading state

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskDetails({
      ...taskDetails,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const updatedTask = {
      ...taskDetails,
      email: task.email,
      _id: task._id,
    };

    try {

      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/updatetask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updatedTask),
      });

      const data = await response.json();
      setLoading(false);

      if (data.success) {
        alert('Task updated successfully!');
        navigate('/'); // Redirect to the tasks page
      } else {
        alert('Error updating task');
      }
    } catch (error) {
      setLoading(false);
      console.error('Error:', error);
      alert('Failed to update task');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-lg p-4">
            <h2 className="text-center mb-4">Edit Task</h2>
            <form onSubmit={handleSubmit}>
              
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Task Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  value={taskDetails.title}
                  onChange={handleInputChange}
                  required
                />
              </div>

              
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Task Description
                </label>
                <textarea
                  className="form-control"
                  id="description"
                  name="description"
                  value={taskDetails.description}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>

              
              <div className="mb-3">
                <label htmlFor="dueDate" className="form-label">
                  Due Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="dueDate"
                  name="dueDate"
                  value={taskDetails.dueDate}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="priority" className="form-label">
                  Priority
                </label>
                <select
                  className="form-control"
                  id="priority"
                  name="priority"
                  value={taskDetails.priority}
                  onChange={handleInputChange}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>

              <div className="d-grid">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? 'Updating Task...' : 'Update Task'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTask;
