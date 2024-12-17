import React, { createContext, useEffect, useReducer, useState } from "react";

let user;
try {
  user = JSON.parse(localStorage.getItem("user"));
} catch (error) {
  console.error("Error parsing user data from localStorage:", error);
  user = null;
}

const initial_state = {
  user: user,
  loading: false,
  error: null,
  authToken: localStorage.getItem("authToken") || null, 
};


export const AuthContext = createContext(initial_state);

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        ...state,
        user: null,
        loading: true,
        error: null,
        authToken: null 
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: null,
        authToken: action.token, 
      };

    case "LOGIN_FAILURE":
      return {
        ...state,
        user: null,
        loading: false,
        error: action.payload,
        authToken: null 
      };

    case "REGISTER_SUCCESS":
      return {
        ...state,
        user: null,
        loading: false,
        error: null,
        authToken: null 
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        loading: false,
        error: null,
        authToken: null,
      };

    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initial_state);
  const [authToken, setAuthToken] = useState(initial_state.authToken);
  // Step 2: State variable for authentication token

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);
  useEffect(() => {
    localStorage.setItem("authToken",(authToken));
  }, [authToken]);

  useEffect(() => {
    if (state.user && state.user.status === "blocked") {
      localStorage.clear()
      dispatch({ type: "LOGOUT" });
    }
  }, [state.user]);

  useEffect(() => {
    setAuthToken(state.authToken);
  }, [state.authToken]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        authToken: state.authToken, 
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
