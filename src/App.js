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
		<div className="bg-gray-100">
			<Header/>
			<Routes>
				<Route index path="/" element={<Home/>}/>
				<Route path="*" element={<NotFound/>}/>
			</Routes>
			<Footer/>
		</div>
  	);
}

export default App;
