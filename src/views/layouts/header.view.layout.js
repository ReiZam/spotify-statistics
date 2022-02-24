// COMPONENTS
import Navbar from '../../components/navbar/navbar.component.js';


function Header()
{
	const links = [
		{
			title: "TOP TRACKS",
			link: "/stats/tracks"
		},
		{
			title: "TOP GENRES",
			link: "/stats/genres"
		},
		{
			title: "TOP ARTISTS",
			link: "/stats/artists"
		},
		{
			title: "LOGIN",
			link: "/login"
		}
	];

	return (
		<div className="header">
			<Navbar elements={links}/>
		</div>
	);
}

export default Header;