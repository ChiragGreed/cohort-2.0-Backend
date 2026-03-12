import useSongs from "../hooks/useSongs";
import '../style/playlist.scss'

const Playlist = () => {
    const { context } = useSongs();
    const { Song, currentIndex, setCurrentIndex, setIsPlaying } = context;

    const handleSelect = (index) => {
        setCurrentIndex(index);
        setIsPlaying(true);
    };
    console.log(Song);

    if (!Song || Song.length === 0) return ;

    return (
        <div className='playlist'>
            {Song.map((music, idx) => (
                <button
                    key={music._id || idx}
                    className={`playlist-item ${idx === currentIndex ? 'active' : ''}`}
                    onClick={() => handleSelect(idx)}
                >
                    {music.coverUrl && (
                        <img className='playlist-cover' src={music.coverUrl} alt={music.title} />
                    )}
                    <div className='playlist-meta'>
                        <span className='playlist-title'>{music.title}</span>
                        {music.artist && <span className='playlist-artist'>{music.artist}</span>}
                    </div>
                </button>
            ))}
        </div>
    )
}

export default Playlist
