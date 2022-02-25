import React from "react";
import { Route, Routes, } from "react-router";
import { connect } from "react-redux";

// VIEWS
import Home from './views/home/home.view.js';
import Callback from './views/callback/callback.view.js';
// LAYOUTS
import Header from './views/layouts/header.view.layout.js';
import Footer from './views/layouts/footer.view.layout.js';
import { generateAuthorizationContentSpotify } from "./services/api/spotify.api.js";
// SERVICES

class App extends React.Component
{
	constructor(props)
	{
		super(props);

		this.state = {authorization_content: ''};
	}

	_init()
	{
		generateAuthorizationContentSpotify().then((result) => {
			this.setState({authorization_content: result});
		});
	}

	componentDidMount()
	{
		this._init();
	}
	
	render()
	{
		var {authorization_content} = this.state;
		
		if (!authorization_content)
			return (<h1>Loading...</h1>);
		
		return (
			<div className="bg-gray-100 h-screen w-screen">
				<Header authorization_content={authorization_content}/>
				<Routes>
					<Route index path="/" element={<Home authorization_content={authorization_content}/>}/>
					<Route path="/callback" element={<Callback/>}/>
					{/* <Route path="*" element={<NotFound/>}/> */}
				</Routes>
				<Footer/>
			</div>
		);
	}
}


export default App;