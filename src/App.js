import React, { useEffect, useState } from "react";
import { Route, Routes, } from "react-router";

// VIEWS
import Home from './views/home/home.view.js';
import Callback from './views/callback/callback.view.js';
// LAYOUTS
import Header from './views/layouts/header.view.layout.js';
import Footer from './views/layouts/footer.view.layout.js';
// SERVICES
import { generateAuthorizationContentSpotify } from "./services/api/spotify.api.js";
// PROVIDER
import { RequireAuth, AuthProvider } from './providers/auth.provider.js';

function App()
{
	const [authorization_content, setAuthorizationContent] = useState(null);

	useEffect(() => {
		generateAuthorizationContentSpotify().then((result) => {
			setAuthorizationContent(result);
		});
	}, []);

	if (!authorization_content)
		return (<h1>Loading...</h1>);

	return (
		<div className="bg-gray-100 h-screen w-screen">
			<AuthProvider>
				<Header authorization_content={authorization_content}/>
				<Routes>
					<Route index path="/" element={<Home authorization_content={authorization_content}/>}/>
					<Route path="/callback" element={<Callback/>}/>
					{/* <Route path="*" element={<NotFound/>}/> */}
				</Routes>
				<Footer/>
			</AuthProvider>
		</div>
	);
}


export default App;