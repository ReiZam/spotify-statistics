import {getClassementPlace} from '../../utils/string.utils.js';

function ArtistItem(props)
{
	const {classement, artist} = props;

	return (
		<div className="flex flex-col text-center bg-white rounded-lg">
			<img className="w-80 rounded-t-lg" src={artist.images[1].url} />
			<div className="flex flex-row space-x-2 py-2 justify-center">
				<p className="text-xs font-regular">{getClassementPlace(classement)}.</p>
				<p className="text-xs font-medium tracking-wide">{artist.name.toUpperCase()}</p>
			</div>
		</div>
	);
}


export default ArtistItem;