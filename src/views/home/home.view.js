// COMPONENTS
import { Link } from 'react-router-dom';
import HomeFadeTitles from '../../components/home/homeFadeTitles.component.js';

function Home(props)
{
	const {authorization_content} = props;

	return (
		<div className="relative h-screen">
			<div className="container mx-auto lg:px-64 mt-8">
				<div className="grid place-items-center shadow mx-2 rounded-3xl bg-white mx-auto py-8 h-56">
					<div className="flex flex-row">
						<p className="text-4xl font-bold text-spotify_text_color antialiased">Spotify</p>
						<p className="text-lg font-thin mt-2.5 text-spotify_text_color antialiased">stats</p>
					</div>
					<p className="font-medium py-4 text-spotify_text_color">Please sign in with your Spotify account to view your stats</p>
					<a href={authorization_content.authorize_link}  onClick={() => {
							window.localStorage.setItem("code_verifier", authorization_content.code_verifier);
					}}>
						<button className="rounded-full tracking-widest transition-colors active:bg-spotify_green_primary_alternative text-sm bg-spotify_green_primary_alternative font-bold text-white h-12 pl-6 pr-6 hover:bg-spotify_green_secondary">LOGIN WITH SPOTIFY</button>
					</a>
				</div>
				<div className="flex w-full justify-around mt-12">
					<img className="md:h-16 h-8" src={require('./music.png')}/>
					<img className="md:h-16 h-8" src={require('./singer.png')}/>
					<img className="md:h-16 h-8" src={require('./favorite.png')}/>
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
		</div>
	);
}

export default Home;