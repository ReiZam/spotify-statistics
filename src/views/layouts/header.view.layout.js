import React from 'react';

// COMPONENTS
import Navbar from '../../components/navbar/navbar.component.js';
// PROVIDER
import {useAuth} from '../../providers/auth.provider.js';

function Header(props)
{
	let auth = useAuth();
	const {authorization_content} = props;

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
		!auth.user  ? {
			title: "LOGIN",
			link: authorization_content.authorize_link,
			external: true,
			onClick: () => {
				window.localStorage.setItem("code_verifier", authorization_content.code_verifier);
			}
		} : {
			title: "LOGOUT",
			link: "/",
			external: false,
			onClick: () => {
				auth.logout(() => {})
			}
		}
	];

	return (
		<div className="header">
			<Navbar elements={links}/>
		</div>
	);
}

export default Header;