import React, {  createContext, useState } from 'react'

export let ContextApi=createContext()
const Context = ({children}) => {
    let [loggedUser,setloggedUser]=useState()
    let {Provider}=ContextApi
  return (
    <Provider value={{loggedUser,setloggedUser}}>{children}</Provider>
  )
}

export default Context