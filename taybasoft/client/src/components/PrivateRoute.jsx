import React from 'react'
import { Navigate } from 'react-router-dom'
import { useGetUserRoleQuery } from '../slices/auth/authApiSlice'

const PrivateRoute = ({ children }) => {
    const userInfo = localStorage.getItem("userInfo")
    const { data } = useGetUserRoleQuery(JSON.parse(localStorage.getItem("userInfo")).userRole)

    if (!userInfo) {
        return <Navigate to='/login' />
    }
    if (data) {
        if (data.role !== "admin") {
            return children
        } else {
            return <Navigate to='/' />
        }
    }
}

export default PrivateRoute
