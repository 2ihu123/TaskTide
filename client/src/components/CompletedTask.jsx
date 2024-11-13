import React, { useEffect, useState } from 'react';
import TaskNavbar from './TaskNavbar';
import 'bootstrap/dist/css/bootstrap.min.css';

const CompletedTasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await fetch('http://localhost:5000/api/gettask/completed', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: localStorage.getItem("email") }),
    });
    const data = await response.json();
    const tasksArray = Object.values(data.tasks);
    setTasks(tasksArray);
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

  const handleRestoreTaskClick = async (taskId) => {
    try {
      const response = await fetch('http://localhost:5000/api/restoretask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ taskId }),
      });

      const data = await response.json();

      if (data.success) {
        setTasks(tasks.filter(task => task._id !== taskId));
        alert('Task restored successfully!');
      } else {
        alert('Failed to restore the task.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while restoring the task.');
    }
  };

  return (
    <div>
      <TaskNavbar />
      <div className="container my-5">
        <h2 className="my-4 text-center">Completed Tasks</h2>

        <div className="row">
          {tasks.length === 0 ? (
            <p className="text-center">No completed tasks available.</p>
          ) : (
            tasks.map((task) => (
              <div className="col-md-4 mb-4" key={task._id}>
                <div className="card shadow-sm h-100">
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{task.title}</h5>
                    <p className="card-text">{task.description}</p>
                    <p className="card-text">
                      <span className="badge bg-success">Completed</span>
                    </p>
                    {task.completionDate && (
                      <p className="card-text">
                        <small className="text-muted">
                          Completed on: {new Date(task.completionDate).toLocaleDateString('en-GB')}
                        </small>
                      </p>
                    )}

                    <div className="mt-auto d-flex justify-content-between">
                      
                      <button
                        className="btn btn-outline-danger"
                        onClick={() => handleDeleteTaskClick(task._id)}
                      >
                        Delete
                      </button>
                      
                     
                      <button
                        className="btn btn-outline-primary"
                        onClick={() => handleRestoreTaskClick(task._id)}
                      >
                        Restore
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

export default CompletedTasks;
