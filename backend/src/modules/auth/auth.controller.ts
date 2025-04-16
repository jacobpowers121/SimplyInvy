import {Controller, Post, Body, UsePipes, Res, Headers, ValidationPipe, UseGuards} from '@nestjs/common';
import { AuthService } from './auth.service';
import {AuthRegisterUserDto} from "@modules/auth/dto/auth-register-user.dto";

@Controller('auth/user')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UsePipes(ValidationPipe)
  async register(@Body() authRegisterUserDto: AuthRegisterUserDto) {
    const response = await this.authService.register(authRegisterUserDto);
    return { message: 'User registration successful', ...response };
  }

  @Post('login')
  async login(@Body() body: { username: string; password: string; }) {
    const authResult = await this.authService.login(body.username, body.password);
    // Return the tokens from Cognito to the frontend
    return authResult;
  }

  @Post('/logout')
  @UseGuards(JwtAuthGuard)
  async logout(@User() user: JwtUser, @Headers('X-Access-Token') accessToken: string, @Res({ passthrough: true}) res: Response) {
    if (!accessToken || !accessToken.startsWith('Bearer ')) {
      throw new Error('Invalid token format');
    }
    const token = accessToken.split('Bearer ')[1].trim();
    await this.authService.logout(user, token);
    res.clearCookie('__auth_token');
    return { message: 'Logout successful' };
  }
}
