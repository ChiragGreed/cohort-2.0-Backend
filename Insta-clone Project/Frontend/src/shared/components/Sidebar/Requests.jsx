import useUser from '../../../Features/user/hooks/useUser'
import { useEffect } from 'react';

const Suggestions = () => {


    const { otherUsersHandler, followUserHandler, context } = useUser();
    const { OtherUsers } = context;

    useEffect(() => {
        otherUsersHandler()
    }, [])

    function RequestRender() {

        if (OtherUsers.length === 0) return;

        return OtherUsers.map((profile, idx) => {
            return <div key={idx} className='user_profile'>

                <div className='profile_wrapper'>

                    <div className="profile_img">
                        <img src={profile.profile_image} />
                    </div>

                    <p className="username">{profile.username}</p>

                </div>

                <div onClick={() => { followUserHandler(profile.username) }} className='request_div'>Request sent</div>

            </div>
        })
    }

    return (
        <div className='Requests'>

            <h3>Requests</h3>

            <RequestRender />

        </div>
    )
}

export default Suggestions
