import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { username: string; password: string; }) {
    const authResult = await this.authService.login(body.username, body.password);
    // Return the tokens from Cognito to the frontend
    return authResult;
  }
}
