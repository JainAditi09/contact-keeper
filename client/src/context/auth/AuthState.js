import React, { useReducer } from "react";
import axios from "axios";
import AuthContext from "./authContext";
import AuthReducer from "./authReducer";
import setAuthToken from "../../utils/setAuthToken";
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

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  //load Users
  const loadUser = async () => {
    //todo\console.log
    //console.log("i ma going to load ");
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    console.log(localStorage.token);
    try {
      const res = await axios.get("/api/auth");
      // console.log("result of load user is ");
      // console.log(res);
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    } catch (err) {
      // console.log(" error ");
      // console.log(err);
      dispatch({
        type: AUTH_ERROR,
      });
    }
  };

  //Register User
  const register = async (FormData) => {
    // console.log("register state : ");
    // console.log(FormData);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/users", FormData, config);
      //console.log(res);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });

      loadUser();
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg,
      });
    }
  };
  //Login User
  const login = async (FormData) => {
    // console.log("register state : ");
    // console.log(FormData);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/auth", FormData, config);
      // console.log(res);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });

      loadUser();
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.msg,
      });
    }
  };
  //Logout
  const logout = () => dispatch({ type: LOGOUT });
  //clear Errors
  const clearError = () => {
    dispatch({ type: CLEAR_ERRORS });
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        register,
        clearError,
        loadUser,
        login,
        logout,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
