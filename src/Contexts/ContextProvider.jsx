// Import required dependencies from React
import { createContext, useContext, useEffect, useState } from "react";
import React from "react";

// Create a new React context with default values for user and token
const StateContext = createContext({
  User: null,
  token: null,
  setUser: () => {},
  setTokenFunction: () => {},
});

// Define a context provider component to manage global state
export function ContextProvider({ children }) {
  // Define two state variables: user and token
  const userData = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(userData || {});
  const [token, setTokenKey] = useState(localStorage.getItem("ACCESS_TOKEN"));

  // Define a function to set the token and store it in local storage
  const setTokenFunction = (token, user) => {
    setTokenKey(token);
    setUser(user);
    if (token) {
      // If the token is provided, store it in local storage along with the user information
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("ACCESS_TOKEN", token);
    } else {
      // If the token is not provided, remove it from local storage
      localStorage.removeItem("user");
      localStorage.removeItem("ACCESS_TOKEN");
      setUser({});
    }
  };

  // useEffect(() => {
  //   console.log(user.user);
  // }, [user]);


  
  // Return the context provider with the state values and setter functions as context value
  return (
    <StateContext.Provider
      value={{
        user,
        token,
        setUser,
        setTokenFunction,
      }}
    >
      {children}
    </StateContext.Provider>
  );
}

// Custom hook to access the context and its values in components
export const useStateContext = () => useContext(StateContext);
