import { useContext, useEffect } from "react";

import { LoginApi, RegisterApi, GetMeApi, LogoutApi } from "../services/authApi"
import { AuthContext } from '../state/auth.context'

export function useAuth() {

    const context = useContext(AuthContext);
    const { setLoading, setUser ,} = context;

    async function LoginHandler(username, password) {

        setLoading(true)

        try {
            const response = await LoginApi(username, password);
            setUser(response.user);
        }
        catch (err) {
            throw err
        }
        finally {
            setLoading(false)
        }

    }

    async function RegisterHandler(username, email, password) {
        setLoading(true)

        try {
            const response = await RegisterApi(username, email, password);
            setUser(response.user);
        }
        catch (err) {
            throw err
        }
        finally {
            setLoading(false)
        }

    }

    async function GetMeHandler() {

        setLoading(true);
        try {
            const response = await GetMeApi();
            setUser(response.user)
            return response.user;
        }
        catch (err) {
            return err;
        }
        finally {
            setLoading(false);
        }

    }

    async function LogoutHandler() {
        setLoading(true);
        try {
            const response = await LogoutApi();
            setUser(null);
            return response;
        }
        catch (err) {
            return err
        }
        setLoading(false)
    }

    useEffect(()=>{
        GetMeHandler()
    },[])

    return { LoginHandler, RegisterHandler, GetMeHandler, LogoutHandler, context }

}
