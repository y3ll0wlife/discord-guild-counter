export interface User {
	id: string;
	username: string;
	avatar: string | null;
	avatar_decoration: string | null;
	discriminator: string;
	public_flags: number;
	flags: number;
	banner: string | null;
	banner_color: string | null;
	accent_color: number | null;
	locale: string;
	mfa_enabled: boolean;
	premium_type: 0 | 1 | 2;
}
