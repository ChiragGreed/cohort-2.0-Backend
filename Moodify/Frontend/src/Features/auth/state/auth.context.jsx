import { useState } from "react";

import { createContext } from 'react'

export const AuthContext = createContext();

function AuthContextProvider({ children }) {

    const [Loading, setLoading] = useState(false);
    const [User, setUser] = useState(null);

    return (
        <AuthContext.Provider value={{ Loading, setLoading, User, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider
