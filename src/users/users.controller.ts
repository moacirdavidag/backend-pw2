import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/users.entity';
import { UsersDTO } from './dto/users.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/')
  async findAllUsers(): Promise<User[]> {
    try {
      return await this.usersService.findAllUsers();
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Get('/:id')
  async findUserById(@Param('id') id: number): Promise<User> {
    try {
      return await this.usersService.findUserById(Number(id));
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Post('')
  async createUser(@Body() userDTO: UsersDTO): Promise<User> {
    try {
      return await this.usersService.createUser(userDTO);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Put('/:id')
  async update(
    @Param('id') id: number,
    @Body() userDTO: UsersDTO,
  ): Promise<User> {
    try {
      return await this.usersService.updateUser(Number(id), userDTO);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: number): Promise<User> {
    try {
      return await this.usersService.deleteUser(Number(id));
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
