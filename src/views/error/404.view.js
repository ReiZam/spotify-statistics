function NotFound()
{
	return (
		<div className="relative h-screen">
			<div className="container mx-auto lg:px-64 mt-8">
				<div className="grid place-items-center shadow mx-2 rounded-3xl bg-white mx-auto py-8">
					<p className="text-4xl font-bold text-spotify_text_color antialiased">404 Not Found</p>
					<p className="text-sm font-medium py-2 text-spotify_text_color">Unknown path, please return to the home page.</p>
				</div>
			</div>
		</div>
	);
}

export default NotFound;