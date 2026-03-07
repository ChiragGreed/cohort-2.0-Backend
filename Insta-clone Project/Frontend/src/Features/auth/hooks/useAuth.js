import { useContext } from "react";
import { AuthContext } from "../authContext.jsx";
import { loginApi, protectedApi, registerApi } from '../services/auth.api';
import { useNavigate } from "react-router-dom";


export function useAuth() {
    const context = useContext(AuthContext);
    const { setUser, setLoading } = context;

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
            setUser(res.user)
        }

        catch (err) {
            throw err
        }

        finally {
            setLoading(false)
        }

    }

    async function protectedHandler() {

        try {
            await protectedApi();
            return true;

        }
        catch (err) {
            return false;
        }

    }

    return { context, registerHandler, loginHandler, protectedHandler };
}