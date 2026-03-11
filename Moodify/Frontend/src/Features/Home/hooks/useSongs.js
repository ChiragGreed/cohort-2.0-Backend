import { useContext } from "react";
import { songContext } from "../state/song.context";
import { getSongsApi } from "../services/songsApi";

const useSongs = () => {

    const context = useContext(songContext);
    const { setSong, setLoading } = context;

    const songHandler = async (mood) => {

        console.log(mood);
        setLoading(true);
        try {
            const response = await getSongsApi(mood);
            setSong(response.data.songs);
        }
        catch (err) {
            return err;
        }
        finally {
            setLoading(false)
        }

    }
    

    return { context, songHandler }
}

export default useSongs