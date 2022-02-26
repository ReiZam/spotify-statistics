// COMPONENTS
import HomeFadeTitles from '../components/home/homeFadeTitles.component.js';
import HomeConnectCard from '../components/home/homeConnectCard.component.js';
import HomeStatusCard from '../components/home/homeStatusCard.component.js';
import HomeTopButton from '../components/home/homeTopButton.component.js';
// PROVIDER
import { useAuth } from '../providers/auth.provider.js';

function Home(props)
{
	const {authorization_content} = props;
	let auth = useAuth();

	return (
		<div className="relative container mx-auto lg:px-64 mt-8">
			{!auth.user ? <HomeConnectCard authorization_content={authorization_content}/> : <HomeStatusCard/>}
			<div className="flex w-full justify-around mt-12">
				<img className="md:h-16 h-8" src={require('./assets/music.png')}/>
				<img className="md:h-16 h-8" src={require('./assets/singer.png')}/>
				<img className="md:h-16 h-8" src={require('./assets/favorite.png')}/>
			</div>
			<div className="mt-4">
				<HomeFadeTitles titles={["Explore your favorites songs", "Get a glimpse of your favorite artists", "Know your favorite music genres"]} description="You are able to see a classement of your most listened songs."/>
			</div>
			<div className="flex w-full justify-around mt-16 mb-12 py-8">
				<HomeTopButton className="rounded-full tracking-widest transition-colors text-xs md:text-sm bg-spotify_purple active:bg-spotify_purple hover:bg-spotify_purple/75 font-bold text-white h-12 pl-4 pr-4 md:pl-6 md:pr-6" authorization_content={authorization_content} title="TOP ARTISTS" loggedLink={"/top/artists"}/>
				<HomeTopButton className="rounded-full tracking-widest transition-colors text-xs md:text-sm bg-spotify_yellow active:bg-spotify_yellow hover:bg-spotify_yellow/75 font-bold text-white h-12 pl-4 pr-4 md:pl-6 md:pr-6" authorization_content={authorization_content} title="TOP ARTISTS" loggedLink={"/top/artists"}/>
				<HomeTopButton className="rounded-full tracking-widest transition-colors text-xs md:text-sm bg-spotify_cyan active:bg-spotify_cyan hover:bg-spotify_cyan/75 font-bold text-white h-12 pl-4 pr-4 md:pl-6 md:pr-6" authorization_content={authorization_content} title="TOP GENRES" loggedLink={"/top/genres"}/>
			</div>
		</div>
	);
}

export default Home;