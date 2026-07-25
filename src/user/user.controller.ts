import { Controller, Get, Param } from '@nestjs/common';
import { UserProfileDto } from './dto/user-profile.dto';
import { GithubUsernamePipe } from './pipes/github-username.pipe';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':username')
  findOne(
    @Param('username', GithubUsernamePipe) username: string,
  ): Promise<UserProfileDto> {
    return this.userService.findByUsername(username);
  }
}
