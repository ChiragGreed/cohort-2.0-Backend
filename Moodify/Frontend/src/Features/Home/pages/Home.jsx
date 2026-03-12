import Expression from '../../expressions/pages/Expression'
import Player from '../components/player'
import Playlist from '../components/playlist'
import useSongs from '../hooks/useSongs'
import { useState } from 'react'
import '../style/Home.scss'

const Home = () => {
  const { songHandler } = useSongs();
  const [isPlaylistOpen, setIsPlaylistOpen] = useState(true);

  return (
    <div className='Home'>

      <button
        className={`playlist-toggle ${isPlaylistOpen ? 'open' : 'closed'}`}
        onClick={() => setIsPlaylistOpen(!isPlaylistOpen)}
        title={isPlaylistOpen ? 'Close Playlist' : 'Open Playlist'}
      >
        <i className='ri-menu-3-line'></i>
      </button>

      <div className='Home_content'>

        <Expression onClick={(mood) => songHandler(mood)} />

        {isPlaylistOpen && <Playlist />}
      </div>

      <Player />
    </div >
  )
}

export default Home
