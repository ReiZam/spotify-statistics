import { useEffect, useState } from "react";

// COMPONENT
import Spinner from "../../components/global/spinner.component";
import GenreList from '../../components/genres/genreList.component.js';
// PROVIDERS
import { useAuth } from "../../providers/auth.provider";
// SERVICES
import { loadTop, topArtistsToTopGenres } from "../../services/utils/spotify.utils";

function TopGenres()
{
	let auth = useAuth();
	let [mode, setMode] = useState(0);
	let [topArtists, setTopArtists] = useState(null);
	let [topGenres, setTopGenres] = useState(null);

	useEffect(() => {
		loadTop(auth.user.access_token, mode, "artists", setTopArtists);
	}, [mode]);

	useEffect(() => {
		if (topArtists != null)
			setTopGenres(topArtistsToTopGenres(topArtists));
	}, [topArtists]);

	return (
		<div className="relative container mx-auto lg:px-64 mt-8">
			<div className="flex m-8 justify-center">
				<p className="text-3xl font-bold">TOP GENRES</p>
			</div>
			<div className="flex justify-around mx-4">
				<button className={(mode == 0 ? "bg-spotify_blue_secondary" : "bg-spotify_blue") + " rounded-l-full w-full tracking-widest transition-colors text-sm active:bg-spotify_blue_active hover:bg-spotify_blue_secondary text-white h-12 pl-6 pr-6"} onClick={() => {
					if (mode != 0)
						setMode(0)
				}}>SINCE LAST MOUTH</button>
				<button className={(mode == 1 ? "bg-spotify_blue_secondary" : "bg-spotify_blue") + " w-full tracking-widest transition-colors text-sm active:bg-spotify_blue_active hover:bg-spotify_blue_secondary text-white h-12 pl-6 pr-6"} onClick={() => {
					if (mode != 1)
						setMode(1)
				}}>SINCE 6 MOUTHS</button>
				<button className={(mode == 2 ? "bg-spotify_blue_secondary" : "bg-spotify_blue") + " rounded-r-full w-full tracking-widest transition-colors text-sm active:bg-spotify_blue_active hover:bg-spotify_blue_secondary text-white h-12 pl-6 pr-6"} onClick={() => {
					if (mode != 2)
						setMode(2)
				}}>SINCE ALL TIME</button>
			</div>
			{!topGenres || !topArtists ?
			<div className="flex mt-32 justify-center">
				<Spinner/>
			</div> :
			<div className="mx-4 py-8">
				<GenreList genres={topGenres}/>
			</div>}
		</div>
	);
}

export default TopGenres;