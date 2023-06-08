import { createContext, useContext, useState } from "react";
import React from 'react'

const StateContext = createContext({
    User : null,
    token:null,
    SetUser : ()=>{},
    SetToken : ()=>{},
})


export function ContextProvider({children}) {
    const [user,SetUser]=useState({
      name: localStorage.getItem('user')
    })
    // const [token,SetTokenKey]=useState(123)
    const [token,SetTokenKey]=useState(localStorage.getItem('ACCESS_TOKEN'))

    const setToken = (token)=>{
        SetTokenKey(token)
        if(token){
            localStorage.setItem('ACCESS_TOKEN',token)
        }
        else{
            localStorage.removeItem('ACCESS_TOKEN')

        }
    }
  return (
    <StateContext.Provider value={{
        user,
        token,
        SetUser,
        setToken
    }}>
      {children}
    </StateContext.Provider>
  )
}


export const useStateContext = ()=> useContext(StateContext)