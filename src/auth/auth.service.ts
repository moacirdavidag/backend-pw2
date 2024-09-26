import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDTO } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(loginDTO: LoginDTO): Promise<{ access_token: string, username: string, id: number, avatar_url: string, role: string }> {
    const { email, password: passwordUser } = loginDTO;
    const user = await this.usersService.findUserByEmail(email);

    if (!user) {
      throw new BadRequestException('Usuário não encontrado');
    }

    const isPasswordEqual = await bcrypt.compare(passwordUser, user?.password);

    if (!isPasswordEqual) {
      throw new UnauthorizedException('Senha inválida');
    }

    const payload = { sub: user.id, username: user.name };

    return {
      access_token: await this.jwtService.signAsync(payload),
      username: user.name,
      id: user.id,
      avatar_url: user.avatar_url,
      role: user.role
    };
  }
}
