import { createContext, useState } from 'react'
import { loginApi, registerApi } from './services/auth.api';

export const AuthContext = createContext();


const AuthProvider = ({children}) => {

  const [User, setUser] = useState(null);
  const [Loading, setLoading] = useState(false);

  async function registerHandler(username, email, password) {
    setLoading(true);

    try {
      const res = await registerApi(username, email, password);
      setUser(res.user);
    }
    catch (err) {
      throw err
    }

    finally {
      setLoading(false);
    }

  }

  async function loginHandler(username, password) {

    setLoading(true);

    try {
      const res = await loginApi(username, password);
      // setUser(res.user)
    }

    catch (err) {
      throw err
    }

    finally {
      setLoading(false)
    }

  }

  return (
    <AuthContext.Provider value={{ User, Loading, registerHandler, loginHandler }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider