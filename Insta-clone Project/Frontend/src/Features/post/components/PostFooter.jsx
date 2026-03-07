import usePost from "../hooks/usePost"

const PostFooter = (props) => {

    const { addLikeHandler, removeLikeHandler } = usePost();


    return (
        <div className='post_footer'>
            <div className='post_features'>
                <div>
                    <i onClick={() => { props.isLiked ? removeLikeHandler(props.postid) : addLikeHandler(props.postid) }} className={props.isLiked ? "ri-heart-fill liked" : "ri-heart-line unliked"}></i>
                    <i className="ri-chat-1-line"></i>
                    <i className="ri-share-forward-line"></i>
                </div>

                <i className="ri-bookmark-line"></i>
            </div>
            <p className="caption">{props.caption}</p>
        </div>
    )
}

export default PostFooter
