import { BadRequestException, PipeTransform } from '@nestjs/common';

const GITHUB_USERNAME_PATTERN =
  /^[a-zA-Z\d](?:[a-zA-Z\d]|-(?=[a-zA-Z\d])){0,38}$/;

export class GithubUsernamePipe implements PipeTransform<string, string> {
  transform(value: string): string {
    const username = value?.trim();

    if (!username || !GITHUB_USERNAME_PATTERN.test(username)) {
      throw new BadRequestException(
        `"${value}" is not a valid GitHub username`,
      );
    }

    return username;
  }
}
