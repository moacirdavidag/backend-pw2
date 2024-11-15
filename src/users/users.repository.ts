import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { User } from './entities/users.entity';
import { UsersDTO } from './dto/users.dto';

@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaService) {}

  async findAllUsers(): Promise<User[]> {
    try {
      return await this.prisma.user.findMany({
        where: {
          deletedAt: null,
        },
        select: {
          name: true,
          email: true,
          createdAt: true,
          deletedAt: true,
          updatedAt: true,
          id: true,
          password: false,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async findUserById(id: number): Promise<User> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id,
          deletedAt: null,
        },
        select: {
          name: true,
          city: true,
          email: true,
          neighborhood: true,
          number: true,
          state: true,
          street: true,
          avatar_url: true
        }
      });

      return user;
    } catch (error) {
      console.log(error);
    }
  }

  async findUserByEmail(email: string): Promise<User> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email,
          deletedAt: null,
        },
      });

      return user;
    } catch (error) {
      console.log(error);
    }
  }

  async createUser(userDTO: UsersDTO): Promise<User> {
    try {
      const { name, email, password, city, state, street, neighborhood, number } = userDTO;
      const user = await this.prisma.user.create({
        data: {
          name,
          email,
          password,
          city,
          neighborhood,
          number,
          state,
          street,
        },
      });

      delete user.password;
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  async updateUser(id: number, userDTO: UsersDTO): Promise<User> {
    try {
      const { name, email, password, city, state, street, neighborhood, number, path } = userDTO;
      const user = await this.prisma.user.update({
        where: {
          id,
        },
        data: {
          name,
          email,
          password,
          city,
          neighborhood,
          number,
          state,
          street,
          avatar_url: path
        },
      });

      delete user.password;
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteUser(id: number): Promise<User> {
    try {
      return await this.prisma.user.update({
        where: {
          id,
        },
        data: {
          deletedAt: new Date(),
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
}
