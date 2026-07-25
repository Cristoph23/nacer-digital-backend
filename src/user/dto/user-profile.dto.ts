export interface UserProfileDto {
  id: number;
  username: string;
  name: string | null;
  bio: string | null;
  avatarUrl: string;
  profileUrl: string;
  company: string | null;
  location: string | null;
  website: string | null;
  email: string | null;
  twitterUsername: string | null;
  hireable: boolean;
  publicRepos: number;
  publicGists: number;
  followers: number;
  following: number;
  createdAt: string;
  updatedAt: string;
}
