import { SpotifyAgent, requestSpotifyRefreshToken } from '../services/spotify.service.js'; 

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

function checkAndRequestRefreshToken(auth, callback)
{
	if (auth.user.expires < Date.now())
		requestSpotifyRefreshToken(auth.user.refresh_token).then((res) => {
			const newTokenObj = {
				access_token: res.data.access_token,
				refresh_token: res.data.refresh_token,
				token_type: res.data.token_type,
				expires: Date.now() + res.data.expires_in * 1000
			};

			auth.login(newTokenObj, () => {
				callback(newTokenObj);
			});
		});
	else
		callback(auth.user);
}

function loadTop(auth, mode, type, setter)
{
	setter(null);

	checkAndRequestRefreshToken(auth, (token) => {
		SpotifyAgent.top(token.access_token, type, "?limit=50&time_range=" + getTimeRangeByMode(mode)).then((result) => {
			setter(result.data);
		});
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
	topArtistsToTopGenres,
	checkAndRequestRefreshToken
};