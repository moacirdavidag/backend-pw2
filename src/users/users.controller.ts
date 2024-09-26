import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/users.entity';
import { UsersDTO } from './dto/users.dto';
import { FileInterceptor } from '@nestjs/platform-express';

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
  @UseInterceptors(FileInterceptor('avatar')) // 'avatar' é o nome do campo do arquivo
  async update(
    @Param('id') id: number,
    @Body() userDTO: UsersDTO,
    @UploadedFile() file: Express.Multer.File, 
  ): Promise<User> {
    try {
      return await this.usersService.updateUser(Number(id), userDTO, file);
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
