import { createContext } from "react";
import { useState } from "react";

export const PostContext = createContext();


function PostProvider({ children }) {

    const [Loading, setLoading] = useState(false);
    const [Post, setPost] = useState(null);
    const [Feed, setFeed] = useState(null);



    return (
        <PostContext.Provider value={{ Loading, setLoading, Post, setPost, Feed, setFeed }}>
            {children}
        </PostContext.Provider>
    )
}

export default PostProvider