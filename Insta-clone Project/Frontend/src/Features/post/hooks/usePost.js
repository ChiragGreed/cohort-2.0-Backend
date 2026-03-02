import { useContext } from "react";
import { PostContext } from "../postContext";
import { feedApi } from "../services/post.api";
import { addLikeApi } from "../services/post.api";
import { removeLikeApi } from "../services/post.api";
import { createPostApi } from "../services/post.api";


const usePost = () => {
    const context = useContext(PostContext);

    const { setLoading, setFeed, Feed } = context;

    async function feedHandler() {

        setLoading(true);

        try {
            const feedData = await feedApi()
            setFeed(feedData.data.feed.reverse());
        }
        catch (err) {
            throw err;
        }
        finally {
            setLoading(false);
        }
    }

    async function addLikeHandler(postid) {

        try {
            const repsonse = await addLikeApi(postid);
            await feedHandler();

        }
        catch (err) {
            throw err
        }
    }

    async function removeLikeHandler(postid) {

        try {
            const response = await removeLikeApi(postid);
            await feedHandler();

        }
        catch (err) {
            throw err
        }
    }

    async function createPostHandler(file, caption) {

        setLoading(true);

        try {
            const response = await createPostApi(file, caption);
        }
        catch (err) {
            throw err
        }
        finally {
            setLoading(false)
        }

    }

    return { feedHandler, addLikeHandler, removeLikeHandler, createPostHandler, context };
}

export default usePost