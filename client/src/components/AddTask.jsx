import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddTask = () => {
  const [taskDetails, setTaskDetails] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'Medium', 
  });
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

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

    const taskData = {
      email: localStorage.getItem('email'),
      title: taskDetails.title,
      description: taskDetails.description,
      dueDate: taskDetails.dueDate,
      priority: taskDetails.priority,
    };

    try {
      const response = await fetch('http://localhost:5000/api/addtask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });

      const data = await response.json();
      setLoading(false);

      if (data.success) {
        alert('Task added successfully!');
        navigate('/'); 
      } else {
        alert('Error adding task');
      }
    } catch (error) {
      setLoading(false);
      console.error('Error:', error);
      alert('Failed to add task');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-lg p-4">
            <h2 className="text-center mb-4">Add a New Task</h2>
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
                  placeholder="Enter task title"
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
                  placeholder="Enter task description"
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
                  className={`btn btn-primary ${loading ? 'disabled' : ''}`}
                  disabled={loading}
                >
                  {loading ? 'Adding Task...' : 'Add Task'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTask;
