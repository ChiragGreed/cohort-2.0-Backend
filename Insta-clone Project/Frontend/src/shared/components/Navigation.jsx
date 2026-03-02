import { useNavigate } from 'react-router-dom'

const Navigation = () => {
    const naviagte = useNavigate();


    function createPost() {
        naviagte('/createPost');
    }
    
    return (
        <nav className='Navbar'>

            <div className='create_post_wrapper'>
            
                <label htmlFor="createPostbtn">
                    <i className="ri-add-line"></i>
                </label>
            
                <button onClick={createPost} id="createPostbtn">Create Post</button>
            
            </div>
        </nav>
    )
}

export default Navigation
