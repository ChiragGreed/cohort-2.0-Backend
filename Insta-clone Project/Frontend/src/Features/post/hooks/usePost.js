import { useContext } from "react";
import { PostContext } from "../postContext";
import { feedApi } from "../services/post.api";


const usePost = () => {
    const context = useContext(PostContext);

    const { setLoading, setFeed } = context;

    async function feedHandler() {

        setLoading(true);

        try {
            const feedData = await feedApi()
            setFeed(feedData.data.feed);
        }
        catch (err) {
            throw err;
        }
        finally {
            setLoading(false);
        }
    }

    return { feedHandler, context };
}

export default usePost