import '../style/feed.scss'
import Post from '../components/Post'
import usePost from '../hooks/usePost'
import { useEffect } from 'react';

const Feed = () => {

    const { context, feedHandler } = usePost();
    const { Loading, Feed } = context;

    useEffect(() => {
        feedHandler();
    }, [])

    if (Loading || !Feed?.length) return <h1>Loading feed...</h1>


    function FeedRender() {
        return Feed.map((post, idx) => {
            return <Post key={idx} isLiked={post.isLiked} postid={post._id} caption={post.caption} content={post.content} profile_image={post.userid.profile_image} username={post.userid.username} />
        });
    }


    return (
        <div className="feed">
            <FeedRender />

        </div>
    )
}

export default Feed
