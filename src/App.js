import React, { useEffect, useState } from "react";
import { Route, Routes, } from "react-router";

// LAYOUTS
import Header from './layouts/header.layout.js';
import Footer from './layouts/footer.layout.js';
// VIEWS
import Home from './views/home.view.js';
import Callback from './views/callback.view.js';
// SERVICES
import { generateAuthorizationContentSpotify } from "./services/api/spotify.api.js";
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
		<div className="bg-gray-100 h-screen">
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