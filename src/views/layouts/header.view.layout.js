// COMPONENTS
import React from 'react';
import { connect } from 'react-redux';
import Navbar from '../../components/navbar/navbar.component.js';
import { generateAuthorizationContentSpotify } from '../../services/api/spotify.api.js';

const mapStateToProps = state => ({...state});

const mapDispatchToProps = dispatch => ({
});

class Header extends React.Component
{
	constructor(props)
	{
		super(props);
	}

	render()
	{
		const {authorization_content} = this.props;

		const links = [
			{
				title: "TOP TRACKS",
				link: "/stats/tracks",
				external: false
			},
			{
				title: "TOP GENRES",
				link: "/stats/genres",
				external: false
			},
			{
				title: "TOP ARTISTS",
				link: "/stats/artists",
				external: false
			},
			{
				title: "LOGIN",
				link: authorization_content.authorize_link,
				external: true,
				onClick: () => {
					window.localStorage.setItem("code_verifier", authorization_content.code_verifier);
				}
			}
		];

		return (
			<div className="header">
				<Navbar elements={links}/>
			</div>
		);
	}
}

export default Header;