import { useEffect, useState } from "react";

// COMPONENTS
import ArtistList from '../../components/artists/artistList.component.js';
import Spinner from "../../components/global/spinner.component.js";
// SERVICES
import { loadTop } from "../../services/utils/spotify.utils.js";
// PROVIDERS
import { useAuth } from "../../providers/auth.provider";

function TopArtists()
{
	let auth = useAuth();
	let [mode, setMode] = useState(0);
	let [topArtists, setTopArtists] = useState(null);

	useEffect(() => {
		loadTop(auth.user.access_token, mode, "artists", setTopArtists);
	}, [mode]);

	return (
		<div className="relative container mx-auto lg:px-64 mt-8">
			<div className="flex m-8 justify-center">
				<p className="text-3xl font-bold">TOP ARTISTS</p>
			</div>
			<div className="flex justify-around mx-4">
				<button className={(mode == 0 ? "bg-spotify_pink_secondary" : "bg-spotify_pink") + " rounded-l-full w-full tracking-widest transition-colors text-sm active:bg-spotify_pink_active hover:bg-spotify_pink_secondary text-white h-12 pl-6 pr-6"} onClick={() => {
					setMode(0)
				}}>SINCE LAST MOUTH</button>
				<button className={(mode == 1 ? "bg-spotify_pink_secondary" : "bg-spotify_pink") + " w-full tracking-widest transition-colors text-sm active:bg-spotify_pink_active hover:bg-spotify_pink_secondary text-white h-12 pl-6 pr-6"} onClick={() => {
					setMode(1)
				}}>SINCE 6 MOUTHS</button>
				<button className={(mode == 2 ? "bg-spotify_pink_secondary" : "bg-spotify_pink") + " rounded-r-full w-full tracking-widest transition-colors text-sm active:bg-spotify_pink_active hover:bg-spotify_pink_secondary text-white h-12 pl-6 pr-6"} onClick={() => {
					setMode(2)
				}}>SINCE ALL TIME</button>
			</div>
			{!topArtists ?
			<div className="flex mt-32 justify-center">
				<Spinner/>
			</div> :
			<div className="mx-4 py-8">
				<ArtistList artists={topArtists}/>
			</div>}
		</div>
	);
}

export default TopArtists;