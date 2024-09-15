import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { PedidoDTO } from './dto/pedido.dto';
import { Pedido } from './entities/pedido.entity';

@Injectable()
export class PedidosRepository {
  constructor(private prisma: PrismaService) {}

  async findAllPedidos(): Promise<Pedido[]> {
    try {
      return await this.prisma.pedidos.findMany({
        where: {
            deletedAt: null
        }
      });
    } catch (error) {
      console.error(error);
    }
  }

  async findPedidoById(id: number): Promise<Pedido> {
    try {
      return await this.prisma.pedidos.findUnique({ where: { id } });
    } catch (error) {
      console.error(error);
    }
  }

  async createPedido(pedidoDTO: PedidoDTO): Promise<Pedido> {
    try {
      return await this.prisma.$transaction(async (tx) => {
        const { cliente_id, produtos } = pedidoDTO;
        const totalPedidos = await tx.pedidos.count({
          where: {
            deletedAt: null,
          },
        });
        const pedido = await tx.pedidos.create({
          data: {
            numero_pedido: String(Number(totalPedidos) + 1).padStart(4, '0'),
            cliente: {
              connect: {
                id: cliente_id,
              },
            },
            produtos: {
              connect: produtos?.map((produto) => ({
                id: produto.id,
              })),
            },
          },
        });

        return pedido;
      });
    } catch (error) {
      console.error(error);
    }
  }

  async updatePedido(id: number, pedidoDTO: PedidoDTO) {
    try {
      const { cliente_id } = pedidoDTO;
      return await this.prisma.pedidos.update({
        where: { id },
        data: {
          cliente: {
            connect: {
              id: cliente_id,
            },
          },
        },
      });
    } catch (error) {
      console.error(error);
    }
  }

  async deletePedido(id: number): Promise<Pedido> {
    try {
      return await this.prisma.pedidos.update({
        where: { id },
        data: {
          deletedAt: new Date(),
        },
      });
    } catch (error) {
      console.error(error);
    }
  }
}
