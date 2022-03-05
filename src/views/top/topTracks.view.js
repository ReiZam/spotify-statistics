import { useEffect, useState } from "react";
import { useAuth } from "../../providers/auth.provider.js";

// SERVICES
import { loadTop } from "../../utils/spotify.utils";
// COMPONENTS
import Spinner from "../../components/spinner.component.js";
import TimeSelector from '../../components/top/timeSelector.component.js';
import TrackList from '../../components/tracks/trackList.component.js';

function TopTracks()
{
	let [mode, setMode] = useState(0);
	let [topTracks, setTopTracks] = useState(null);
	let auth = useAuth();

	useEffect(() => {
		loadTop(auth, mode, "tracks", setTopTracks);
	}, [mode]);

	return (
		<div className="relative container mx-auto lg:px-64 mt-8">
			<div className="flex m-8 justify-center">
				<p className="text-3xl font-bold">TOP TRACKS</p>
			</div>
			<TimeSelector mode={mode} setMode={setMode}
				defaultClassName="bg-spotify_red w-full tracking-widest transition-colors text-xs md:text-sm active: hover:bg-spotify_red_secondary active:spotify_red_active text-white h-16 md:h-12 pl-6 pr-6"
				activeClassName="bg-spotify_red_secondary w-full tracking-widest transition-colors text-xs md:text-sm active: hover:bg-spotify_red_secondary active:spotify_red_active text-white h-16 md:h-12 pl-6 pr-6"/>
			{!topTracks ?
			<div className="flex mt-48 mb-32 justify-center">
				<Spinner/>
			</div> :
			<div className="mx-4 py-8">
				<TrackList tracks={topTracks}/>
			</div>}
		</div>
	);
}

export default TopTracks;