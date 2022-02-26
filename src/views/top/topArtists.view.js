import { useEffect, useState } from "react";

// COMPONENTS
import TimeSelector from "../../components/top/timeSelector.component.js";
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
			<TimeSelector mode={mode} setMode={setMode}
				defaultClassName="bg-spotify_pink w-full tracking-widest transition-colors text-xs md:text-sm active: hover:bg-spotify_pink_secondary active:spotify_pink_active text-white h-16 md:h-12 pl-6 pr-6"
				activeClassName="bg-spotify_pink_secondary w-full tracking-widest transition-colors text-xs md:text-sm active: hover:bg-spotify_pink_secondary active:spotify_pink_active text-white h-16 md:h-12 pl-6 pr-6"/>
			{!topArtists ?
			<div className="flex mt-48 mb-32 justify-center">
				<Spinner/>
			</div> :
			<div className="mx-4 py-8">
				<ArtistList artists={topArtists}/>
			</div>}
		</div>
	);
}

export default TopArtists;