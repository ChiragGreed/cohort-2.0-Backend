import Followers from "./Followers"
import Followings from "./Followings"
import Suggestions from "./Suggestions"
import '../../../main.scss'


const Followslist = () => {
  return (
    <div className='Followlist'>
      <Followers/>
      <Followings />
      <Suggestions />
    </div>
  )
}

export default Followslist
