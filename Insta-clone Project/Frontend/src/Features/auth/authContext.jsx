import { createContext, useState } from 'react'

export const AuthContext = createContext();


const AuthProvider = ({ children }) => {

  const [User, setUser] = useState(null);
  const [Loading, setLoading] = useState(false);



  return (
    <AuthContext.Provider value={{ User, setUser, Loading, setLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider