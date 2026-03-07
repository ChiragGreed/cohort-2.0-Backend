import usePost from '../hooks/usePost';

const PostContent = (props) => {
    const { addLikeHandler, removeLikeHandler } = usePost();


    return (
        <div className='content' onDoubleClick={() => { props.isLiked ? removeLikeHandler(props.postid) : addLikeHandler(props.postid) }}>
            <img src={props.content} />
        </div>
    )
}

export default PostContent
