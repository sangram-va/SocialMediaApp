import React, { useContext, useState } from 'react'
import { ContextApi } from '../Context/Context'
import { services } from '../services/Services';

const SendRequest = () => {
    let {loggedUser,setloggedUser}=useContext(ContextApi)
    console.log(loggedUser);
    let [state,setState]=useState("")

    let handelChange=(e)=>{
        setState(e.target.value)
    }
    let handelSubmit=(e)=>{
        e.preventDefault()
        console.log(state);
        let payload={targetUsername:state}
        services.sendRequest(payload)
        setState("")  
        
        
    }
  return (
    <div>
        <form action="" onSubmit={handelSubmit}>
            <div>
                <label htmlFor="">User Name</label>
                <input type="text" value={state} onChange={handelChange}/>
            </div>
            <div>
                <button>Click</button>
            </div>
        </form>
    </div>
  )
}

export default SendRequest