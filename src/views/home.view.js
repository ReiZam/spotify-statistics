import { Link } from 'react-router-dom';

// COMPONENTS
import HomeFadeTitles from '../components/home/homeFadeTitles.component.js';
import HomeConnectCard from '../components/home/homeConnectCard.component.js';
import HomeStatusCard from '../components/home/homeStatusCard.component.js';
// PROVIDER
import { useAuth } from '../providers/auth.provider.js';

function Home(props)
{
	let auth = useAuth();

	return (
		<div className="relative container mx-auto lg:px-64 mt-8">
			{!auth.user ? <HomeConnectCard authorization_content={props.authorization_content}/> : <HomeStatusCard/>}
			<div className="flex w-full justify-around mt-12">
				<img className="md:h-16 h-8" src={require('./assets/music.png')}/>
				<img className="md:h-16 h-8" src={require('./assets/singer.png')}/>
				<img className="md:h-16 h-8" src={require('./assets/favorite.png')}/>
			</div>
			<div className="mt-4">
				<HomeFadeTitles titles={["Explore your favorites songs", "Get a glimpse of your favorite artists", "Know your favorite music genres"]} description="You are able to see a classement of your most listened songs."/>				</div>
			<div className="flex w-full justify-around mt-8">
				<button className="rounded-full tracking-widest transition-colors text-sm bg-spotify_purple active:bg-spotify_purple hover:bg-spotify_purple/75 font-bold text-white h-12 pl-6 pr-6">
					<Link to="/stats/tracks">TOP TRACKS</Link>
				</button>
				<button className="rounded-full tracking-widest transition-colors text-sm bg-spotify_yellow active:bg-spotify_yellow hover:bg-spotify_yellow/75 font-bold text-white h-12 pl-6 pr-6">
					<Link to="/stats/artists">TOP ARTISTS</Link>
				</button>
				<button className="rounded-full tracking-widest transition-colors text-sm bg-spotify_cyan active:bg-spotify_cyan hover:bg-spotify_cyan/75 font-bold text-white h-12 pl-6 pr-6">
					<Link to="/stats/genres">TOP GENRES</Link>
				</button>
			</div>
		</div>
	);
}

export default Home;