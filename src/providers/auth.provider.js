import React, { useEffect, useState } from "react";
import { Navigate } from "react-router";

// SERVICES
import { requestSpotifyRefreshToken } from '../services/spotify.service.js';

let AuthContext = React.createContext(null);

function useProvideAuth()
{
	let [user, setUser] = useState(null);
	
	let login = (user, callback) => {
		setUser(user);
		window.localStorage.setItem("token", JSON.stringify(user));
		callback();
	};

	let logout = (callback) => {
		setUser(null);
		window.localStorage.removeItem("token");
		callback();
	}

	return {
		user,
		login,
		logout
	};
}

function AuthProvider({children})
{
	let value = useProvideAuth();

	useEffect(() => {
		if (window.localStorage.getItem("token") != undefined)
		{
			var tokenObj = JSON.parse(window.localStorage.getItem("token"));
			
			if (tokenObj.access_token && tokenObj.refresh_token && tokenObj.expires)
			{
				if (tokenObj.expires > Date.now())
					value.login(tokenObj, () => {});
				else
				{
					requestSpotifyRefreshToken(tokenObj.refresh_token).then((res) => {
						const newTokenObj = {
							access_token: res.data.access_token,
							refresh_token: res.data.refresh_token,
							token_type: res.data.token_type,
							expires: Date.now() + res.data.expires_in * 1000
						};

						value.login(newTokenObj, () => {});
					});
				}
			}
		}
	}, []);

	return (<AuthContext.Provider value={value}>{children}</AuthContext.Provider>);
}

function useAuth() {
	return React.useContext(AuthContext);
}

function RequireAuth({children})
{
	let auth = useAuth();

	if (!auth.user)
		return (<Navigate to="/" replace/>)
	return children;
}

function RequireNoAuth({children})
{
	let auth = useAuth();

	if (auth.user)
		return (<Navigate to="/" replace/>)
	return children;
}

export {
	RequireAuth,
	RequireNoAuth,
	useAuth,
	AuthProvider
};