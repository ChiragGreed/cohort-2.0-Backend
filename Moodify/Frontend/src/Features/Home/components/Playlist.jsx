import useSongs from "../hooks/useSongs";
import '../style/playlist.scss'

const Playlist = () => {
    const { context } = useSongs();
    const { Song, currentIndex } = context;
    

    if (!Song || Song.length == 0) return <div className="playlist"></div>

    return (
        <div className='playlist'>
            {Song.map((music, idx) => (
                <button
                    key={music._id || idx}
                    className={`playlist-item ${idx === currentIndex ? 'active' : ''}`}
                    onClick={() => handleSelect(idx)}
                >
                    {music.title}
                </button>
            ))}
        </div>
    )
}

export default Playlist
