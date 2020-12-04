import React, { Component } from 'react'

import PropTypes from "prop-types";
import {connect} from "react-redux";
import {createProject} from "../../actions/projectAction";
import classnames from "classnames";

class AddProject extends Component {
    constructor(){
        super();
        this.state = {
            projectName: "",
            projectIdentifier: "",
            description: "",
            start_date: "",
            end_date: "",

            errors:{}
        }
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }
    onChangeHandler(e){
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    onSubmitHandler(e){
        e.preventDefault();
        const newProject = {
            projectName: this.state.projectName,
            projectIdentifier:  this.state.projectIdentifier,
            description:  this.state.description,
            start_date:  this.state.start_date,
            end_date:  this.state.end_date,
        }
        console.log(newProject);
        this.props.createProject(newProject, this.props.history);
    }

    // life cycle hooks
    componentWillReceiveProps(nextProps){
        // if there  are changes in the state or if there are error in props
        if(nextProps.errors){
            this.setState({
                errors: nextProps.errors
            })
        }
    }
    render() {
        const {errors} = this.state;

        return (
            <div className="project">
        <div className="container">
            <div className="row">
                <div className="col-md-8 m-auto">
                    <h5 className="display-4 text-center">Create Project form</h5>
                    <hr />
                    <form onSubmit={this.onSubmitHandler}>
                        <div className="form-group">
                            <input type="text" className="form-control form-control-lg "
                             name="projectName" placeholder="Project Name"
                             value={this.state.projectName}
                             onChange = {this.onChangeHandler}
                             />
                        </div>
                        <div className="form-group">
                            <input type="text" className={classnames("form-control form-control-lg", 
                            {
                                "is-invalid":errors.projectIdentifier
                            })}
                            name="projectIdentifier" placeholder="Unique Project ID"
                            value={this.state.projectIdentifier}
                            onChange = {this.onChangeHandler}
                                />
                                {
                                    errors.projectIdentifier && (
                                        <div className="invalid-feedback">{errors.projectIdentifier}</div>
                                    )
                                }
                        </div>
                        {
                            //<!-- disabled for Edit Only!! remove "disabled" for the Create operation -->
                        }
                        <div className="form-group">
                            <textarea className="form-control form-control-lg"
                             name="description" placeholder="Project Description"
                             value={this.state.description}
                             onChange = {this.onChangeHandler}
                             ></textarea>
                        </div>
                        <h6>Start Date</h6>
                        <div className="form-group">
                            <input type="date" className="form-control form-control-lg" 
                            name="start_date"
                            value={this.state.start_date}
                            onChange = {this.onChangeHandler}
                            />
                        </div>
                        <h6>Estimated End Date</h6>
                        <div className="form-group">
                            <input type="date" className="form-control form-control-lg" 
                            name="end_date" 
                            value={this.state.end_date}
                            onChange = {this.onChangeHandler}
                            />
                        </div>

                        <input type="submit" className="btn btn-primary btn-block mt-4" />
                    </form>
                </div>
            </div>
        </div>
    </div>
        )
    }
}

AddProject.prototypes ={
    createProject : PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired    
}

const mapStateToProps = state => ({
    errors:state.errors
});

export default connect(mapStateToProps, {createProject}) (AddProject);
