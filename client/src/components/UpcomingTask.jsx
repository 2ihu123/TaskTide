import React, { useEffect, useState } from 'react';
import TaskNavbar from './TaskNavbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const UpcomingTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [sortOption, setSortOption] = useState('priority');
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    setTasks((prevTasks) => sortTasks([...prevTasks]));
  }, [sortOption, searchQuery, priorityFilter]);

  const fetchTasks = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:5000/api/gettask/upcoming', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`, },
      body: JSON.stringify({ email: localStorage.getItem('email') }),
    });
    const data = await response.json();
    const tasksArray = Object.values(data.tasks);
    setTasks(sortTasks(tasksArray));
  };

  const sortTasks = (tasks) => {
    const filteredTasks = tasks.filter((task) => {
      const matchesSearchQuery =
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPriorityFilter =
        priorityFilter === '' || task.priority === priorityFilter;
      return matchesSearchQuery && matchesPriorityFilter;
    });

    // Sorting tasks based on the selected option (priority or due date)
    if (sortOption === 'priority') {
      const priorityOrder = { High: 1, Medium: 2, Low: 3 };
      return filteredTasks.sort((a, b) => (priorityOrder[a.priority] || 3) - (priorityOrder[b.priority] || 3));
    } else if (sortOption === 'dueDate') {
      return filteredTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    }
    return filteredTasks;
  };

  const handleSortChange = (e) => setSortOption(e.target.value);

  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  const handlePriorityChange = (e) => setPriorityFilter(e.target.value);

  const handleEditTaskClick = (task) => navigate('/edittask', { state: { task } });

  const handleCompleteTaskClick = async (taskId) => {
    try {
        const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/completetask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' , 'Authorization': `Bearer ${token}`,},

        body: JSON.stringify({ taskId }),
      });
      const data = await response.json();
      if (data.success) {
        setTasks((prevTasks) => prevTasks.map(task => task._id === taskId ? { ...task, completed: true } : task));
        alert('Task marked as completed!');
        window.location.reload();
      } else {
        alert('Failed to mark task as completed.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while completing the task.');
    }
  };

  const handleDeleteTaskClick = async (taskId) => {
    const confirmation = window.confirm('Are you sure you want to delete this task?');
    if (confirmation) {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/deletetask', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`, },
          body: JSON.stringify({ taskId }),
        });
        const data = await response.json();
        if (data.success) {
          setTasks((prevTasks) => prevTasks.filter(task => task._id !== taskId));
          alert('Task deleted successfully!');
        } else {
          alert('Failed to delete the task.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while deleting the task.');
      }
    }
  };

  return (
    <div>
      <TaskNavbar />
      <div className="container">
        <h2 className="my-4 text-center">Upcoming Tasks</h2>

        <input
          type="text"
          className="form-control mb-3"
          placeholder="Search tasks by title or description"
          value={searchQuery}
          onChange={handleSearchChange}
        />

        <select
          className="form-control mb-3"
          value={priorityFilter}
          onChange={handlePriorityChange}
        >
          <option value="">All Priorities</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <div className="d-flex align-items-center mb-4">
          <label className="me-3 fw-bold">Sort By:</label>
          <select
            className="form-select"
            style={{ width: '200px', borderColor: '#0d6efd', color: '#0d6efd', fontWeight: 'bold' }}
            value={sortOption}
            onChange={handleSortChange}
          >
            <option value="priority">Priority</option>
            <option value="dueDate">Due Date</option>
          </select>
        </div>

        <div className="row">
          {tasks.length === 0 ? (
            <p className="text-center">No upcoming tasks available.</p>
          ) : (
            tasks.map((task) => (
              <div className="col-md-4 mb-4" key={task._id}>
                <div className="card shadow-sm h-100">
                  <div className="card-body">
                    <h5 className="card-title">{task.title}</h5>
                    <p className="card-text">{task.description}</p>
                    <p className="card-text">
                      <strong>Priority: </strong>
                      <span className={`badge ${task.priority === 'High' ? 'bg-danger' : task.priority === 'Medium' ? 'bg-warning text-dark' : 'bg-secondary'}`}>
                        {task.priority}
                      </span>
                    </p>
                    <p className="card-text">
                      <small className="text-muted">Due Date: {new Date(task.dueDate).toLocaleDateString('en-GB')}</small>
                    </p>
                    <div className="d-flex justify-content-between">
                      <button className="btn btn-secondary" onClick={() => handleEditTaskClick(task)}>Edit</button>
                      <button className="btn btn-success" onClick={() => handleCompleteTaskClick(task._id)}>Complete</button>
                      <button className="btn btn-danger" onClick={() => handleDeleteTaskClick(task._id)}>Delete</button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default UpcomingTasks;
