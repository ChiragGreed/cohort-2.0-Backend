import '../../main.scss'

import Followers from './Followers';
import Followings from './Followings';
import Suggestions from './Suggestions';

const Sidebar = () => {
    
    return (
        <section className='sidebar_component'>

            <Followers/>
            <Followings/>
            <Suggestions/>

        </section>
    )
}

export default Sidebar
