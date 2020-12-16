import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "./component/Dashboard";
import AddProjectTask from "./component/project-board.js/project-task/AddProjectTask";
import UpdateProjectTask from "./component/project-board.js/project-task/UpdateProjectTask";
import ProjectBoard from "./component/project-board.js/ProjectBoard";
import AddProject from "./component/project/AddProject";
import UpdateProject from "./component/project/UpdateProject";
import Header from "./layout/Header";
import store from "./store";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Header />
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/addProject" component={AddProject} />
            <Route exact path="/updateProject/:id" component={UpdateProject} />

            <Route exact path="/projectBoard/:id" component={ProjectBoard} />
            <Route
              exact
              path="/addProjectTask/:id"
              component={AddProjectTask}
            />
            <Route
              exact
              path="/updateProjectTask/:backlogId/:ptId"
              component={UpdateProjectTask}
            />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
