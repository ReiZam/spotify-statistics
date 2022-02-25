import { useEffect, useState } from "react";

// COMPONENT
import Spinner from "../../components/global/spinner.component";
import TimeSelector from "../../components/top/timeSelector.component";
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
			<TimeSelector mode={mode} setMode={setMode}
				defaultClassName="bg-spotify_blue w-full tracking-widest transition-colors text-sm active: hover:bg-spotify_blue_secondary active:spotify_blue_active text-white h-12 pl-6 pr-6"
				activeClassName="bg-spotify_blue_secondary w-full tracking-widest transition-colors text-sm active: hover:bg-spotify_blue_secondary active:spotify_blue_active text-white h-12 pl-6 pr-6"/>
			{!topGenres || !topArtists ?
			<div className="flex mt-48 mb-32 justify-center">
				<Spinner/>
			</div> :
			<div className="mx-4 py-8">
				<GenreList genres={topGenres}/>
			</div>}
		</div>
	);
}

export default TopGenres;