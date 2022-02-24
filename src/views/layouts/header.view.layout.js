// COMPONENTS
import Navbar from '../../components/navbar/navbar.component.js';


function Header()
{
	const links = [
		{
			title: "HOME",
			link: "/home"
		},
		{
			title: "STATISTICS",
			link: "/statistics"
		}
	];

	return (
		<div className="header">
			<Navbar elements={links}/>
		</div>
	);
}

export default Header;