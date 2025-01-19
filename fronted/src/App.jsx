import React from 'react'
import AppRouterr from './Routess/AppRouterr'
import { UserProvider } from './context/User.context'
const App = () => {
  return (
   
 
     
    <UserProvider>
      <AppRouterr/>
    </UserProvider>
    
  )
}

export default App
