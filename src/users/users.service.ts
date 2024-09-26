import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from './entities/users.entity';
import { UsersDTO } from './dto/users.dto';
import * as bcrypt from 'bcrypt';
import path from 'path';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async findAllUsers(): Promise<User[]> {
    return await this.usersRepository.findAllUsers();
  }

  async findUserById(id: number): Promise<User> {
    const user = await this.usersRepository.findUserById(id);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado!');
    }
    return user;
  }

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findUserByEmail(email);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado!');
    }
    return user;
  }

  async createUser(userDTO: UsersDTO): Promise<User> {
    const { password, email } = userDTO;

    const user = await this.usersRepository.findUserByEmail(email);

    if (user) {
      throw new BadRequestException('E-mail já cadastrado!');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    return await this.usersRepository.createUser({
      ...userDTO,
      password: hashedPassword,
    });
  }

  async updateUser(id: number, userDTO: UsersDTO, avatar?: Express.Multer.File): Promise<User> {
    const { password } = userDTO;

    const user = await this.usersRepository.findUserById(id);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado!');
    }

    let path_avatar = "";

    if(avatar) {
      path_avatar = avatar.filename;
    }

    let hashedPassword = '';
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
      return await this.usersRepository.updateUser(id, {
        ...userDTO,
        password: hashedPassword,
        path: path_avatar !== "" ? path_avatar : user.avatar_url
      });
    }
  
    return await this.usersRepository.updateUser(id, {
      ...userDTO,
      password: user.password,
      path: path_avatar !== "" ? path_avatar : user.avatar_url
    });

  }

  async deleteUser(id: number) {
    const user = await this.usersRepository.findUserById(id);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado!');
    }
    return await this.usersRepository.deleteUser(id);
  }
}
