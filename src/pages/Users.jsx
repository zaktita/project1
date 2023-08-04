import React, { useState } from 'react'
import { useStateContext } from '../Contexts/ContextProvider';

function Users() {
  const { user} = useStateContext();

  return (
    <div>
      <h1>users</h1>
      <span>{user.name}</span>
    </div>
  )
}

export default Users
