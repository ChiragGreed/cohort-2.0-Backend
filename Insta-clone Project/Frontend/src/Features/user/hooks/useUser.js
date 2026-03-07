import React, { useContext } from 'react'
import { UserContext } from '../userContext';
import { getFollowersApi, getFollowingApi, otherUsersApi, followUserApi, getRequestesApi, acceptRequestApi, rejectRequestApi, followUserRequestApi, getSentRequestesApi } from '../services/user.api';

const useUser = () => {

    const context = useContext(UserContext);
    const { setLoading, setFollowers, setFollowing, setOtherUsers, setRequests, setSentRequests, SentRequests } = context;

    async function getFollowersHandler() {

        setLoading(true);

        try {
            const response = await getFollowersApi();
            setFollowers(response.data.followers);
        }

        catch (err) {
            return err
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
            return err
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

    async function followUserRequestHandler(user) {

        try {
            await followUserRequestApi(user);
            setSentRequests(prev => [...prev, { requestee: user }]);
        }

        catch (err) {
            console.log(err);
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

    async function getRequestsHandler() {

        try {
            const response = await getRequestesApi();
            setRequests(response.data.requests);
        }
        catch (err) {
            return err;
        }
    }

    async function getSentRequestsHandler() {

        try {
            const response = await getSentRequestesApi();
            setSentRequests(response.data.requests);

        }
        catch (err) {
            throw err;
        }
    }

    async function acceptRequestHandler(user) {

        try {
            const response = await acceptRequestApi(user);
            console.log(response.data);
        }

        catch (err) {
            console.log(err);
        }

    }

    async function rejectRequestHandler(user) {

        try {
            const response = await rejectRequestApi(user);
            console.log(response.data);
        }

        catch (err) {
            console.log(err);
        }

    }


    return { getFollowersHandler, getFollowingHandler, otherUsersHandler, followUserRequestHandler, followUserHandler, getRequestsHandler, getSentRequestsHandler, acceptRequestHandler, rejectRequestHandler, context }
}


export default useUser
