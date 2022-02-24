import React from "react";

class HomeFadeTitles extends React.Component
{
	constructor(props)
	{
		super(props);
	}

	render()
	{
		const {titles} = this.props; 

		return (
			<div className="flex p-4 h-48 flex-row justify-between">
				{
					titles && titles.map((value, index) => {
						return (
							<div key={index} className="flex flex-col text-center">
								<p className="font-bold text-xs md:text-lg lg:text-xl text-spotify_text_color col-span-2">{value}</p>
								<p className="font-bold text-xs md:text-lg lg:text-xl text-spotify_text_color/90 col-span-2">{value}</p>
								<p className="font-bold text-xs md:text-lg lg:text-xl text-spotify_text_color/70 col-span-2">{value}</p>
								<p className="font-bold text-xs md:text-lg lg:text-xl text-spotify_text_color/50 col-span-2">{value}</p>
								<p className="font-bold text-xs md:text-lg lg:text-xl text-spotify_text_color/30 col-span-2">{value}</p>
								<p className="font-bold text-xs md:text-lg lg:text-xl text-spotify_text_color/10 col-span-2">{value}</p>
							</div>
						)	
					})
				}
			</div>
		);
	}
}

export default HomeFadeTitles;