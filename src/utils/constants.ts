export const BASE_DISCORD_URL: string = "https://discord.com/api";
export const TOKEN_URL: string = `${BASE_DISCORD_URL}/oauth2/token`;

const _SCOPES: string[] = ["guilds", "identify"];
const _AUTH_URL: string = `${BASE_DISCORD_URL}/oauth2/authorize`;

export const AUTH_URL_USER: string = `${_AUTH_URL}?response_type=code&client_id=${process.env.REACT_APP_CLIENT_ID}&scope=${encodeURIComponent(
	_SCOPES.join(" "),
)}&redirect_uri=${process.env.REACT_APP_REDIRCT_URI}`;
