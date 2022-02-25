const queryString = require('query-string');
const axios = require('axios');
const {generateRandomString, generateCodeChallenge} = require('../utils/string.utils.js');

const CLIENT_ID = process.env.CLIENT_ID;
const REDIRECT_URI = process.env.REDIRECT_URI;
const AUTHORIZE_URI = "https://accounts.spotify.com/authorize?";
const SPOTIFY_API_URI = "https://accounts.spotify.com/api";

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
		baseURL: SPOTIFY_API_URI,
		url: "/token",
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

export {
	generateAuthorizationContentSpotify,
	requestSpotifyAccessToken
};