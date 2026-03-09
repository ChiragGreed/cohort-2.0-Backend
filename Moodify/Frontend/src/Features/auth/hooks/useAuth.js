import { useContext } from "react";
import { LoginApi, RegisterApi } from "../services/authApi"
import { AuthContext } from '../state/auth.context'
export function useAuth() {

    const context = useContext(AuthContext);
    const { setLoading, setUser } = context;

    async function LoginHandler({ username, password }) {

        setLoading(true)
        
        
        try {
            const response = await LoginApi({ username, password });
            console.log("esgw");
            setUser(response.data.user);
        }
        catch (err) {
            throw err
        }
        finally {
            setLoading(false)
        }

    }

    async function RegisterHandler({ username, email, password }) {

        setLoading(true)

        try {
            const response = await RegisterApi({ username, email, password });
            console.log(response.data);
            setUser(response.data.user);
        }
        catch (err) {
            throw err
        }
        finally {
            setLoading(false)
        }

    }

    return { LoginHandler, RegisterHandler, context }

}
