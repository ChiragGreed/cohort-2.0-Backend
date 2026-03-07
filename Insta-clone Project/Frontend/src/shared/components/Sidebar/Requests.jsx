import useUser from '../../../Features/user/hooks/useUser'
import { useEffect } from 'react';

const RequestsList = () => {


    const { getRequestsHandler, acceptRequestHandler, rejectRequestHandler, context } = useUser();
    const { Requests } = context;

    useEffect(() => {
        getRequestsHandler()
    }, [])

    if (Requests.length === 0) return;

    function RequestRender() {

        return Requests.map((profile, idx) => {

            return <div key={idx} className='user_profile'>

                <div className='profile_wrapper'>

                    <div className="profile_img">
                        <img src={profile.profile_image} />
                    </div>

                    <p className="username">{profile.username}</p>

                </div>

                <div onClick={async () => { await acceptRequestHandler(profile.username); getRequestsHandler() }} className='accept_btn'>Accept</div>
                <div onClick={async () => { await rejectRequestHandler(profile.username); getRequestsHandler() }} className='reject_btn'>Reject</div>

            </div>
        })

    }

    return (
        <div className='Requestlist'>

            <h3>Requests</h3>

            <RequestRender />

        </div>
    )
}

export default RequestsList
