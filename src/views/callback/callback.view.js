import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Navigate, useLocation } from "react-router";
import { useAuth } from "../../providers/auth.provider";
import { requestSpotifyAccessToken } from "../../services/api/spotify.api";

function useQuery()
{
	const { search } = useLocation();
  
	return React.useMemo(() => new URLSearchParams(search), [search]);
}

function Callback()
{
	let query = useQuery();
	let auth = useAuth();

	useEffect(() => {
		if (query.has("code"))
		{
			requestSpotifyAccessToken(query.get("code")).then((payload) => {
				const tokenObj = {
					access_token: payload.data.access_token,
					refresh_token: payload.data.refresh_token,
					token_type: payload.data.token_type,
					expires: Date.now() + payload.data.expires_in * 1000
				};
				
				auth.login(tokenObj, () => {});
				window.localStorage.removeItem("code_verifier");
			}).catch((err) => {
				console.log(err);
			});
		}
	}, []);

	if (auth.user)
		return (<Navigate to="/" replace/>);
	return (
		<div className="relative h-screen">
			<div className="container mx-auto lg:px-64 mt-8">
				<div className="grid place-items-center shadow mx-2 rounded-3xl bg-white mx-auto py-8">
					<p className="text-4xl font-bold text-spotify_text_color antialiased">{query.has("error") ? "An error has occurred..." : "Connecting..."}</p>
					{
						query.has("error") &&
						<>
							<p className="text-xl font-medium py-2 text-red-500">{query.get("error")}</p>
							<p className="text-sm font-medium py-2 text-spotify_text_color">Please try to log in again.</p>
						</>
					}
				</div>
			</div>
		</div>
	);
}

export default Callback;