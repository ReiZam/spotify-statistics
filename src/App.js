import React, { useEffect, useState } from "react";
import { Route, Routes, } from "react-router";

// LAYOUTS
import Header from './layouts/header.layout.js';
import Footer from './layouts/footer.layout.js';
// VIEWS
import Home from './views/home.view.js';
import Callback from './views/callback.view.js';
import TopTracks from './views/top/topTracks.view.js';
import TopGenres from "./views/top/topGenres.view.js";
import TopArtists from './views/top/topArtists.view.js';
// SERVICES
import { generateAuthorizationContentSpotify } from "./services/spotify.service.js";
// PROVIDER
import { RequireAuth, useAuth, AuthProvider } from './providers/auth.provider.js';

function App()
{
	let auth = useAuth();
	const [authorization_content, setAuthorizationContent] = useState(null);

	useEffect(() => {
		generateAuthorizationContentSpotify().then((result) => {
			setAuthorizationContent(result);
		});
		
	}, []);

	if (!authorization_content)
		return (<h1>Loading...</h1>);

	return (
			<div className="bg-gray-100 flex flex-col h-screen justify-between">
				<AuthProvider>
					<Header authorization_content={authorization_content}/>
					<div className="bg-gray-100 mb-auto">
						<Routes>
							<Route index path="/" element={<Home authorization_content={authorization_content}/>}/>
							<Route path="/callback" element={<Callback/>}/>
							<Route path="/top/tracks" element={<RequireAuth><TopTracks/></RequireAuth>}/>
							<Route path="/top/artists" element={<RequireAuth><TopArtists/></RequireAuth>}/>
							<Route path="/top/genres" element={<RequireAuth><TopGenres/></RequireAuth>}/>
						</Routes>
					</div>
					<Footer/>
				</AuthProvider>
			</div>
	);
}


export default App;