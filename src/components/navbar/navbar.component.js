import React from "react";
import { NavLink } from "react-router-dom";

class Navbar extends React.Component
{
	constructor(props)
	{
		super(props);
	}

	render()
	{
		const elements = this.props.elements;
		
		return (
			<nav className="relative py-6 bg-black">
				<div className="container md:px-16 px-8 mx-auto md:flex md:items-center">
					<div className="flex justify-between items-center">
						<NavLink className="flex justify-center items-center space-x-2" to="/">
							<img className="object-scale-down h-10 w-10" src={require('./spotify_logo.png')} />
							<div className="space-x-1">
								<a className="text-xl font-bold text-white">Spotify</a>
								<a className="text-sm font-thin text-white mt-1">stats</a>
							</div>
						</NavLink>
						<button data-collapse-toggle="mobile-menu" type="button" className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-green-600 focus:outline-none focus:ring-1 focus:ring-gray-200" aria-controls="mobile-menu" aria-expanded="false">
							<span className="sr-only">Open main menu</span>
							<svg className="w-6 h-6" fill="white" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
							<svg className="hidden w-6 h-6" fill="white" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
						</button>
					</div>
					<div id="mobile-menu" className="hidden md:flex md:flex-row flex-col md:ml-auto md:mt-0 mt-4">
						<ul className="flex md:flex-row md:space-x-8 flex-col w-full">
							{
								elements.map((value, index) => {
									return (
										<li key={index}>
											<NavLink to={value.link}>
												<a className="text-xl font-thin text-white hover:text-green-600">{value.title}</a>
											</NavLink>
										</li>
									)
								})}
						</ul>
					</div>
				</div>
			</nav>
		);
	}
}

export default Navbar;