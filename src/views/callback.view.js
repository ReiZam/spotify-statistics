import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router";
import { useAuth } from "../providers/auth.provider";
import { requestSpotifyAccessToken } from "../services/spotify.service.js";

function useQuery()
{
	const { search } = useLocation();
  
	return React.useMemo(() => new URLSearchParams(search), [search]);
}

function Callback()
{
	let [status, setStatus] = useState({title: "Loading..."});
	let query = useQuery();
	let auth = useAuth();

	useEffect(() => {
		if (query.has("code") && query.has("state"))
		{
			setStatus({title: "Connecting", message: "Requesting Token to Spotify API..."})
			requestSpotifyAccessToken(query.get("code")).then((res) => {
				const tokenObj = {
					access_token: res.data.access_token,
					refresh_token: res.data.refresh_token,
					token_type: res.data.token_type,
					expires: Date.now() + res.data.expires_in * 1000
				};
				
				setStatus({title: "Connected", message: "You are now connected"});
				auth.login(tokenObj, () => {});
				window.localStorage.removeItem("code_verifier");
			}).catch((err) => {
				setStatus({title: "An error has occurred...", message: err.response.data.error + ": " + err.response.data.error_description});
			});
		}
		else if (query.has("error") && query.has("state"))
			setStatus({title: "An error has occurred...", message: query.get("error")})
		else
			setStatus({title: "Wrong request...", message: "Please try to log in again."})
	}, []);

	return (
		<div className="relative h-screen">
			<div className="container mx-auto lg:px-64 mt-8">
				<div className="grid place-items-center shadow mx-2 rounded-3xl bg-white mx-auto py-8">
					<p className="text-4xl font-bold text-spotify_text_color antialiased">{status.title}</p>
					{status.message && <p className="text-xl font-medium py-2 text-gray-500">{status.message}</p>}
				</div>
			</div>
		</div>
	);
}

export default Callback;