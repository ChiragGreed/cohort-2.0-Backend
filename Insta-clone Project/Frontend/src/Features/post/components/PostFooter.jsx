
const PostFooter = (props) => {
    return (
        <div className='post_footer'>
            <div className='post_features'>
                <div>
                    <i className="ri-heart-line"></i>
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
