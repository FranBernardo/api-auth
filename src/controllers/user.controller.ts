import { Body, Controller, Get, HttpCode, Logger, Post } from '@nestjs/common';
import { User } from 'src/interfaces/user.interface';
import { UserService } from 'src/services/user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/auth')
  @HttpCode(201)
  async login(@Body() user: User) {
    const data = user;
    const response = await this.userService.getUserTest(data);
    return response;
  }
}
