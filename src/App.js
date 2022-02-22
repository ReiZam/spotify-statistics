import React from "react";
import { Route, Routes } from "react-router";

// VIEWS
import Home from './views/home/home.view.js';
import NotFound from './views/not-found/not-found.view.js';
// LAYOUTS
import Header from './views/layouts/header.view.layout.js';
import Footer from './views/layouts/footer.view.layout.js';

function App()
{
	return (
		<>
			<Header/>
			<Routes>
				<Route index element={<Home/>}/>
				<Route path="*" element={<NotFound/>}/>
			</Routes>
			<Footer/>
		</>
  	);
}

export default App;
