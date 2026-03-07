import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/createPost.scss'
import usePost from '../hooks/usePost'


const CreatePost = () => {

    const [Caption, setCaption] = useState('');
    const PostFileRef = useRef(null);

    const navigate = useNavigate();

    const { createPostHandler, context } = usePost();
    const { Loading } = context;

    if (Loading) return (
        <main className='createPost_page'>
            <h1>Uploading Post...</h1>
        </main>
    )

    async function submitHandler(e) {
        e.preventDefault();
        const File = PostFileRef.current.files[0];
        console.log(File);

        await createPostHandler(File, Caption);

        navigate('/');
    }


    return (
        <main className='createPost_page'>

            <button onClick={() => { navigate('/') }} className='back_btn'><i className="ri-arrow-left-line"></i></button>

            <div className='createPost_form_container'>

                <form onSubmit={(e) => submitHandler(e)}>

                    <label htmlFor="file_upload" ><p>Select image file </p></label>

                    <input hidden type="file" ref={PostFileRef} id="file_upload" />
                    
                    <input onChange={(e) => { setCaption(e.target.value) }} value={Caption} type="text" name="caption" placeholder='Enter caption' />

                    <button className='upload_btn'>Upload</button>

                </form>
            </div>

        </main>
    )
}

export default CreatePost
