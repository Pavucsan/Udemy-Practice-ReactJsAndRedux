import React, { Component } from "react";
import CreateProjectButton from "./project/CreateProjectButton";
import ProjectItem from "./project/ProjectItem";
import { connect } from "react-redux";
import { getProjects } from "../actions/projectAction";
import PropTypes from "prop-types";

class Dashboard extends Component {
  // life cycle hook
  componentDidMount() {
    this.props.getProjects();
  }

  render() {
    const { projects } = this.props.project;
    console.log(projects);
    return (
      <div className="projects">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Projects</h1>
              <br />
              <CreateProjectButton />
              <br />
              <hr />

              {projects.map((project) => (
                <ProjectItem key={project.id} project={project} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.prototypes = {
  project: PropTypes.object.isRequired,
  getProjects: PropTypes.func.isRequired,
};

const MapStateToProp = (state) => ({
  project: state.project,
});

export default connect(MapStateToProp, { getProjects })(Dashboard);
