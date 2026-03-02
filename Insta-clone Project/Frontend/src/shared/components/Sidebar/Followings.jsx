import useUser from '../../../Features/user/hooks/useUser'
import { useEffect } from 'react';

const Followings = () => {

  const { getFollowingHandler, context } = useUser();
  const { Loading, Following } = context;

  if (Loading) return (
    <div className='following'>
      <h1>Loading...</h1>
    </div>
  )

  useEffect(() => {
    getFollowingHandler()
  }, [])

  function FollowingRender() {

    if (Following.length === 0) return;

    return Following.map((profile, idx) => {
      return <div key={idx} className='user_profile'>

        <div className="profile_img">
          <img src={profile.profile_image} />
        </div>

        <p className="username">{profile.username}</p>
      </div>
    })
  }

  return (
    <div className='following'>

      <h3>Following</h3>

      <FollowingRender />

    </div>
  )
}

export default Followings
