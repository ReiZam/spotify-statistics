const createHash = require("sha256-uint8array").createHash;

function generateRandomString(length)
{
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;

    for ( var i = 0; i < length; i++ )
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
	return result;
}

async function generateCodeChallenge(codeVerifier)
{
	const digest = await createHash().update(new TextEncoder().encode(codeVerifier)).digest();

    return btoa(String.fromCharCode(...new Uint8Array(digest)))
	.replace(/=/g, '')
	.replace(/\+/g, '-')
	.replace(/\//g, '_');
}

function getClassementPlace(classement)
{
	return (classement + (classement == 1 ? "st" : classement == 2 ? "nd" : ""));
}

export {
	generateCodeChallenge,
	generateRandomString,
	getClassementPlace
};