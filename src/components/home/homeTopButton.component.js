import { Link } from 'react-router-dom';
// PROVIDER
import { useAuth } from '../../providers/auth.provider.js';

function HomeTopButton(props)
{
	let auth = useAuth();
	const {authorization_content, title, loggedLink, className} = props;
	
	if (auth.user)
		return (
			<Link to={loggedLink}>
				<button className={className}>{title}</button>
			</Link>
		);
	return (
		<a href={authorization_content.authorize_link} onClick={() => {
			if (!auth.user)
				window.localStorage.setItem("code_verifier", authorization_content.code_verifier);
		}}>
			<button className={className}>{title}</button>
		</a>
	);
}

export default HomeTopButton;