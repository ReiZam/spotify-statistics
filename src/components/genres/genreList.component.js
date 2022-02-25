// COMPONENTS
import GenreItem from './genreItem.component.js';

function GenreList(props)
{
	const {genres} = props;

	return (
		<div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4 grid-cols-2"> 
			{
				genres.items.map((value, index) => {
					return (
						<div key={index} className="mt-2 mt-2">
							<GenreItem genre={value}/>
						</div>
					)
				})
			}
		</div>
	);
}

export default GenreList;