import '../../main.scss'
import useUser from '../../../Features/user/hooks/useUser'


import Followers from './Followers';
import Followings from './Followings';
import Suggestions from './Suggestions';
import { useState } from 'react';

const Sidebar = () => {
    const [Collapsed, setCollapsed] = useState(false);

    function resize() {
        Collapsed ? setCollapsed(false) : setCollapsed(true);
    }


    return (
        <section className={`sidebar_component ${Collapsed ? "collapsed" : ""}`}>

            <button onClick={resize} className="followlist_btn">
                <i className="ri-bar-chart-line"></i>
            </button>

            <div className='Followlist'>
                <Followers />
                <Followings />
                <Suggestions />
            </div>

            <div className='requests'>
                <div>
                    
                </div>
            </div>
        </section>
    )
}

export default Sidebar
