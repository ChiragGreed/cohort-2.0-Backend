import { useNavigate } from 'react-router-dom'
import ThemeToggle from './ThemeToggle';

const Navigation = () => {
    const naviagte = useNavigate();


    function createPost() {
        naviagte('/createPost');
    }

    return (
        <nav className='Navbar'>

            <div className='appLogo'>
                <img src="https://ik.imagekit.io/lfqmv9rcq/Insta-clone-Posts/App-logo/appLogo.png" />
                <h1>Sociofy</h1>
            </div>

            <div className='create_post_wrapper'>

                <label htmlFor="createPostbtn">
                    <i className="ri-add-line"></i>
                </label>

                <button onClick={createPost} id="createPostbtn">Create Post</button>

            </div>

            <ThemeToggle/>

        </nav>
    )
}

export default Navigation
