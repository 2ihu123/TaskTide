import React, { useEffect, useState } from 'react';
import TaskNavbar from './TaskNavbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [sortOption, setSortOption] = useState('priority'); 
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (!email) {
      navigate('/home');
    } else {
      fetchTasks();
    }
  }, [navigate]);

  const fetchTasks = async () => {
    const response = await fetch('http://localhost:5000/api/gettask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: localStorage.getItem("email") }),
    });
    const data = await response.json();
    setTasks(data.tasks);
  };

  const sortTasks = (tasks) => {
    if (sortOption === 'priority') {
      const priorityOrder = { High: 1, Medium: 2, Low: 3 };
      return tasks.sort((a, b) => (priorityOrder[a.priority] || 3) - (priorityOrder[b.priority] || 3));
    } else if (sortOption === 'dueDate') {
      return tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    }
    return tasks;
  };

  const handleAddTaskClick = () => {
    navigate('/addtask');
  };

  const handleEditTaskClick = (task) => {
    navigate('/edittask', { state: { task } });
  };

  const handleDeleteTaskClick = async (taskId) => {
    const confirmation = window.confirm('Are you sure you want to delete this task?');
    if (confirmation) {
      try {
        const response = await fetch('http://localhost:5000/api/deletetask', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ taskId }),
        });
        const data = await response.json();
        if (data.success) {
          setTasks(tasks.filter(task => task._id !== taskId));
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

  const handleCompleteTaskClick = async (taskId) => {
    try {
      const response = await fetch('http://localhost:5000/api/completetask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ taskId }),
      });

      const data = await response.json();
      if (data.success) {
        setTasks(tasks.map(task =>
          task._id === taskId ? { ...task, completed: true } : task
        ));
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

  const isOverdue = (dueDate) => {
    return new Date(dueDate) < new Date() && !tasks.completed;
  };

  const filteredTasks = sortTasks(
    tasks.filter((task) => {
      const matchesSearchQuery =
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesPriorityFilter =
        priorityFilter === '' || task.priority === priorityFilter;

      return matchesSearchQuery && matchesPriorityFilter;
    })
  );

  return (
    <div>
      <TaskNavbar />
      <div className="container">
        <h2 className="my-4 text-center">All Tasks</h2>

        <input
          type="text"
          className="form-control mb-3"
          placeholder="Search tasks by title or description"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <select
          className="form-control mb-3"
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
        >
          <option value="">All Priorities</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        {/* Sorting Options */}
        <div className="d-flex align-items-center mb-4">
          <label className="me-3" style={{ fontWeight: 'bold', fontSize: '1rem' }}>
            Sort By:
          </label>
          <select
            className="form-select"
            style={{
              width: '200px',
              borderColor: '#0d6efd',
              color: '#0d6efd',
              fontWeight: 'bold'
            }}
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="priority">Priority</option>
            <option value="dueDate">Due Date</option>
          </select>
        </div>

        <div className="row">
          <div className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm" onClick={handleAddTaskClick} style={{ cursor: 'pointer' }}>
              <div className="card-body d-flex flex-column justify-content-center align-items-center">
                <i className="fa fa-plus fa-3x mb-3 text-primary"></i>
                <h5 className="card-title text-center">Add New Task</h5>
              </div>
            </div>
          </div>

          {filteredTasks.length === 0 ? (
            <p className="text-center col-12">No tasks found.</p>
          ) : (
            filteredTasks.map((task) => (
              <div className="col-md-4 mb-4" key={task._id}>
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">{task.title}</h5>
                    <p className="card-text">{task.description}</p>
                    <p className="card-text">
                      <span className={`badge ${task.priority === 'High' ? 'bg-danger' : task.priority === 'Medium' ? 'bg-warning' : 'bg-secondary'}`}>
                        {task.priority}
                      </span>
                    </p>
                    <p className="card-text">
                      <strong>Status: </strong>
                      <span className={`badge ${ isOverdue(task.dueDate) ? 'bg-danger' : 'bg-info'}`}>
                        { isOverdue(task.dueDate) ? 'Overdue' : 'Pending'}
                      </span>
                    </p>
                    
                      <p className="card-text">
                        <small className="text-muted">Due Date: {new Date(task.dueDate).toLocaleDateString('en-GB')}</small>
                      </p>
                
                    <div className="d-flex justify-content-between">
                     
                        <button className="btn btn-secondary" onClick={() => handleEditTaskClick(task)}>
                          Edit
                        </button>
                      
                      
                        <button className="btn btn-success" onClick={() => handleCompleteTaskClick(task._id)}>
                          Complete
                        </button>
                 
                      <button className="btn btn-danger" onClick={() => handleDeleteTaskClick(task._id)}>
                        Delete
                      </button>
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

export default Tasks;
