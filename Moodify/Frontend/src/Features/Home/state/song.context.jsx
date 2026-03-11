import { createContext } from "react";
import { useState } from "react";


export const songContext = createContext();

const SongContextProvider = ({ children }) => {

    const [Song, setSong] = useState(null);
    const [Loading, setLoading] = useState(false);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);


    return (
        <songContext.Provider value={{ Song, setSong, Loading, setLoading, currentIndex, setCurrentIndex, isPlaying, setIsPlaying, progress, setProgress, duration, setDuration }}>
            {children}
        </songContext.Provider>
    )
}

export default SongContextProvider
