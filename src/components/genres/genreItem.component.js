function GenreItem(props)
{
	const {genre} = props;

	return (
		<div className="flex flex-col text-center bg-white rounded-lg justify-center h-36">
			<p className="text-4xl font-bold">{genre.percentage}</p>
			<p className="mt-2 tracking-wide font-regular">{genre.genre.toUpperCase()}</p>
		</div>
	);
}

export default GenreItem;