import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ResponseDto } from './users/dtos/response.dto';
import { UserRegisterDto } from './users/dtos/user-register.dto';
import { UserService } from './users/services/user.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private readonly userService: UserService,) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('registerUser')
  @HttpCode(201)
  async register(
    @Body() dto: UserRegisterDto
  ) {
    try {

      const user = await this.userService.save(dto);

      return new ResponseDto(
        true,
        {
          _id: user._id,
          email: user.email
        },
        null
      );

    } catch (error) {
      throw new HttpException(
        new ResponseDto(
          false,
          null,
          [error.message]), HttpStatus.BAD_REQUEST);
    }
  }
}
