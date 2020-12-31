import { combineReducers } from "redux";
import backlogReducers from "./backlogReducers";
import errorReducer from "./errorReducer";
import projectReducer from "./projectReducer";
import securityReducer from "./securityReducer";

export default combineReducers({
  errors: errorReducer,
  project: projectReducer,
  backlog: backlogReducers,
  security: securityReducer
});
