
import Navigation from '../../../shared/components/Navigation';
import Sidebar from '../../../shared/components/Sidebar/Sidebar';
import Feed from '../components/Feed';


const Home = () => {


    return (
        <main className='Home_page'>
            <Feed/>
            <Navigation />
            <Sidebar/>
        </main >
    )
}

export default Home
