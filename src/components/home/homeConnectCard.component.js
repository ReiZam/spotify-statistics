function HomeConnectCard(props)
{
	const {authorization_content} = props;

	return (
		<div className="grid place-items-center shadow mx-2 rounded-3xl bg-white mx-auto py-8 h-56">
			<div className="flex flex-row">
				<p className="text-4xl font-bold text-spotify_text_color antialiased">Spotify</p>
				<p className="text-lg font-thin mt-2.5 text-spotify_text_color antialiased">stats</p>
			</div>
			<p className="font-medium py-4 text-spotify_text_color">Please sign in with your Spotify account to view your stats</p>
			<a href={authorization_content.authorize_link}  onClick={() => {
					window.localStorage.setItem("code_verifier", authorization_content.code_verifier);
			}}>
				<button className="rounded-full tracking-widest transition-colors active:bg-spotify_green_primary_alternative text-sm bg-spotify_green_primary_alternative font-bold text-white h-12 pl-6 pr-6 hover:bg-spotify_green_secondary">LOGIN WITH SPOTIFY</button>
			</a>
		</div>
	);
}

export default HomeConnectCard;