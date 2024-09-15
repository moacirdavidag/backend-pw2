import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Categoria } from './entities/categoria.entity';
import { CategoriaDTO } from './dto/categoria.dto';

@Injectable()
export class CategoriasRepository {
  constructor(private prisma: PrismaService) {}

  async findAllCategorias(): Promise<Categoria[]> {
    try {
      return await this.prisma.categoria.findMany({
        where: {
          deletedAt: null,
        },
      });
    } catch (error) {
      console.error(error);
    }
  }

  async findCategoriaById(id: number): Promise<Categoria> {
    try {
      return await this.prisma.categoria.findUnique({
        where: {
          id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async createCategoria(categoriaDTO: CategoriaDTO): Promise<Categoria> {
    try {
      const { nome } = categoriaDTO;
      return await this.prisma.categoria.create({
        data: {
          nome,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async updateCategoria(
    id: number,
    categoriaDTO: CategoriaDTO,
  ): Promise<Categoria> {
    try {
      const { nome } = categoriaDTO;
      return await this.prisma.categoria.update({
        where: {
          id,
        },
        data: {
          nome,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async deleteCategoria(id: number): Promise<Categoria> {
    try {
      return await this.prisma.categoria.update({
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
