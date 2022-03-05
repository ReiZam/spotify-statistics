const queryString = require('query-string');
const axios = require('axios');
const {generateRandomString, generateCodeChallenge} = require('../utils/string.utils.js');

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
const AUTHORIZE_URI = "https://accounts.spotify.com/authorize?";
const SPOTIFY_TOKEN_URI = "https://accounts.spotify.com/api/token"
const SPOTIFY_API_URI = "https://api.spotify.com/v1";

async function generateAuthorizationContentSpotify()
{
	var state = generateRandomString(16);
	var scope = 'user-read-private user-read-email user-top-read';
	var codeVerifier = generateRandomString(56);
	const codeChallenge = await generateCodeChallenge(codeVerifier);

	return ({
		authorize_link: AUTHORIZE_URI + queryString.stringify({
			response_type: 'code',
			client_id: CLIENT_ID,
			scope: scope,
			redirect_uri: REDIRECT_URI,
			state: state,
			code_challenge_method: "S256",
			code_challenge: codeChallenge
		}),
		code_verifier: codeVerifier
	});
}

function requestSpotifyAccessToken(code)
{
	const codeVerifier = window.localStorage.getItem("code_verifier");
	
	var authOptions = {
		method: "POST",
		baseURL: SPOTIFY_TOKEN_URI,
		headers: {
			"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
		},
		data: queryString.stringify({
			client_id: CLIENT_ID,
			grant_type: "authorization_code",
			code: code,
			redirect_uri: REDIRECT_URI,
			code_verifier: codeVerifier
		}),
		response_type: "json"
	};
	
	return (axios(authOptions));
}

function requestSpotifyRefreshToken(refresh_token)
{
	var authOptions = {
		method: "POST",
		baseURL: SPOTIFY_TOKEN_URI,
		headers: {
			"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
		},
		data: queryString.stringify({
			client_id: CLIENT_ID,
			refresh_token: refresh_token,
			grant_type: "refresh_token"
		}),
	};

	return (axios(authOptions));
}

async function post(url, access_token, data)
{
	var options = {
		method: "POST",
		url: url,
		baseURL: SPOTIFY_API_URI,
		headers: {
			Authorization: 'Bearer ' + access_token  
		},
		data: JSON.stringify(data),
		response_type: "json"
	};

	return (axios(options));
}

async function get(url, access_token)
{
	var options = {
		method: "GET",
		url: url,
		baseURL: SPOTIFY_API_URI,
		headers: {
			Authorization: 'Bearer ' + access_token  
		},
		response_type: "json"
	}

	return (axios(options));
}

const SpotifyAgent = 
{
	current: (access_token) => get("/me", access_token),
	top: (access_token, top_item, query) => get("/me/top/" + top_item + "/" + query, access_token)
};

export {
	generateAuthorizationContentSpotify,
	requestSpotifyAccessToken,
	requestSpotifyRefreshToken,
	SpotifyAgent
};