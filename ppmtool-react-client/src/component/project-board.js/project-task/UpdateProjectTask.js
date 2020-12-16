import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  getProjectTask,
  updateProjectTask,
} from "../../../actions/backlogAction";
import PropTypes from "prop-types";
import classnames from "classnames";


class UpdateProjectTask extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      projectSequence: "",
      summary: "",
      acceptanceCriteria: "",
      status: "",
      priority: "",
      dueDate: "",
      projectIdentifier: "",
      create_At: "",

      errors: {},
    };
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }
  // life cycle hooks
  componentWillReceiveProps(nextProps) {
    // if there  are changes in the state or if there are error in props
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }

    const {
      id,
      projectSequence,
      summary,
      acceptanceCriteria,
      status,
      priority,
      dueDate,
      projectIdentifier,
      create_At,
    } = nextProps.project_task;

    this.setState({
      id,
      projectSequence,
      summary,
      acceptanceCriteria,
      status,
      priority,
      dueDate,
      projectIdentifier,
      create_At,
    });
  }

  onChangeHandler(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  componentDidMount() {
    const { ptId, backlogId } = this.props.match.params;
    this.props.getProjectTask(backlogId, ptId, this.props.history);
  }
  onSubmitHandler(e) {
    e.preventDefault();
    const updateProjectTaskObject = {
      id: this.state.id,
      projectSequence: this.state.projectSequence,
      summary: this.state.summary,
      acceptanceCriteria: this.state.acceptanceCriteria,
      status: this.state.status,
      priority: this.state.priority,
      dueDate: this.state.dueDate,
      projectIdentifier: this.state.projectIdentifier,
      create_At: this.state.create_At,
    };
    console.log(updateProjectTaskObject);
    this.props.updateProjectTask(
      this.state.projectIdentifier,
      this.state.projectSequence,
      updateProjectTaskObject,
      this.props.history
    );
  }

  render() {
    const {errors} = this.state;
    return (
      <div className="add-PBI">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to={`/projectBoard/${this.state.projectIdentifier}`} className="btn btn-light">
                Back to Project Board
              </Link>
              <h4 className="display-4 text-center">Edit Project Task</h4>
              <p className="lead text-center">
                Project Name: {this.state.projectIdentifier} + Project Code:{" "}
                {this.state.projectSequence}
              </p>
              <form onSubmit={this.onSubmitHandler}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg",{
                      "is-invalid":errors.summary
                    }) 
                  }
                    name="summary"
                    placeholder="Project Task summary"
                    value={this.state.summary}
                    onChange={this.onChangeHandler}
                  />
                  {
                    errors.summary && (
                      <div className = "invalid-feedback">
                        {errors.summary}
                      </div>
                    )
                  }

                </div>
                <div className="form-group">
                  <textarea
                    className="form-control form-control-lg"
                    placeholder="Acceptance Criteria"
                    name="acceptanceCriteria"
                    value={this.state.acceptanceCriteria}
                    onChange={this.onChangeHandler}
                  ></textarea>
                </div>
                <h6>Due Date</h6>
                <div className="form-group">
                  <input
                    type="date"
                    className="form-control form-control-lg"
                    name="dueDate"
                    value={this.state.dueDate}
                    onChange={this.onChangeHandler}
                  />
                </div>
                <div className="form-group">
                  <select
                    className="form-control form-control-lg"
                    name="priority"
                    value={this.state.priority}
                    onChange={this.onChangeHandler}
                  >
                    <option value={0}>Select Priority</option>
                    <option value={1}>High</option>
                    <option value={2}>Medium</option>
                    <option value={3}>Low</option>
                  </select>
                </div>

                <div className="form-group">
                  <select
                    className="form-control form-control-lg"
                    name="status"
                    value={this.state.status}
                    onChange={this.onChangeHandler}
                  >
                    <option value="">Select Status</option>
                    <option value="TO_DO">TO DO</option>
                    <option value="IN_PROGRESS">IN PROGRESS</option>
                    <option value="DONE">DONE</option>
                  </select>
                </div>

                <input
                  type="submit"
                  className="btn btn-primary btn-block mt-4"
                  value="Update"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
UpdateProjectTask.prototypes = {
  getProjectTask: PropTypes.func.isRequired,
  updateProjectTask: PropTypes.func.isRequired,
  project_task: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  project_task: state.backlog.project_task,
  errors: state.errors,
});
export default connect(mapStateToProps, { getProjectTask, updateProjectTask })(
  UpdateProjectTask
);
