import React, { useEffect, useState } from "react";
import { Navigate } from "react-router";

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
			
			if (tokenObj.expires > Date.now())
				value.login(tokenObj, () => {});
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

export {
	RequireAuth,
	useAuth,
	AuthProvider
};