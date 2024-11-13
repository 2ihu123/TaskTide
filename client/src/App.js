import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Login from './components/Login';
import Signup from './components/SignUp';
import HomePage from './components/Home';
import Dashboard from './components/Tasks';
import UpcomingTasks from './components/UpcomingTask';
import OverdueTasks from './components/OverdueTask';
import CompletedTasks from './components/CompletedTask';
import AddTask from './components/AddTask';
import EditTask from './components/EditTask';
function App() {
  return (
    <Router>
      <div>
        <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/home" element={<HomePage />} />
        <Route exact path='/login' element={<Login></Login>}></Route>
        <Route exact path='/createuser' element={<Signup></Signup>}></Route>
        <Route exact path='/upcoming-tasks' element={<UpcomingTasks></UpcomingTasks>}></Route>
        <Route exact path='/overdue-tasks' element={<OverdueTasks></OverdueTasks>}></Route>
        <Route exact path='/completed-tasks' element={<CompletedTasks></CompletedTasks>}></Route>
        <Route path="/addtask" element={<AddTask />} />
        <Route path="/edittask" element={<EditTask />} />
        
        </Routes>
        </div>
      </Router>
  );
}

export default App;
