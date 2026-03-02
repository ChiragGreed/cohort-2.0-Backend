import { createContext, useState } from "react"


export const UserContext = createContext();

function UserProvider({ children }) {

    const [Loading, setLoading] = useState(false);
    const [Followers, setFollowers] = useState([]);
    const [Following, setFollowing] = useState([]);
    const [OtherUsers, setOtherUsers] = useState([]);

    return (
        <UserContext.Provider value={{ Loading, setLoading, Followers, setFollowers, Following, setFollowing, OtherUsers, setOtherUsers }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider
