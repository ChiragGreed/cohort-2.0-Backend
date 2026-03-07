import useUser from '../../../../Features/user/hooks/useUser';
import { useEffect } from 'react';


function Followers() {

    const { getFollowersHandler, getFollowingHandler, followUserHandler, context } = useUser();
    const { Followers, Following } = context;


    useEffect(() => {
        getFollowersHandler()
    }, [])

    function FollowersRender() {

        if (!Followers || Followers.length === 0) return;

        return Followers.map((profile, idx) => {

            return <div key={idx} className='user_profile'>

                <div className='profile_wrapper'>

                    <div className="profile_img">
                        <img src={profile.profile_image} />
                    </div>

                    <p className="username">{profile.username}</p>

                </div>


                {(Following.some(user => user.username === profile.username)) ? null : <button onClick={async () => { await followUserHandler(profile.username); getFollowersHandler(); getFollowingHandler() }} className='follow_btn'>Follow Back</button>}
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
