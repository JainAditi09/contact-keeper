import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      // console.log("register success reducer");
      localStorage.setItem("token", action.payload.token);
      //console.log(action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      //console.log("register fail");
      localStorage.removeItem("token");

      return {
        ...state,
        isAuthenticated: null,
        loading: false,
        user: null,
        error: action.payload,
        token: null,
      };
    case CLEAR_ERRORS:
      //console.log("clear error ");
      return {
        ...state,
        error: null,
      };
    case USER_LOADED:
      // console.log("user laoded");
      // console.log(action.payload);
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      };

    default:
      return state;
  }
};
