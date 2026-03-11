import Expression from '../../expressions/pages/Expression'
import Player from '../components/Player'
import Playlist from '../components/playlist'
import useSongs from '../hooks/useSongs'
import '../style/Home.scss'

const Home = () => {
  const { songHandler } = useSongs();

  return (
    <div className='Home'>
      <Expression onClick={(mood) => songHandler(mood)} />
      <Player />
      <Playlist/>
    </div>
  )
}

export default Home
