const queryString = require('query-string');
const axios = require('axios');
const {generateRandomString, generateCodeChallenge} = require('../../utils/string.utils.js');

const CLIENT_ID = "faebf503fbac43f2afcfa2807b956815";
const REDIRECT_URI = "http://localhost:3000/callback";
const AUTHORIZE_URI = "https://accounts.spotify.com/authorize?";
const SPOTIFY_TOKEN_URI = "https://accounts.spotify.com/api/token"
const SPOTIFY_API_URI = "https://api.spotify.com/v1";

async function generateAuthorizationContentSpotify()
{
	var state = generateRandomString(16);
	var scope = 'user-read-private user-read-email';
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
	current: (access_token) => get("/me", access_token)
};


export {
	generateAuthorizationContentSpotify,
	requestSpotifyAccessToken,
	SpotifyAgent
};