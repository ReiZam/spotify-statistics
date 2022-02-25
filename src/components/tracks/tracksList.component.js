// COMPONENTS
import TrackItem from './trackItem.component.js';

function TrackList(props)
{
	const {tracks} = props;

	return (
		<div> 
			{
				tracks.items.map((value, index) => {
					return (
						<div key={index} className="mt-2 mt-2">
							<TrackItem track={value}/>
						</div>
					)
				})
			}
		</div>
	);
}

export default TrackList;