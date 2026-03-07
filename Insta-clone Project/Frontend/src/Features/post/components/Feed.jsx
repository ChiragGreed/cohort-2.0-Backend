import '../style/feed.scss'
import Post from '../components/Post'
import usePost from '../hooks/usePost'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/hooks/useAuth';

const Feed = () => {

    const { context, feedHandler } = usePost();
    const { protectedHandler } = useAuth();
    const { Loading, Feed } = context;
    const navigate = useNavigate();


    useEffect(() => {
        async function checkAuth() {
            const isAuth = await protectedHandler();

            if (!isAuth) {
                navigate('/login');
            }
            await feedHandler();
        }

        checkAuth();
        return;
    }, [])


    if(Loading || !Feed) return <h1>Loading...</h1>



    function FeedRender() {
        return Feed?.map((post, idx) => {
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
