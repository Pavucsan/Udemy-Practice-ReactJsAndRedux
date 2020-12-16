import { combineReducers } from "redux";
import backlogReducers from "./backlogReducers";
import errorReducer from "./errorReducer";
import projectReducer from "./projectReducer";

export default combineReducers({
  errors: errorReducer,
  project: projectReducer,
  backlog: backlogReducers,
});
