import axios from "axios";
import setJWTToken from "../securityUtils/setJWTToken";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import jwt_decode from "jwt-decode";

export const createNewUser = (newUser, history) => async (dispatch) => {
  try {
    await axios.post("/api/users/register", newUser);
    history.push("/login");

    dispatch({
      type: GET_ERRORS,
      payload: {},
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
};

export const loginUser = (LoginRequest) => async (dispatch) => {
  try {
    //post=> login
    const res = await axios.post("/api/users/login", LoginRequest);
    //extract the token from the res.data
    const { token } = res.data;
    //store the token into the localstorage
    localStorage.setItem("jwtToken", token);
    //set our token in header***
    setJWTToken(token);
    //decode token on React
    const decoded = jwt_decode(token);
    //diapatch to our securityReducer
    dispatch({
      type: SET_CURRENT_USER,
      payload: decoded,
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
};

export const logout = () => dispatch => {
  localStorage.removeItem("jwtToken");
  setJWTToken(false);
  dispatch({
    type:SET_CURRENT_USER,
    payload:{}
  })
}
