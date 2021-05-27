//import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
//import { List, Avatar, Button, Skeleton } from 'antd';
import TaskList from './components/TasksList';
import CreateTask from './components/CreateTask';
import Task from "./components/Task";

function App() {
  return (
    <Router>
     <Switch>
       <Route exact path={["/", "/"]} component={TaskList}/>
       <Route exact path="/create" component={CreateTask}/>
       <Route exact path="/task/:id" component={Task}/>
     </Switch>
    </Router>
  );
}

export default App;
