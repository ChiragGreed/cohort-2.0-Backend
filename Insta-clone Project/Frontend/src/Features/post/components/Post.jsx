import PostHeader from '../components/postHeader'
import PostFooter from '../components/PostFooter'
import PostContent from '../components/PostContent'

const Post = (props) => {
    return (
        <div className="post_container">

            <PostHeader username={props.username} profile_image={props.profile_image} />

            <PostContent content={props.content} />

            <PostFooter isLiked={props.isLiked} caption={props.caption} postid={props.postid} />

        </div>
    )
}

export default Post
