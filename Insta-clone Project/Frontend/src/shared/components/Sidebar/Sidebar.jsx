import '../../main.scss'
import { useState } from 'react'
import Followslist from './Followslist Sidebar/Followslist'
import RequestsList from './Requests'

const Sidebar = () => {

    const [Collapsed, setCollapsed] = useState(true)
    const [activeList, setActiveList] = useState(null)

    function SidebarContentCall(list) {
        setActiveList(list)
        if (Collapsed) setCollapsed(false)
        else {
            setCollapsed(true);
            setActiveList(null);
        }
    }

    function SidbarContentRender() {
        if (activeList === 'followlist') return <Followslist />
        if (activeList === 'requestlist') return <RequestsList />
        return null
    }

    return (
        <section className={`sidebar_component ${Collapsed ? "collapsed" : ""}`}>

            {(!activeList || activeList === "followlist") &&
                <button
                    onClick={() => SidebarContentCall('followlist')}
                    className="followlist_btn"
                >
                    <i className="ri-bar-chart-line"></i>
                </button>
            }

            {(!activeList || activeList === "requestlist") &&
                <button
                    onClick={() => SidebarContentCall('requestlist')}
                    className="requestlist_btn"
                >
                    <i className="ri-notification-4-line"></i>
                </button>
            }

            <SidbarContentRender />

        </section>
    )
}

export default Sidebar