import { getClassementPlace } from "../../utils/string.utils";

function getArtists(artists)
{
	var result = "";

	artists.map((value, index) => {
		result += value.name;
		if (artists.length - 1 > index)
			result += ", "
	})

	return (result);
}

function TrackItem(props)
{
	const {classement, track} = props;

	return (
		<div className="bg-white rounded-lg w-full">
			<div className="flex flex-row space-x-4">
				<img className="rounded-lg h-16"src={track.album.images[0].url} />
				<div className="flex flex-row py-2">
					<p className="text-xs mt-1 font-regular">{getClassementPlace(classement)}.</p>
					<div className="flex flex-col ml-2">
						<p className="font-medium tracking-wide">{track.name}</p>
						<p className="text-sm font-regular">{getArtists(track.artists)}</p>
					</div>
				</div>
			</div>
		</div>
	);
}


export default TrackItem;