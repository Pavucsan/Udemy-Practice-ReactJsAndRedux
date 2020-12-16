import axios from "axios";
import {
  DELETE_PROJECT_TASK,
  GET_BACKLOG,
  GET_ERRORS,
  GET_PROJECT_TASK,
} from "../actions/types";

export const addProjectTask = (backlog_id, project_task, history) => async (
  dispatch
) => {
  try {
    const res = await axios.post(
      `http://localhost:8081/api/backlog/${backlog_id}`,
      project_task
    );
    history.push(`/projectBoard/${backlog_id}`);
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
};

export const getBacklog = (backlogId) => async (dispatch) => {
  try {
    const res = await axios.get(
      `http://localhost:8081/api/backlog/${backlogId}`
    );
    console.log(res.data);
    dispatch({
      type: GET_BACKLOG,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
};

export const getProjectTask = (backlogId, ptId, history) => async (
  dispatch
) => {
  try {
    const res = await axios.get(
      `http://localhost:8081/api/backlog/${backlogId}/${ptId}`
    );
    dispatch({
      type: GET_PROJECT_TASK,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response,
    });
    history.push("/dashboard");
  }
};

export const updateProjectTask = (
  backlogId,
  ptId,
  project_task,
  history
) => async (dispatch) => {
  try {
    console.log(project_task);
    const res = await axios.patch(
      `http://localhost:8081/api/backlog/${backlogId}/${ptId}`,
      project_task
    );
    dispatch({
      type: GET_ERRORS,
      payload: {},
    });
    history.push(`/projectBoard/${backlogId}`);
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response,
    });
  }
};
export const deleteProjectTask = (backlogId, ptId) => async (dispatch) => {
  // if (window.confirm(`You Are deleting project task ${ptId}, this action cannot be undone?`)) {
    await axios.delete(
      `http://localhost:8081/api/backlog/${backlogId}/${ptId}`
    );

    dispatch({
      type: DELETE_PROJECT_TASK,
      payload: ptId,
    });
  // }
};
