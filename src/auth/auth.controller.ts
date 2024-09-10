import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDTO: LoginDTO): Promise<{ access_token: string }> {
    try {
      return await this.authService.login(loginDTO);
    } catch (error) {
      console.log(error.message, error.status);
    }
  }
}
