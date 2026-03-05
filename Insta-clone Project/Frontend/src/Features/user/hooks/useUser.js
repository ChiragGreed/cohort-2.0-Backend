import React, { useContext } from 'react'
import { UserContext } from '../userContext';
import { getFollowersApi, getFollowingApi, otherUsersApi, followUserApi } from '../services/user.api';

const useUser = () => {

    const context = useContext(UserContext);
    const { setLoading, setFollowers, setFollowing, setOtherUsers } = context;

    async function getFollowersHandler() {

        setLoading(true);

        try {
            const response = await getFollowersApi();
            setFollowers(response.data.followers);
        }

        catch (err) {
            throw err
        }

        finally {
            setLoading(false);
        }
    }

    async function getFollowingHandler() {

        setLoading(true);

        try {
            const response = await getFollowingApi();
            setFollowing(response.data.followings);
        }

        catch (err) {
            throw err
        }

        finally {
            setLoading(false);
        }
    }

    async function otherUsersHandler() {

        setLoading(true);

        try {
            const response = await otherUsersApi();
            setOtherUsers(response.data.otherUsers);
        }

        catch (err) {
            throw err
        }

        finally {
            setLoading(false);
        }
    }

    async function followUserHandler(user) {

        try {
            const response = await followUserApi(user);
            console.log(response.data);
        }

        catch (err) {
            console.log(err);
        }

    }

    async function RequestsHandler(){
        
    }

    return { getFollowersHandler, getFollowingHandler, otherUsersHandler, context, followUserHandler }
}


export default useUser
