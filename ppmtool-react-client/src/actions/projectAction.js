import axios from "axios";
import { DELETE_PROJECT, GET_ERRORS, GET_PROJECT, GET_PROJECTS } from "./types";

export const createProject = (project, history) => async (dispatch) => {
  try {
    await axios.post(
      "http://localhost:8081/api/project",
      project
    );
    history.push("/dashboard");

    dispatch({
      type: GET_ERRORS,
      payload: {},
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

export const getProjects = () => async (dispatch) => {
  try {
    const response = await axios.get("/api/project/all");
    // no need to navigate
    //history.push("/dashboard");
    dispatch({
      type: GET_PROJECTS,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

export const getProject = (id, history) => async (dispatch) => {
  try {
    const response = await axios.get(`/api/project/${id}`);
    dispatch({
      type: GET_PROJECT,
      payload: response.data,
    });
  } catch (error) {
    history.push("/dashboard");
  }
};

export const deleteProject = (id) => async (dispatch) => {
  if (window.confirm("Are you sure?")) {
    await axios.delete(`/api/project/${id}`);

    dispatch({
      type: DELETE_PROJECT,
      payload: id,
    });
  }
};
