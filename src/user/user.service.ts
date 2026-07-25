import {
  GatewayTimeoutException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { UserProfileDto } from './dto/user-profile.dto';
import { GithubUser } from './interfaces/github-user.interface';
import { toUserProfile } from './user.mapper';

const GITHUB_API_URL = 'https://api.github.com';
const REQUEST_TIMEOUT_MS = 8000;

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  async findByUsername(username: string): Promise<UserProfileDto> {
    const response = await this.fetchUser(username);

    if (!response.ok) {
      throw this.toHttpException(response.status, username);
    }

    const user = (await response.json()) as GithubUser;

    return toUserProfile(user);
  }

  private async fetchUser(username: string): Promise<Response> {
    try {
      return await fetch(
        `${GITHUB_API_URL}/users/${encodeURIComponent(username)}`,
        {
          headers: {
            Accept: 'application/vnd.github+json',
            'X-GitHub-Api-Version': '2022-11-28',
          },
          signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
        },
      );
    } catch (error) {
      this.logger.error(`GitHub request failed for "${username}"`, error);

      if (error instanceof Error && error.name === 'TimeoutError') {
        throw new GatewayTimeoutException('GitHub API did not respond in time');
      }

      throw new ServiceUnavailableException('GitHub API is unreachable');
    }
  }

  private toHttpException(status: HttpStatus, username: string): HttpException {
    if (status === HttpStatus.NOT_FOUND) {
      return new NotFoundException(`GitHub user "${username}" was not found`);
    }

    if (
      status === HttpStatus.FORBIDDEN ||
      status === HttpStatus.TOO_MANY_REQUESTS
    ) {
      return new HttpException(
        'GitHub API rate limit exceeded, please try again later',
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    this.logger.error(
      `GitHub responded with status ${status} for "${username}"`,
    );

    return new ServiceUnavailableException(
      'GitHub API returned an unexpected response',
    );
  }
}
