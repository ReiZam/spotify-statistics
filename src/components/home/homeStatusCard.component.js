import { useEffect, useState } from "react";
import { useAuth } from "../../providers/auth.provider.js";

// COMPONENTS
import Spinner from '../spinner.component.js';

// SERVICES
import { SpotifyAgent } from '../../services/spotify.service.js';
import { checkAndRequestRefreshToken } from '../../utils/spotify.utils.js';

function HomeStatusCard()
{
	let auth = useAuth();
	let [profile, setProfile] = useState(null);

	useEffect(() => {
		checkAndRequestRefreshToken(auth, (token) => {
			SpotifyAgent.current(token.access_token).then((result) => {
				setProfile(result.data);
			});
		});
	}, [])

	return (
		<div className="grid place-items-center rounded-3xl bg-white mx-4 py-8 h-56">
			<div className="flex flex-row">
				<p className="text-4xl font-bold text-spotify_text_color antialiased">Spotify</p>
				<p className="text-lg font-thin mt-2.5 text-spotify_text_color antialiased">statistics</p>
			</div>
			{!profile ? <Spinner/> :
			<div className="text-center">
				<p className="text-xl font-medium">Hello {profile.display_name},</p>
				<p className="text-sm font-light">What would you like to know about your musical tastes ?</p>
			</div>
			}
		</div>
	);
}

export default HomeStatusCard;