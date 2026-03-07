import useUser from '../../../../Features/user/hooks/useUser';
import { useEffect } from 'react';

const Suggestions = () => {


    const { otherUsersHandler, followUserRequestHandler, getSentRequestsHandler, context } = useUser();
    const { OtherUsers, Following, SentRequests } = context;

    useEffect(() => {
        otherUsersHandler();
        getSentRequestsHandler();
    }, [])

    function SuggestionsRender() {

        if (OtherUsers.length === 0) return;

        return OtherUsers.map((profile, idx) => {

            if (Following.some(user => user.username === profile.username)) return null;
            return <div key={idx} className='user_profile'>

                <div className='profile_wrapper'>

                    <div className="profile_img">
                        <img src={profile.profile_image} />
                    </div>

                    <p className="username">{profile.username}</p>

                </div>


                {SentRequests.some(req => req.requestee === profile.username) ?
                    <div onClick={async () => { followUserHandler(profile.username) }} className='request_div'>Request sent</div>
                    :
                    <button onClick={async () => { await followUserRequestHandler(profile.username) }} className='follow_btn'>Follow</button>
                }

            </div>

        })
    }

    return (
        <div className='suggestions'>

            <h3>Suggestions</h3>

            <SuggestionsRender />

        </div>
    )
}

export default Suggestions
