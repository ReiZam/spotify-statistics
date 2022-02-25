// COMPONENTS
import ArtistItem from './artistItem.component.js';

function ArtistList(props)
{
	const {artists} = props;

	return (
		<div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4 grid-cols-2"> 
			{
				artists.items.map((value, index) => {
					return (
						<div key={index} className="mt-2 mt-2">
							<ArtistItem classement={index + 1} artist={value}/>
						</div>
					)
				})
			}
		</div>
	);
}

export default ArtistList;