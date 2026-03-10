import React from 'react'
import { useAuth } from '../hooks/useAuth'
import { Navigate } from 'react-router-dom';

const Protected = ({ children }) => {

    const { context } = useAuth();
    const { User, Loading } = context;

    if (Loading) return (
        <h1>Loading</h1>
    )

    if (!User) {
        return <Navigate to='/login' />
    }

    return (
        <>
            {children}
        </>
    )
}

export default Protected
