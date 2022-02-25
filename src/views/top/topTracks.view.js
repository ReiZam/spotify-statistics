import { useEffect, useState } from "react";
import { useAuth } from "../../providers/auth.provider.js";

// SERVICES
import { loadTop } from "../../services/utils/spotify.utils";
// COMPONENTS
import Spinner from "../../components/global/spinner.component.js";
import TimeSelector from '../../components/global/timeSelector.component.js';
import TrackList from '../../components/tracks/trackList.component.js';

function TopTracks()
{
	let [mode, setMode] = useState(0);
	let [topTracks, setTopTracks] = useState(null);
	let auth = useAuth();

	useEffect(() => {
		loadTop(auth.user.access_token, mode, "tracks", setTopTracks);
	}, [mode]);

	return (
		<div className="relative container mx-auto lg:px-64 mt-8">
			<div className="flex m-8 justify-center">
				<p className="text-3xl font-bold">TOP TRACKS</p>
			</div>
			<TimeSelector mode={mode} setMode={setMode} primaryColor="bg-spotify_red" secondaryColor="bg-spotify_red_secondary" activeColor="bg-spotify_red_active" />
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