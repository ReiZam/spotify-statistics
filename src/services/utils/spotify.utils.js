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

export {
	loadTop,
	getTimeRangeByMode
};