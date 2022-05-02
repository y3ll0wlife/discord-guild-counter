import { useEffect, useState } from "react";
import "./App.css";
import { AUTH_URL_USER, BASE_DISCORD_URL, TOKEN_URL } from "./utils/constants";
import { generateAvatarUrl, getGuildCount } from "./utils/helpers";
import { User } from "./types/User";
import { Guild } from "./types/Guild";
import { Oauth2Token, Oauth2Data } from "./types/Oauth";

function App() {
	const [accessToken, setAccessToken] = useState<string | null>(null);
	const [user, setUser] = useState<User | null>(null);
	const [guilds, setGuilds] = useState<Guild[]>([]);
	const [done, setDone] = useState(false);
	const [progress, setProgress] = useState("Loading.");

	const authResult = new URLSearchParams(window.location.search);
	const code = authResult.get("code");

	useEffect(() => {
		if (!code) {
			window.location.href = AUTH_URL_USER;
			return;
		}

		const data: Oauth2Data = {
			client_id: process.env.REACT_APP_CLIENT_ID || "",
			client_secret: process.env.REACT_APP_CLIENT_SECRET || "",
			grant_type: "authorization_code",
			code,
			redirect_uri: process.env.REACT_APP_REDIRCT_URI || "",
		};

		fetch(TOKEN_URL, {
			body: new URLSearchParams(data),
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			mode: "cors",
			cache: "no-cache",
		})
			.then(res => {
				if (res.status !== 200) return (window.location.href = AUTH_URL_USER);
				return res.json();
			})
			.then((result: Oauth2Token) => {
				setProgress("Fetching user..");
				setAccessToken(result.access_token);
			});
	}, [code]);

	useEffect(() => {
		if (!accessToken) return;

		fetch(`${BASE_DISCORD_URL}/users/@me`, {
			method: "GET",
			headers: {
				authorization: `Bearer ${accessToken}`,
			},
			mode: "cors",
			cache: "no-cache",
		})
			.then(res => res.json())
			.then((user: User) => {
				setProgress("Fetching guilds...");
				setUser(user);
			});

		fetch(`${BASE_DISCORD_URL}/users/@me/guilds`, {
			method: "GET",
			headers: {
				authorization: `Bearer ${accessToken}`,
			},
			mode: "cors",
			cache: "no-cache",
		})
			.then(res => res.json())
			.then((guilds: Guild[]) => {
				setDone(true);
				setGuilds(guilds);
			});
	}, [accessToken]);

	return (
		<div className="App">
			<header style={user !== null ? {} : {}} className="App-header">
				{done ? (
					<>
						<img
							src={generateAvatarUrl(user?.id, parseInt(user?.discriminator!), user?.avatar)}
							alt={`Avatar of ${user?.username}`}
							width={300}
							height={300}
							className="avatar"
						/>
						<p>
							{user?.username}
							<strong>#{user?.discriminator}</strong>
						</p>
						<p>
							You are in <strong> {getGuildCount(guilds)}</strong> guilds
						</p>
					</>
				) : (
					<h1>{progress}</h1>
				)}
			</header>
		</div>
	);
}

export default App;
