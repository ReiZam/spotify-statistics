import { useEffect, useState } from "react";
import { useAuth } from "../../providers/auth.provider";

// COMPONENTS
import Spinner from "../../components/global/spinner.component";
import TrackList from '../../components/tracks/tracksList.component.js';
// SERVICES
import { SpotifyAgent } from '../../services/api/spotify.api.js';

function getTimeRange(mode)
{
	switch (mode)
	{
		case 0:
		default:
			return ("short_term");
		case 1:
			return ("medium_term");
		case 2:
			return ("long_term");
	}
}

function loadTopTracks(access_token, mode, setTopTracks)
{
	setTopTracks(null);

	SpotifyAgent.top(access_token, "tracks", "?limit=50&time_range=" + getTimeRange(mode)).then((result) => {
		setTopTracks(result.data);
	});
}

function TopTracks()
{
	let [mode, setMode] = useState(0);
	let [topTracks, setTopTracks] = useState(null);
	let auth = useAuth();

	useEffect(() => {
		loadTopTracks(auth.user.access_token, mode, setTopTracks);
	}, []);

	return (
		<div className="relative container mx-auto lg:px-64 mt-8">
			<div className="flex m-8 justify-center">
				<p className="text-3xl font-bold">TOP TRACKS</p>
			</div>
			<div className="flex justify-around mx-4">
				<button className={(mode == 0 ? "bg-spotify_red_secondary" : "bg-spotify_red") + " rounded-l-full w-full tracking-widest transition-colors text-sm active:bg-spotify_red_active hover:bg-spotify_red_secondary text-white h-12 pl-6 pr-6"} onClick={() => {
					if (mode != 0)
					{
						setMode(0)
						loadTopTracks(auth.user.access_token, 0, setTopTracks);
					}	
				}}>SINCE LAST MOUTH</button>
				<button className={(mode == 1 ? "bg-spotify_red_secondary" : "bg-spotify_red") + " w-full tracking-widest transition-colors text-sm active:bg-spotify_red_active hover:bg-spotify_red_secondary text-white h-12 pl-6 pr-6"} onClick={() => {
					if (mode != 1)
					{
						setMode(1)
						loadTopTracks(auth.user.access_token, 1, setTopTracks);
					}	
				}}>SINCE 6 MOUTHS</button>
				<button className={(mode == 2 ? "bg-spotify_red_secondary" : "bg-spotify_red") + " rounded-r-full w-full tracking-widest transition-colors text-sm active:bg-spotify_red_active hover:bg-spotify_red_secondary text-white h-12 pl-6 pr-6"} onClick={() => {
					if (mode != 2)
					{
						setMode(2)
						loadTopTracks(auth.user.access_token, 2, setTopTracks);
					}	
				}}>SINCE ALL TIME</button>
			</div>
			{!topTracks ?
			<div className="flex mt-32 justify-center">
				<Spinner/>
			</div> :
			<div className="mx-4 py-8">
				<TrackList tracks={topTracks}/>
			</div>}
		</div>
	);
}

export default TopTracks;