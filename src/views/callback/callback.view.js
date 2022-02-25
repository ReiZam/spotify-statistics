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
		if (!query.has("error") && query.has("code") && query.has("state"))
		{
			requestSpotifyAccessToken(query.get("code")).then((payload) => {
				const tokenObj = {
					access_token: payload.data.access_token,
					refresh_token: payload.data.refresh_token,
					token_type: payload.data.token_type,
					expires: Date.now() + payload.data.expires_in * 1000
				};

				auth.login(tokenObj, () => {
					console.log("login")
				});
			}).catch((err) => {
				console.log(err);
			});
		}
	}, []);

	if (auth.user)
		return (<Navigate to="/" replace/>);
	return (
		<div>
			<h1>Code: {query.get("code")}</h1>
			<h1>State: {query.get("state")}</h1>
		</div>
	);
}

export default Callback;