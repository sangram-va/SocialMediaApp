import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const PrivateRoutes = ({ children }) => {
    let navigate = useNavigate()

    useEffect(() => {
        if (!sessionStorage.getItem("Token")) {
            navigate("/login")
        }
    }, [navigate])

    return sessionStorage.getItem("Token") ? <div>{children}</div> : null
}

export default PrivateRoutes
