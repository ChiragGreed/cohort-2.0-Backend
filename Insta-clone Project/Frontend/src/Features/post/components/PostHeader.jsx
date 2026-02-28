
const PostHeader = (props) => {
    return (
        <div className='post_header'>
            <div className="profile_img">
                <img src={props.profile_image} />
            </div>
            <p className="username">{props.username}</p>

        </div>
    )
}

export default PostHeader
