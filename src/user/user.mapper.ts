import { UserProfileDto } from './dto/user-profile.dto';
import { GithubUser } from './interfaces/github-user.interface';

const normalize = (value: string | null): string | null => {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
};

export const toUserProfile = (user: GithubUser): UserProfileDto => ({
  id: user.id,
  username: user.login,
  name: normalize(user.name),
  bio: normalize(user.bio),
  avatarUrl: user.avatar_url,
  profileUrl: user.html_url,
  company: normalize(user.company),
  location: normalize(user.location),
  website: normalize(user.blog),
  email: normalize(user.email),
  twitterUsername: normalize(user.twitter_username),
  hireable: user.hireable ?? false,
  publicRepos: user.public_repos,
  publicGists: user.public_gists,
  followers: user.followers,
  following: user.following,
  createdAt: user.created_at,
  updatedAt: user.updated_at,
});
