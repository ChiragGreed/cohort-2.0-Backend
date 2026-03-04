import useUser from '../../../Features/user/hooks/useUser'
import { useEffect } from 'react';
import '../../main.scss'


function Followers() {

    const { getFollowersHandler, context } = useUser();
    const { Followers } = context;

    
    useEffect(() => {
        getFollowersHandler()
    }, [])

    function FollowersRender() {

        if (Followers.length === 0) return;

        return Followers.map((profile, idx) => {
            return <div key={idx} className='user_profile'>

                 <div className='profile_wrapper'>
                    
                    <div className="profile_img">
                        <img src={profile.profile_image} />
                    </div>

                    <p className="username">{profile.username}</p>
                   
                </div>
                
                <button className='follow_btn'>Follow Back</button>

            </div>
        })
    }

    return (
        <div className='followers'>

            <h3>Followers</h3>
            <FollowersRender />

        </div>
    )
}

export default Followers
