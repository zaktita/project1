// Import required dependencies from React
import { createContext, useContext, useState } from "react";
import React from "react";

// Create a new React context with default values for user and token
const StateContext = createContext({
  User: null,
  token: null,
  setUser: () => {},
  setToken: () => {},
});

// Define a context provider component to manage global state
export function ContextProvider({ children }) {
  // Define two state variables: user and token
  const [user, setUser] = useState({ user: localStorage.getItem("user") });
  const [token, setTokenKey] = useState(localStorage.getItem("ACCESS_TOKEN"));

  // Define a function to set the token and store it in local storage
  const setToken = (token) => {
    setTokenKey(token);
    if (token) {
      // If the token is provided, store it in local storage along with the user information
      localStorage.setItem("user", user);
      localStorage.setItem("ACCESS_TOKEN", token);
    } else {
      // If the token is not provided, remove it from local storage
      localStorage.removeItem("ACCESS_TOKEN");
    }
  };

  // Return the context provider with the state values and setter functions as context value
  return (
    <StateContext.Provider
      value={{
        user,
        token,
        setUser,
        setToken,
      }}
    >
      {children}
    </StateContext.Provider>
  );
}

// Custom hook to access the context and its values in components
export const useStateContext = () => useContext(StateContext);
