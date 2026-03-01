import '../style/feed.scss'
import usePost from '../hooks/usePost'
import Post from '../components/Post'
import { useEffect } from 'react';


const Feed = () => {

    const { context, feedHandler } = usePost();
    const { Loading, Feed } = context;

    useEffect(() => {
        feedHandler();
    }, [])

    if (Loading || !Feed?.length) return (
        <main>
            <h1>Loading feed...</h1>
        </main>
    )
    console.log(Feed);

    function FeedRender() {
        return Feed.map(post => {
            return <Post caption={post.caption} content={post.content} profile_image={post.userid.profile_image} username={post.userid.username} />
        });
    }

    return (
        <main>
            <div className="feed">
                <FeedRender />
            </div>
        </main >
    )
}

export default Feed
