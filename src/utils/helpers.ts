import { Guild } from "../types/Guild";

export function generateAvatarUrl(userId: string | undefined, discriminator: number, hash: string | undefined | null) {
	if (!hash) return `https://cdn.discordapp.com/embed/avatars/${discriminator! % 5}.png`;
	return `https://cdn.discordapp.com/avatars/${userId}/${hash}.${hash.startsWith("a_") ? "gif" : "png"}?size=4096`;
}

export function getGuildCount(guilds: Guild[]) {
	return guilds.length;
}
