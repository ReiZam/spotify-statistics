import { SpotifyAgent } from '../spotify.service.js'; 

function getTimeRangeByMode(mode)
{
	switch (mode)
	{
		case 0:
		default:
			return ("short_term");
		case 1:
			return ("medium_term");
		case 2:
			return ("long_term");
	}
}

function loadTop(access_token, mode, type, setter)
{
	setter(null);

	SpotifyAgent.top(access_token, type, "?limit=50&time_range=" + getTimeRangeByMode(mode)).then((result) => {
		setter(result.data);
	});
}

function topArtistsToTopGenres(topArtists)
{
	if (topArtists == null)
		return (null);
	var total = 0;
	var max = 0;
	var min = topArtists.items.length == 0 ? 0 : -1;
	var items = [];

	topArtists.items.map((value) => {
		value.genres.forEach((genre) => {
			let amount = 1;

			var result = items.filter((value) => {
				return (value.genre == genre);
			});

			if (result.length == 0)
				items.push({
					genre: genre,
					amount: amount,
				});
			else
				amount = ++result[0].amount;

			if (min > amount || min == -1)
				min = amount;
			if (max < amount)
				max = amount;
		});
		total += value.genres.length;
	});

	items.forEach((value) => {
		value.percentage = (((value.amount/max)*100).toFixed(1)) + "%";
	});

	items.sort((a, b) => {
		return (b.amount - a.amount);
	})

	return ({
		items,
		total,
		max,
		min
	});
}

export {
	loadTop,
	getTimeRangeByMode,
	topArtistsToTopGenres
};