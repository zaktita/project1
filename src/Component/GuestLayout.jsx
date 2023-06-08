import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../Contexts/ContextProvider'

function GuestLayout() {
    const {user,token}= useStateContext()
    if(token){
        return <Navigate to='/'/>
    }
  return (
    <div>
      <Outlet/>
    </div>
  )
}

export default GuestLayout
