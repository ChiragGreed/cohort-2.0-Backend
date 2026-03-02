import useUser from '../../../Features/user/hooks/useUser'
import { useEffect } from 'react';

const Suggestions = () => {
    const { otherUsersHandler, context } = useUser();
    const { Loading, OtherUsers } = context;


    if (Loading) return (
        <div className='suggestions'>
            <h1>Loading...</h1>
        </div>
    )

    useEffect(() => {
        otherUsersHandler()
    }, [])

    function SuggestionsRender() {

        if (OtherUsers.length === 0) return;

        return OtherUsers.map((profile, idx) => {
            return <div key={idx} className='user_profile'>

                <div className="profile_img">
                    <img src={profile.profile_image} />
                </div>

                <p className="username">{profile.username}</p>

                <button className='follow_btn'>Follow</button>
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
