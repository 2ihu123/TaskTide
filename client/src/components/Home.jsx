import React from 'react';
import TaskNavbar from './TaskNavbar';
import 'bootstrap/dist/css/bootstrap.min.css';

const HomePage = () => {
  return (
    <div >
      <TaskNavbar />
      <div className="my-4 text-center">
        <div className="text-center">
          <h1 className="display-4">Welcome to Task Manager</h1>
          <p className="lead">
            Your all-in-one platform to organize tasks, set priorities, and meet deadlines efficiently.
          </p>
          <hr className="my-4" />
          <p>
            Get started by adding your first task or explore your upcoming tasks to stay on top of your schedule.
          </p>
          
        </div>

        
        <div className="mt-5">
          <h2 className="text-center mb-4">Features</h2>
          <div className="row text-center">
            <div className="col-md-4 mb-4">
              <h3>Organize Your Tasks</h3>
              <p>Keep track of all your tasks and categorize them by priority to stay organized.</p>
            </div>
            <div className="col-md-4 mb-4">
              <h3>Set Deadlines</h3>
              <p>Set due dates to ensure that you complete your tasks on time.</p>
            </div>
            <div className="col-md-4 mb-4">
              <h3>Track Progress</h3>
              <p>Mark tasks as complete to monitor your productivity and see what’s left to be done.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
