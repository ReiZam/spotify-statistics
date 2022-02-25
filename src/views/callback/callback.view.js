import React from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router";
import { requestSpotifyAccessToken } from "../../services/api/spotify.api";

function useQuery()
{
	const { search } = useLocation();
  
	return React.useMemo(() => new URLSearchParams(search), [search]);
}

function Callback(props)
{
	let query = useQuery();

	if (!query.has("error") && query.has("code") && query.has("state"))
	{
		requestSpotifyAccessToken(query.get("code")).then((payload) => {
			const tokenObj = {
				access_token: payload.data.access_token,
				refresh_token: payload.data.refresh_token,
				token_type: payload.data.token_type,
				expires: Date.now() + payload.data.expires_in * 1000
			};

			window.localStorage.setItem("token", JSON.stringify(tokenObj));
		}).catch((err) => {
			console.log(err);
		});
	}

	return (
		<div>
			<h1>Code: {query.get("code")}</h1>
			<h1>State: {query.get("state")}</h1>
		</div>
	);
}

export default Callback;