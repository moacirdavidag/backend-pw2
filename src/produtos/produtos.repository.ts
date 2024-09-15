import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Produto } from './entities/produto.entity';
import { ProdutoDTO } from './dto/produto.dto';

@Injectable()
export class ProdutosRepository {
  constructor(private prisma: PrismaService) {}

  async findAllProdutos(): Promise<Produto[]> {
    try {
      return await this.prisma.produto.findMany({
        where: {
          deletedAt: null,
        },
      });
    } catch (error) {
      console.error(error);
    }
  }

  async findProdutoById(id: number): Promise<Produto> {
    try {
      return await this.prisma.produto.findUnique({
        where: {
          id,
        },
      });
    } catch (error) {
      console.error(error);
    }
  }

  async createProduto(produtoDTO: ProdutoDTO): Promise<Produto> {
    try {
      const {
        categoria_id,
        descricao,
        ingredientes,
        nome,
        preco,
        path_imagem,
        sub_categoria_id,
      } = produtoDTO;
      return await this.prisma.$transaction(async (tx) => {
        const produto = await this.prisma.produto.create({
          data: {
            nome,
            descricao,
            categoria: {
              connect: {
                id: categoria_id,
              },
            },
            preco,
            path_imagem,
            ingredientes: {
              connect: ingredientes?.map((ingrediente) => ({
                id: ingrediente.id,
              })),
            },
          },
        });

        if (sub_categoria_id) {
          return await tx.produto.update({
            where: {
              id: produto.id,
            },
            data: {
              sub_categoria: {
                connect: {
                  id: sub_categoria_id,
                },
              },
            },
          });
        }

        return produto;
      });
    } catch (error) {
      console.error(error);
    }
  }

  async updateProduto(id: number, produtoDTO: ProdutoDTO): Promise<Produto> {
    try {
      const {
        categoria_id,
        descricao,
        ingredientes,
        nome,
        preco,
        path_imagem,
        sub_categoria_id,
      } = produtoDTO;
      return await this.prisma.$transaction(async (tx) => {
        const produto = await tx.produto.update({
          where: {
            id,
          },
          data: {
            nome,
            descricao,
            categoria: {
              connect: {
                id: categoria_id,
              },
            },
            preco,
            path_imagem,
            ingredientes: {
              connect: ingredientes?.map((ingrediente) => ({
                id: ingrediente.id,
              })),
            },
          },
        });

        if (sub_categoria_id) {
          return await tx.produto.update({
            where: {
              id: produto.id,
            },
            data: {
              sub_categoria: {
                connect: {
                  id: sub_categoria_id,
                },
              },
            },
          });
        }

        return produto;
      });
    } catch (error) {
      console.error(error);
    }
  }

  async deleteProduto(id: number): Promise<Produto> {
    try {
      return await this.prisma.produto.update({
        where: {
          id,
        },
        data: {
          deletedAt: new Date(),
        },
      });
    } catch (error) {
      console.error(error);
    }
  }
}
