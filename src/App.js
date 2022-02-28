import React, { useEffect, useState } from "react";
import { Route, Routes, } from "react-router";

// LAYOUTS
import Header from './components/layouts/header/header.layout.component.js';
import Footer from './components/layouts/footer.layout.component.js';
// VIEWS
import Home from './views/home.view.js';
import Callback from './views/callback.view.js';
import TopTracks from './views/top/topTracks.view.js';
import TopGenres from "./views/top/topGenres.view.js";
import TopArtists from './views/top/topArtists.view.js';
import NotFound from './views/error/404.view.js';
// SERVICES
import { generateAuthorizationContentSpotify } from "./services/spotify.service.js";
// PROVIDER
import { RequireAuth, RequireNoAuth } from './providers/auth.provider.js';

function App()
{
	const [authorization_content, setAuthorizationContent] = useState(null);

	useEffect(() => {
		generateAuthorizationContentSpotify().then((result) => {
			setAuthorizationContent(result);
		});
	}, []);

	if (!authorization_content)
		return (<div></div>);

	return (
			<div className="bg-gray-100 flex flex-col h-screen justify-between">
				<Header authorization_content={authorization_content}/>
				<div className="bg-gray-100 mb-auto">
					<Routes>
						<Route index path="/" element={<Home authorization_content={authorization_content}/>}/>
						<Route path="/callback" element={<RequireNoAuth><Callback/></RequireNoAuth>}/>
						<Route path="/top/tracks" element={<RequireAuth><TopTracks/></RequireAuth>}/>
						<Route path="/top/artists" element={<RequireAuth><TopArtists/></RequireAuth>}/>
						<Route path="/top/genres" element={<RequireAuth><TopGenres/></RequireAuth>}/>
						<Route path="*" element={<NotFound/>}/>
					</Routes>
				</div>
				<Footer/>
			</div>
	);
}


export default App;